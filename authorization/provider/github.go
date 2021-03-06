package provider

import (
	"context"
	"fmt"
	"net/http"
	"strconv"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
	githubconf "golang.org/x/oauth2/github"
)

// NewGitHubProvider creates GitHub OAuth client
func NewGitHubProvider(config Config) *GitHubProvider {
	oauth2 := config.OAuth2.ToOAuth2()
	if oauth2.Endpoint.AuthURL == "" || oauth2.Endpoint.TokenURL == "" {
		oauth2.Endpoint = githubconf.Endpoint
	}
	oauth2.Scopes = []string{"user:email"}

	return &GitHubProvider{
		Config:          config,
		OAuth2:          &oauth2,
		NewGithubClient: github.NewClient,
		NewHTTPClient:   func() *http.Client { return http.DefaultClient },
	}
}

// GitHubProvider configuration with client factories
type GitHubProvider struct {
	Config          Config
	OAuth2          *oauth2.Config
	NewGithubClient func(*http.Client) *github.Client
	NewHTTPClient   func() *http.Client
}

// GetProviderName returns unique name of the provider
func (p *GitHubProvider) GetProviderName() string {
	return p.Config.Provider
}

// AuthCodeURL returns URL for redirecting to the GitHub authentication web page.
func (p *GitHubProvider) AuthCodeURL(csrfToken string) string {
	return p.Config.OAuth2.AuthCodeURL(csrfToken)
}

// Exchange Auth Code for Access Token via OAuth.
func (p *GitHubProvider) Exchange(ctx context.Context, authorizationProvider, authorizationCode string) (*Token, error) {
	if p.GetProviderName() != authorizationProvider {
		return nil, fmt.Errorf("unsupported authorization provider")
	}
	ctx = context.WithValue(ctx, oauth2.HTTPClient, p.NewHTTPClient())

	token, err := p.OAuth2.Exchange(ctx, authorizationCode)
	if err != nil {
		return nil, err
	}

	oauthClient := p.OAuth2.Client(ctx, token)
	client := p.NewGithubClient(oauthClient)

	user, _, err := client.Users.Get(ctx, "")
	if err != nil {
		return nil, err
	}

	t := Token{
		AccessToken:  token.AccessToken,
		RefreshToken: token.RefreshToken,
		Expiry:       token.Expiry,
		UserID:       strconv.FormatInt(user.GetID(), 10),
	}
	return &t, nil
}

// Refresh gets new Access Token via OAuth.
// GitHub provides permanent AccessToken and no RefreshToken,
// thus refreshToken is not implemented.
func (p *GitHubProvider) Refresh(ctx context.Context, refreshToken string) (*Token, error) {
	return nil, fmt.Errorf("not supported")
}
