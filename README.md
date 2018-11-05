# API Gateway Authorizer Function for Auth0 or AWS Cognito using the [JWKS](https://auth0.com/docs/jwks) method.

This code is coming from one of serverless examples found here
https://github.com/serverless/examples/tree/master/aws-node-auth0-cognito-custom-authorizers-api

Missing support for JWKS and usage of kid claim for verifying token signature were added.

## Setup

1. `npm install` json web token dependencies

2. In [auth.js](auth.js#L10) replace the value of `iss` with either your [Auth0 iss](http://bit.ly/2hoeRXk) or [AWS Cognito ISS](http://amzn.to/2fo77UI). No need in trailing `/`.

  ```js
  /* auth.js */
  // Replace with your auth0 or Cognito values
  const iss = "https://<url>.com";
  ```

3. Zip and Deploy to AWS as lambda function. Node.js runtime v4.3

## Test Authentication:  
-  Test with [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop?hl=en): Make a new GET request with the Header containing "Authorization" with the value being "bearer `<id_token>`" for your `api/private` url.
- Test using curl:
  ```sh
  curl --header "Authorization: bearer <id_token>" https://{api}.execute-api.{region}.amazonaws.com/api/private
  ```
