import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';

const NavBar = () => {
  const { authState, authService } = useOktaAuth();
  const history = useHistory();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ?
    <button onClick={() => {authService.logout()}}>Logout</button> :
    <button onClick={() => {history.push('/login')}}>Login</button>;

  return (
    <div>
      {button}
    </div>
  );
};

export default NavBar;
