export const auth0Config = {
  domain: "dev-5td4cingceoxkbg3.us.auth0.com", // Replace with your Auth0 domain
  clientId: "1oItBIe7sfb0bGL4tKxfZIsJp6IKeUOf", // Replace with your Auth0 client ID
  redirectUri: window.location.origin,
  //audience: "YOUR_API_IDENTIFIER", // Optional: Only if you're using an API
  scope: "openid profile email"
};