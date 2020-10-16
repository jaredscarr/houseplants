import React from 'react';
import { useOktaAuth } from '@okta/okta-react';

const Home = () => {
  const { authState, authService } = useOktaAuth();

  const login = () => { authService.login('/'); }
  const logout = () => { authService.logout('/'); }

  const userText = authState.isAuthenticated
    ? <div><p>You are signed in!</p><button onClick={ logout }>Logout</button></div>
    : <div><p>You need to sign in to use the application!</p><button onClick={ login }>Sign In</button></div>;

  return <div className="page-home"><h1>Welcome to My Plants</h1>{ userText }</div>;
}

export default Home;
