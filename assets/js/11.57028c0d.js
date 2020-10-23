(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{368:function(_,t,e){"use strict";e.r(t);var v=e(42),d=Object(v.a)({},(function(){var _=this,t=_.$createElement,e=_._self._c||t;return e("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[e("h1",{attrs:{id:"_3-resource-directory"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_3-resource-directory"}},[_._v("#")]),_._v(" 3. Resource directory")]),_._v(" "),e("h2",{attrs:{id:"description"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#description"}},[_._v("#")]),_._v(" Description")]),_._v(" "),e("p",[_._v("According to CQRS pattern it creates/updates projection for resource directory and resource shadow.")]),_._v(" "),e("h2",{attrs:{id:"api"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#api"}},[_._v("#")]),_._v(" API")]),_._v(" "),e("p",[_._v("All requests to service must contains valid access token in "),e("a",{attrs:{href:"https://github.com/grpc/grpc-go/blob/master/Documentation/grpc-auth-support.md#oauth2",target:"_blank",rel:"noopener noreferrer"}},[_._v("grpc metadata"),e("OutboundLink")],1),_._v(".")]),_._v(" "),e("h3",{attrs:{id:"commands"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#commands"}},[_._v("#")]),_._v(" Commands")]),_._v(" "),e("ul",[e("li",[_._v("get devices - list devices")]),_._v(" "),e("li",[_._v("get resource links - list resource links")]),_._v(" "),e("li",[_._v("retrieve resource from device - get content from the device")]),_._v(" "),e("li",[_._v("retrieve resources values - get resources from the resource shadow")]),_._v(" "),e("li",[_._v("update resources values - update resource at the device")]),_._v(" "),e("li",[_._v("subscribe for events - provides notification about device registered/unregistered/online/offline, resource published/unpublished/content changed/ ...")]),_._v(" "),e("li",[_._v("get client configuration - provides public configuration for clients(mobile, web, onboarding tool)")])]),_._v(" "),e("h3",{attrs:{id:"contract"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#contract"}},[_._v("#")]),_._v(" Contract")]),_._v(" "),e("ul",[e("li",[e("a",{attrs:{href:"https://github.com/plgd-dev/cloud/blob/master/grpc-gateway/pb/service.proto",target:"_blank",rel:"noopener noreferrer"}},[_._v("service"),e("OutboundLink")],1)]),_._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/plgd-dev/cloud/blob/master/grpc-gateway/pb/devices.proto",target:"_blank",rel:"noopener noreferrer"}},[_._v("requets/responses"),e("OutboundLink")],1)]),_._v(" "),e("li",[e("a",{attrs:{href:"https://github.com/plgd-dev/cloud/blob/master/grpc-gateway/pb/clientConfiguration.proto",target:"_blank",rel:"noopener noreferrer"}},[_._v("client configuration"),e("OutboundLink")],1)])]),_._v(" "),e("h2",{attrs:{id:"docker-image"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#docker-image"}},[_._v("#")]),_._v(" Docker Image")]),_._v(" "),e("div",{staticClass:"language-bash extra-class"},[e("pre",{pre:!0,attrs:{class:"language-bash"}},[e("code",[_._v("docker pull plgd/resource-directory:vnext\n")])])]),e("h2",{attrs:{id:"configuration"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[_._v("#")]),_._v(" Configuration")]),_._v(" "),e("table",[e("thead",[e("tr",[e("th",[_._v("Option")]),_._v(" "),e("th",[_._v("ENV variable")]),_._v(" "),e("th",[_._v("Type")]),_._v(" "),e("th",[_._v("Description")]),_._v(" "),e("th",[_._v("Default")])])]),_._v(" "),e("tbody",[e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("ADDRESS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("listen address")])]),_._v(" "),e("td",[e("code",[_._v('"0.0.0.0:9100"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("AUTH_SERVER_ADDRESS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("authoriztion server address")])]),_._v(" "),e("td",[e("code",[_._v('"127.0.0.1:9100"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("RESOURCE_AGGREGATE_ADDRESS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("resource aggregate address")])]),_._v(" "),e("td",[e("code",[_._v('"127.0.0.1:9100"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("TIMEOUT_FOR_REQUESTS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("wait for update/retrieve resource")])]),_._v(" "),e("td",[e("code",[_._v("10s")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("PROJECTION_CACHE_EXPIRATION")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("expiration time of projection")])]),_._v(" "),e("td",[e("code",[_._v('"30s"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("JWKS_URL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url to get JSON Web Key")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("USER_MGMT_TICK_FREQUENCY")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("pull interval to refresh user devices")])]),_._v(" "),e("td",[e("code",[_._v('"15s"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("USER_MGMT_EXPIRATION")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("expiration time of record about user devices")])]),_._v(" "),e("td",[e("code",[_._v('"1m"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_CLOUD_CA_POOL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("path root CA which was used to signe coap-gw certificate")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_ACCESSTOKENURL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url where user can get OAuth token via implicit flow")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_AUTHCODEURL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url where user can get OAuth authorization code for the device")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_CLOUDID")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("cloud id which is stored in coap-gw certificate")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_CLOUDURL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("cloud url for onboard device")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_CLOUDAUTHORIZATIONPROVIDER")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("oauth authorization provider for onboard device")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_CLIENT_CONFIGURATION_SIGNINGSERVERADDRESS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("address of ceritificate authority for plgd-dev/sdk")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_OAUTH_ENDPOINT_TOKEN_URL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url to get service access token via OAUTH client credential flow")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_OAUTH_CLIENT_ID")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("client id for authentication to get access token")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_OAUTH_CLIENT_SECRET")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("secrest for authentication to get access token")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("SERVICE_OAUTH_AUDIENCE")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("refer to the resource servers that should accept the token")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("NATS_URL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url to nats messaging system")])]),_._v(" "),e("td",[e("code",[_._v('"nats://localhost:4222"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("MONGODB_URI")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("uri to mongo database")])]),_._v(" "),e("td",[e("code",[_._v('"mongodb://localhost:27017"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("MONGODB_DATABASE")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("name of database")])]),_._v(" "),e("td",[e("code",[_._v('"eventstore"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("MONGODB_BATCH_SIZE")])]),_._v(" "),e("td",[_._v("int")]),_._v(" "),e("td",[e("code",[_._v("maximum number resources in one batch request")])]),_._v(" "),e("td",[e("code",[_._v("16")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("MONGODB_MAX_POOL_SIZE")])]),_._v(" "),e("td",[_._v("int")]),_._v(" "),e("td",[e("code",[_._v("maximum parallel request to DB")])]),_._v(" "),e("td",[e("code",[_._v("16")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("MONGODB_MAX_CONN_IDLE_TIME")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("maximum time of idle connection")])]),_._v(" "),e("td",[e("code",[_._v('"240s"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_TYPE")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("defines how to obtain dial TLS certificates - options: acme|file")])]),_._v(" "),e("td",[e("code",[_._v('"acme"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_ACME_CA_POOL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("path to pem file of CAs")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_ACME_DIRECTORY_URL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url of acme directory")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_ACME_DOMAINS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("list of domains for which will be in certificate provided from acme")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_ACME_REGISTRATION_EMAIL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("registration email for acme")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_ACME_TICK_FREQUENCY")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("interval of validate certificate")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_ACME_USE_SYSTEM_CERTIFICATION_POOL")])]),_._v(" "),e("td",[_._v("bool")]),_._v(" "),e("td",[e("code",[_._v("load CAs from system")])]),_._v(" "),e("td",[e("code",[_._v("false")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_FILE_CA_POOL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[_._v("tbd")]),_._v(" "),e("td",[e("code",[_._v("path to pem file of CAs")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_FILE_CERT_KEY_NAME")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("name of pem certificate key file")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_FILE_CERT_DIR_PATH")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("path to directory which contains DIAL_FILE_CERT_KEY_NAME and DIAL_FILE_CERT_NAME")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_FILE_CERT_NAME")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("name of pem certificate file")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("DIAL_FILE_USE_SYSTEM_CERTIFICATION_POOL")])]),_._v(" "),e("td",[_._v("bool")]),_._v(" "),e("td",[e("code",[_._v("load CAs from system")])]),_._v(" "),e("td",[e("code",[_._v("false")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_TYPE")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("defines how to obtain listen TLS certificates - options: acme|file")])]),_._v(" "),e("td",[e("code",[_._v('"acme"')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_ACME_CA_POOL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("path to pem file of CAs")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_ACME_DIRECTORY_URL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("url of acme directory")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_ACME_DOMAINS")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("list of domains for which will be in certificate provided from acme")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_ACME_REGISTRATION_EMAIL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("registration email for acme")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_ACME_TICK_FREQUENCY")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("interval of validate certificate")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_ACME_USE_SYSTEM_CERTIFICATION_POOL")])]),_._v(" "),e("td",[_._v("bool")]),_._v(" "),e("td",[e("code",[_._v("load CAs from system")])]),_._v(" "),e("td",[e("code",[_._v("false")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_FILE_CA_POOL")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[_._v("tbd")]),_._v(" "),e("td",[e("code",[_._v("path to pem file of CAs")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_FILE_CERT_KEY_NAME")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("name of pem certificate key file")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_FILE_CERT_DIR_PATH")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("path to directory which contains LISTEN_FILE_CERT_KEY_NAME and LISTEN_FILE_CERT_NAME")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_FILE_CERT_NAME")])]),_._v(" "),e("td",[_._v("string")]),_._v(" "),e("td",[e("code",[_._v("name of pem certificate file")])]),_._v(" "),e("td",[e("code",[_._v('""')])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LISTEN_FILE_USE_SYSTEM_CERTIFICATION_POOL")])]),_._v(" "),e("td",[_._v("bool")]),_._v(" "),e("td",[e("code",[_._v("load CAs from system")])]),_._v(" "),e("td",[e("code",[_._v("false")])])]),_._v(" "),e("tr",[e("td",[e("code",[_._v("-")])]),_._v(" "),e("td",[e("code",[_._v("LOG_ENABLE_DEBUG")])]),_._v(" "),e("td",[_._v("bool")]),_._v(" "),e("td",[e("code",[_._v("debug logging")])]),_._v(" "),e("td",[e("code",[_._v("false")])])])])])])}),[],!1,null,null,null);t.default=d.exports}}]);