import React from 'react';
import { Redirect } from 'react-router-dom';
import OktaSignInWidget from './OktaSignInWidget';
import { useOktaAuth } from '@okta/okta-react';

const SignIn = ({ baseUrl }) => {
  const { authState, authService } = useOktaAuth();

  const onSuccess = (res) => {
    if (res.status === 'SUCCESS') {


      return authService.redirect({
        sessionToken: res.session.token
      });
   } else {
    // The user can be in another authentication state that requires further action.
    // For more information about these states, see:
    //   https://github.com/okta/okta-signin-widget#rendereloptions-success-error
    }
  }

  const onError = (err) => {
    console.log('error logging in', err);
  }

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  return (
    authState.isAuthenticated ?
    <Redirect to={{ pathname: '/dashboard' }}/> :
    <OktaSignInWidget
      baseUrl={baseUrl}
      onSuccess={onSuccess}
      onError={onError}/>
  );
};

export default SignIn;
