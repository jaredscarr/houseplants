import React from 'react';
import './App.css';
import { Route, useHistory } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import NavBar from './components/NavBar';
import Login from './components/OktaSignInWidget';
import Home from './components/Home';
import Search from './components/Search';
import Dashboard from './components/Dashboard';
import PlantDetail from './components/PlantDetail';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const OKTA_DOMAIN = process.env.REACT_APP_OKTA_DOMAIN;
const HOST = window.location.origin;
const REDIRECT_URI = `${HOST}/login/callback`;
const SCOPES = ['openid', 'profile', 'email'];
const OKTA_TESTING_DISABLEHTTPSCHECK = process.env.REACT_APP_OKTA_TESTING_DISABLEHTTPSCHECK || false;
  
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
                scopes={SCOPES}
                onAuthRequired={onAuthRequired}
                pkce={true}
                disableHttpsCheck={OKTA_TESTING_DISABLEHTTPSCHECK}>
        <NavBar />
        <Route path='/' exact component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/login/callback' component={LoginCallback} />
        <SecureRoute path='/dashboard' component={Dashboard} />
        <SecureRoute path='/search' component={Search} />
        <SecureRoute path='/plant' component={PlantDetail} />     
      </Security>
    </div>
  );
}

export default App;
