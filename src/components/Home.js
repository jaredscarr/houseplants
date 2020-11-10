import React from 'react';
import { useOktaAuth } from '@okta/okta-react';
import NavBar from './NavBar';
import Dashboard from './Dashboard';

const Home = () => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      { authState.isAuthenticated && 
        <Dashboard />
      }
    </div>
  );
};

export default Home;
