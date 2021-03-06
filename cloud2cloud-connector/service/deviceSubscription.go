package service

import (
	"context"
	"fmt"
	"strings"

	"github.com/plgd-dev/cloud/cloud2cloud-connector/events"
	"github.com/plgd-dev/cloud/cloud2cloud-connector/store"
	raCqrs "github.com/plgd-dev/cloud/resource-aggregate/cqrs"
	pbCQRS "github.com/plgd-dev/cloud/resource-aggregate/pb"
	pbRA "github.com/plgd-dev/cloud/resource-aggregate/pb"
	"github.com/plgd-dev/go-coap/v2/message"
	"github.com/plgd-dev/kit/codec/cbor"
	"github.com/plgd-dev/kit/log"
	kitNetGrpc "github.com/plgd-dev/kit/net/grpc"
	kitHttp "github.com/plgd-dev/kit/net/http"
	"github.com/plgd-dev/sdk/schema/cloud"
	"github.com/gofrs/uuid"
	cache "github.com/patrickmn/go-cache"
)

func (s *SubscriptionManager) SubscribeToDevice(ctx context.Context, deviceID string, linkedAccount store.LinkedAccount, linkedCloud store.LinkedCloud) error {
	if _, loaded := s.store.LoadDeviceSubscription(linkedAccount.LinkedCloudID, linkedAccount.ID, deviceID); loaded {
		return nil
	}
	signingSecret, err := generateRandomString(32)
	if err != nil {
		return fmt.Errorf("cannot generate signingSecret for device subscription: %w", err)
	}
	corID, err := uuid.NewV4()
	if err != nil {
		return fmt.Errorf("cannot generate correlationID for devices subscription: %w", err)
	}
	correlationID := corID.String()
	sub := Subscription{
		Type:            Type_Device,
		LinkedAccountID: linkedAccount.ID,
		DeviceID:        deviceID,
		SigningSecret:   signingSecret,
		LinkedCloudID:   linkedCloud.ID,
		CorrelationID:   correlationID,
	}
	data := subscriptionData{
		linkedAccount: linkedAccount,
		linkedCloud:   linkedCloud,
		subscription:  sub,
	}
	err = s.cache.Add(correlationID, data, cache.DefaultExpiration)
	if err != nil {
		return fmt.Errorf("cannot cache subscription for device subscriptions: %w", err)
	}
	sub.ID, err = s.subscribeToDevice(ctx, linkedAccount, linkedCloud, correlationID, signingSecret, deviceID)
	if err != nil {
		s.cache.Delete(correlationID)
		return fmt.Errorf("cannot subscribe to device %v: %w", deviceID, err)
	}
	_, _, err = s.store.LoadOrCreateSubscription(sub)
	if err != nil {
		cancelDeviceSubscription(ctx, linkedAccount, linkedCloud, deviceID, sub.ID)
		return fmt.Errorf("cannot store subscription to DB: %w", err)
	}
	err = s.devicesSubscription.Add(deviceID, linkedAccount, linkedCloud)
	if err != nil {
		return fmt.Errorf("cannot register device %v to resource projection: %w", deviceID, err)
	}
	return nil
}

func (s *SubscriptionManager) subscribeToDevice(ctx context.Context, linkedAccount store.LinkedAccount, linkedCloud store.LinkedCloud, correlationID, signingSecret, deviceID string) (string, error) {
	resp, err := subscribe(ctx, "/devices/"+deviceID+"/subscriptions", correlationID, events.SubscriptionRequest{
		URL: s.eventsURL,
		EventTypes: []events.EventType{
			events.EventType_ResourcesPublished,
			events.EventType_ResourcesUnpublished,
		},
		SigningSecret: signingSecret,
	}, linkedAccount, linkedCloud)
	if err != nil {
		return "", fmt.Errorf("cannot subscribe to device %v for %v: %w", deviceID, linkedAccount.ID, err)
	}
	return resp.SubscriptionId, nil
}

func cancelDeviceSubscription(ctx context.Context, linkedAccount store.LinkedAccount, linkedCloud store.LinkedCloud, deviceID, subscriptionID string) error {
	err := cancelSubscription(ctx, "/devices/"+deviceID+"/subscriptions/"+subscriptionID, linkedAccount, linkedCloud)
	if err != nil {
		return fmt.Errorf("cannot cancel device subscription for %v: %w", linkedAccount.ID, err)
	}
	return nil
}

func (s *SubscriptionManager) updateCloudStatus(ctx context.Context, deviceID string, online bool, authContext pbCQRS.AuthorizationContext, cmdMetadata pbCQRS.CommandMetadata) error {
	status := cloud.Status{
		ResourceTypes: cloud.StatusResourceTypes,
		Interfaces:    cloud.StatusInterfaces,
		Online:        online,
	}
	data, err := cbor.Encode(status)
	if err != nil {
		return err
	}

	request := pbRA.NotifyResourceChangedRequest{
		ResourceId: raCqrs.MakeResourceId(deviceID, cloud.StatusHref),
		Content: &pbRA.Content{
			ContentType:       message.AppOcfCbor.String(),
			CoapContentFormat: int32(message.AppOcfCbor),
			Data:              data,
		},
		Status:               pbRA.Status_OK,
		CommandMetadata:      &cmdMetadata,
		AuthorizationContext: &authContext,
	}

	_, err = s.raClient.NotifyResourceChanged(ctx, &request)
	return err
}

func trimDeviceIDFromHref(deviceID, href string) string {
	if strings.HasPrefix(href, "/"+deviceID+"/") {
		href = strings.TrimPrefix(href, "/"+deviceID)
	}
	return href
}

// HandleResourcesPublished publish resources to resource aggregate and subscribes to resources.
func (s *SubscriptionManager) HandleResourcesPublished(ctx context.Context, d subscriptionData, header events.EventHeader, links events.ResourcesPublished) error {
	var errors []error
	for _, link := range links {
		deviceID := d.subscription.DeviceID
		link.DeviceID = deviceID
		endpoints := make([]*pbRA.EndpointInformation, 0, 4)
		for _, endpoint := range link.GetEndpoints() {
			endpoints = append(endpoints, &pbRA.EndpointInformation{
				Endpoint: endpoint.URI,
				Priority: int64(endpoint.Priority),
			})
		}
		href := trimDeviceIDFromHref(link.DeviceID, link.Href)
		resourceId := raCqrs.MakeResourceId(link.DeviceID, kitHttp.CanonicalHref(href))
		_, err := s.raClient.PublishResource(kitNetGrpc.CtxWithToken(ctx, d.linkedAccount.TargetCloud.AccessToken.String()), &pbRA.PublishResourceRequest{
			AuthorizationContext: &pbCQRS.AuthorizationContext{
				DeviceId: link.DeviceID,
			},
			ResourceId: resourceId,
			Resource: &pbRA.Resource{
				Id:                    resourceId,
				Href:                  href,
				ResourceTypes:         link.ResourceTypes,
				Interfaces:            link.Interfaces,
				DeviceId:              link.DeviceID,
				InstanceId:            link.InstanceID,
				Anchor:                link.Anchor,
				Policies:              &pbRA.Policies{BitFlags: int32(link.Policy.BitMask)},
				Title:                 link.Title,
				SupportedContentTypes: link.SupportedContentTypes,
				EndpointInformations:  endpoints,
			},
			CommandMetadata: &pbCQRS.CommandMetadata{
				ConnectionId: d.linkedAccount.ID + "." + d.subscription.ID,
				Sequence:     header.SequenceNumber,
			},
		})
		if err != nil {
			errors = append(errors, fmt.Errorf("cannot publish resource: %w", err))
			continue
		}
		if d.linkedCloud.SupportedSubscriptionsEvents.NeedPullResources() {
			continue
		}
		s.triggerTask(Task{
			taskType:      TaskType_SubscribeToResource,
			linkedAccount: d.linkedAccount,
			linkedCloud:   d.linkedCloud,
			deviceID:      deviceID,
			href:          href,
		})
	}
	if len(errors) > 0 {
		return fmt.Errorf("%v", errors)
	}
	return nil
}

// HandleResourcesUnpublished unpublish resources from resource aggregate and cancel resources subscriptions.
func (s *SubscriptionManager) HandleResourcesUnpublished(ctx context.Context, d subscriptionData, header events.EventHeader, links events.ResourcesUnpublished) error {
	var errors []error
	for _, link := range links {
		link.DeviceID = d.subscription.DeviceID
		href := trimDeviceIDFromHref(link.DeviceID, link.Href)
		_, err := s.raClient.UnpublishResource(kitNetGrpc.CtxWithToken(ctx, d.linkedAccount.TargetCloud.AccessToken.String()), &pbRA.UnpublishResourceRequest{
			AuthorizationContext: &pbCQRS.AuthorizationContext{
				DeviceId: link.DeviceID,
			},
			ResourceId: raCqrs.MakeResourceId(link.GetDeviceID(), kitHttp.CanonicalHref(href)),
			CommandMetadata: &pbCQRS.CommandMetadata{
				ConnectionId: d.linkedAccount.ID + "." + d.subscription.ID,
				Sequence:     header.SequenceNumber,
			},
		})
		if err != nil {
			errors = append(errors, fmt.Errorf("cannot unpublish resource: %w", err))
		}
		_, ok := s.store.PullOutResource(d.linkedAccount.LinkedCloudID, d.linkedAccount.ID, link.DeviceID, href)
		if !ok {
			log.Debugf("HandleResourcesUnpublished: cannot remove device %v resource %v subscription: not found", link.DeviceID, href)
		}
		s.cache.Delete(header.CorrelationID)
	}
	if len(errors) > 0 {
		return fmt.Errorf("%v", errors)
	}
	return nil
}

// HandleDeviceEvent handles device events.
func (s *SubscriptionManager) HandleDeviceEvent(ctx context.Context, header events.EventHeader, body []byte, subscriptionData subscriptionData) error {
	contentReader, err := header.GetContentDecoder()
	if err != nil {
		return fmt.Errorf("cannot get content reader: %w", err)
	}
	switch header.EventType {
	case events.EventType_ResourcesPublished:
		var links events.ResourcesPublished
		err := contentReader(body, &links)
		if err != nil {
			return fmt.Errorf("cannot decode device event %v: %w", header.EventType, err)
		}
		return s.HandleResourcesPublished(ctx, subscriptionData, header, links)
	case events.EventType_ResourcesUnpublished:
		var links events.ResourcesUnpublished
		err := contentReader(body, &links)
		if err != nil {
			return fmt.Errorf("cannot decode device event %v: %w", header.EventType, err)
		}
		return s.HandleResourcesUnpublished(ctx, subscriptionData, header, links)
	}

	return fmt.Errorf("cannot handle device: unsupported Event-Type %v", header.EventType)
}
