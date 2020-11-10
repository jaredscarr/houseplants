import React from 'react';
import { useHistory } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import Dashboard from './Dashboard';

const Home = () => {
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
      { authState.isAuthenticated && 
        <Dashboard />
      }
    </div>
  );
};

export default Home;
