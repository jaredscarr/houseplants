import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import Dashboard from './Dashboard';

const Home = () => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      { authState.isAuthenticated && 
        <Dashboard />
      }
    </div>
  );
};

export default Home;
