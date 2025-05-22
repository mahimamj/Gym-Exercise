import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

// Auth0 configuration
const domain = "dev-5td4cingceoxkbg3.us.auth0.com";
const clientId = "1oItBIe7sfb0bGL4tKxfZIsJp6IKeUOf";
const redirectUri = window.location.origin;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        // Specify requested scopes
        scope: 'openid profile email'
      }}
      // Enables the use of refresh tokens
      useRefreshTokens={true}
      // Sets the time before token expiration to trigger a silent refresh
      cacheLocation="localstorage"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to track performance (optional, uncomment when needed)
