import React from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom';
import { LoginCallback, SecureRoute, Security } from '@okta/okta-react';
import Home from './components/Home';
import Search from './components/Search';

const ClientId = process.env.REACT_APP_CLIENT_ID
const OktaDomain = process.env.REACT_APP_OKTA_DOMAIN

const App = () => {
  return (
    <div className="App">
      <header>
        <div>My Plants</div>
        <ul className="menu"><li><Link to="/">Home</Link></li><li><Link to="/search">Search</Link></li></ul>
      </header>
      <Security issuer={OktaDomain}
                clientId={ClientId}
                redirectUri={window.location.origin + '/callback'}
                pkce={true}>
        <Route path='/' exact={true} component={Home}/>
        <SecureRoute path='/search' exact={true} component={Search}/>
        <Route path='/callback' component={LoginCallback}/>
      </Security>
    </div>
  );
}

export default App;
