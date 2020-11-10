import React, { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import * as OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const HOST = window.location.origin;
const REDIRECT_URI = `${HOST}/login/callback`;
console.log(REDIRECT_URI);
const SCOPES = ['openid', 'profile', 'email'];

const Login = () => {
  const { authService } = useOktaAuth();

  useEffect(() => {
    const widget = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: OKTA_DOMAIN,
      clientId: CLIENT_ID,
      redirectUri: REDIRECT_URI,
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to House Plants',
        },
      },
      authParams: {
        // To avoid redirect do not set "pkce" or "display" here. OKTA-335945
        issuer: `${OKTA_DOMAIN}/oauth2/default`,
        scopes: SCOPES,
        pkce: true,
      },
      features: {
        registration: true
      }
    });

    widget.renderEl(
      { el: '#sign-in-widget' },
      ({ tokens }) => {
        // Add tokens to storage
        console.log('HEREREER')
        const tokenManager = authService.getTokenManager();
        tokenManager.add('idToken', tokens.idToken);
        tokenManager.add('accessToken', tokens.accessToken);

        // Return to the original URL (if auth was initiated from a secure route), falls back to the origin
        const fromUri = authService.getFromUri();
        console.log(fromUri);
        window.location.assign(fromUri);
      },
      (err) => {
        throw err;
      },
    );
  }, [authService]);

  return (
    <div>
      <div id="sign-in-widget" />
    </div>
  );
};
export default Login;
