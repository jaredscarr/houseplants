import React from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import SignIn from './components/SignIn';
import Home from './components/Home';
import Search from './components/Search';
import Dashboard from './components/Dashboard';
import PlantDetail from './components/PlantDetail';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const HOST = window.location.origin;
const REDIRECT_URI = `${HOST}/login/callback`;
const SCOPES = 'openid profile email';
  
const App = () => {
  const history = useHistory();

  const onAuthRequired = () => {
    history.push('/login');
  }

  return (
    <div className="App">
      <Security issuer={`${OKTA_DOMAIN}/oauth2/default`}
                clientId={CLIENT_ID}
                redirectUri={REDIRECT_URI}
                scopes={SCOPES.split(/\s+/)}
                onAuthRequired={onAuthRequired}
                pkce={true}>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/dashboard' component={Dashboard} />
        <SecureRoute path='/search' component={Search} />
        <SecureRoute path='/plant' component={PlantDetail} />
        <Route path='/login' component={SignIn} />
        <Route path='/login/callback' component={LoginCallback} />
      </Security>
    </div>
  );
}

export default App;
