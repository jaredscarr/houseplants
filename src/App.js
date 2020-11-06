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
const ISSUER = `${OKTA_DOMAIN}/oauth2/default`;
const LOGIN_PATH = '/login';
const CALLBACK_PATH = '/login/callback';
const HOST = window.location.origin;
const REDIRECT_URI = `${HOST}${CALLBACK_PATH}`;
const SCOPES = 'openid profile email';
  
const App = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push('/login');
  }

  return (
    <div className="App">
      <Security issuer={ISSUER}
                clientId={CLIENT_ID}
                redirectUri={REDIRECT_URI}
                scopes={SCOPES.split(/\s+/)}
                onAuthRequired={onAuthRequired}
                pkce={true}>
        <Route path='/' exact={true} component={Home} />
        <SecureRoute path='/dashboard' component={Dashboard} />
        <SecureRoute path='/search' component={Search} />
        <SecureRoute path='/plant' component={PlantDetail} />
        <Route path={LOGIN_PATH} render={() => <SignIn baseUrl={OKTA_DOMAIN} />} />
        <Route path={CALLBACK_PATH} component={LoginCallback} />
      </Security>
    </div>
  );
}

export default App;
