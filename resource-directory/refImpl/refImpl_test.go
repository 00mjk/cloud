package refImpl_test

import (
	"testing"

	authConfig "github.com/plgd-dev/cloud/authorization/service"
	authService "github.com/plgd-dev/cloud/authorization/test"
	"github.com/plgd-dev/cloud/resource-directory/refImpl"
	"github.com/kelseyhightower/envconfig"
	"github.com/stretchr/testify/require"
)

func TestInit(t *testing.T) {
	var authCfg authConfig.Config
	err := envconfig.Process("", &authCfg)
	require.NoError(t, err)
	authCfg.Addr = "localhost:12345"
	authCfg.HTTPAddr = "localhost:12346"
	authCfg.Device.Provider = "test"
	authShutdown := authService.New(t, authCfg)
	defer authShutdown()

	var config refImpl.Config
	err = envconfig.Process("", &config)
	require.NoError(t, err)
	config.Service.OAuth.Endpoint.TokenURL = "https://" + authCfg.HTTPAddr + "/api/authz/token"

	got, err := refImpl.Init(config)
	require.NoError(t, err)
	require.NotEmpty(t, got)
	defer got.Close()
}
