'use strict';

const jwk = require('jsonwebtoken');
const jwkToPem = require('jwk-to-pem');
const request = require('request');

// For Auth0:       https://<project>.auth0.com/
// refer to:        http://bit.ly/2hoeRXk
// For AWS Cognito: https://cognito-idp.<region>.amazonaws.com/<user pool id>/
// refer to:        http://amzn.to/2fo77UI
const iss = 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_uW0nzHpa6';

// Generate policy to allow this user on this API:
const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};
  authResponse.principalId = principalId;
  if (effect && resource) {
    const policyDocument = {};
    policyDocument.Version = '2012-10-17';
    policyDocument.Statement = [];
    const statementOne = {};
    statementOne.Action = 'execute-api:Invoke';
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }
  return authResponse;
};

// Reusable Authorizer function, set on `authorizer` field in serverless.yml
module.exports.authorize = (event, context, cb) => {
  console.log('Auth function invoked');
  if (event.authorizationToken) {
    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7);
    // Also decode jwt header, options
    var tokenDecoded = jwk.decode(token, {complete:true} );
    // Read public key identifier from JWT
    var kid = null;
    if(tokenDecoded.header.kid) kid = tokenDecoded.header.kid;

    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: `${iss}/.well-known/jwks.json`, json: true },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          console.log('Request error:', error);
          cb('Unauthorized');
        }
        const keys = body.keys;
        console.log('Obtained public key(s)');

        /*
        This JSON hash is a set of JWKs, hence the name JWKS. 
        It may or may not consist of more than 1 JWK. 
        In the event where there are multiple JWKs, which one should we use to do the decoding?

        In the JWT, there is a key called kid in header section of the token, that is the first hash of the JWT. 
        Whereas in each JWK, there is also a key called kid. 
        Hence, we should use the JWK with the matching kid value to decode the JWT."
         */

        var pems = {};
        var kids = {};
        for (var i =0; i<keys.length; i++) {
          var k = keys[i];

          // Convert each key to PEM
          var jwkArray = {
            kty: k.kty,       // key_type
            n: k.n,           // modules
            e: k.e,           // exponent
          };
          var pem = jwkToPem(jwkArray);

          var key_id = k.kid;
          kids[i] = key_id;
          pems[key_id] = pem;
        }

        var proper_pem;
        if(kid) proper_pem = pems[kid]
        else proper_pem = pems[kids[0]];

        // Verify the token:
        jwk.verify(token, proper_pem, { issuer: iss }, (err, decoded) => {
          if (err) {
            console.log('Unauthorized user:', err.message);
            cb('Unauthorized');
          } else {
            cb(null, generatePolicy(decoded.sub, 'Allow', event.methodArn));
          }
        });
      });
  } else {
    console.log('No authorizationToken found in the header.');
    cb('Unauthorized');
  }
};
