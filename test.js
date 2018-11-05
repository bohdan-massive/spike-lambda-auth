'use strict';
const auth = require('./auth');
const assert = require('assert');

function testAuthorize() {

  // Arrange
  // todo: the token is already expired, it would be nice to retrieve fresh token from Cognito on every test run
  var token = "eyJraWQiOiIySXZ5WXoweGhzT01ZWGxqR0tuZFcxZlhJR3lnWjRhNWU5bUxDZitVNlZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODY2cXBiZXBydGpxODE5czNpZ2xnbDMwOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYm9oZGFuLXRlc3QtYXBpXC9nZXQiLCJhdXRoX3RpbWUiOjE1NDE0MTc3MjAsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3VXMG56SHBhNiIsImV4cCI6MTU0MTQyMTMyMCwiaWF0IjoxNTQxNDE3NzIwLCJ2ZXJzaW9uIjoyLCJqdGkiOiIxNWZhMTg2YS1iYjYzLTRmYzYtOGNkNS00ZTUwMDBhNDM3NmYiLCJjbGllbnRfaWQiOiIxODY2cXBiZXBydGpxODE5czNpZ2xnbDMwOCJ9.d2cKEfxkRVfVanbN-FXnWOcDYshkH0QYRedBiTDBcOPUo9ndAZ6B0Hv73FntfavKgSV1JGkFFkhChXfV1DY2-fXdkoXkajuV1kwyg2kVeOXk1PZtLJgqNZzShUXmjRpdefPJvCj12sLX74wTOSHPFadEi3qxZR4RMxVLV8JBkSgnFwk9vIxQMtLRBGr47W-V1HXfDGFh2dOCVxN6I5phhh6w4tr_lsaPHRqRqorfyLG5UPNmZsVq6p3CSiqWAdAWsRZdF0yoRXVvjmnX0JquDjCeau8-x1t4aYiodDs0ubx3utaPOeAgp7020rWzQxkfdD46rwg4LP8rNAvdfuSwzA";

  var event = new Object();
  event.authorizationToken = "bearer " + token;
  event.methodArn = "arn:aws:execute-api:us-east-1:908234515689:gilqw9rad7/authorizers/tpgx2c";

  // Act
  var local_err;
  auth.authorize(event, null, function (err, data) {
    if (err) console.log(err);
    else console.log(JSON.stringify(data));

    // Assert
    if (err) assert.fail(err);
    else assert.ok("passed");
  });
}

testAuthorize();
