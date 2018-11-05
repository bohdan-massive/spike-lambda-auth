'use strict';
var auth = require('./auth');

function testAuthorize() {

  // Arrange
  var token = "eyJraWQiOiIySXZ5WXoweGhzT01ZWGxqR0tuZFcxZlhJR3lnWjRhNWU5bUxDZitVNlZZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxODY2cXBiZXBydGpxODE5czNpZ2xnbDMwOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYm9oZGFuLXRlc3QtYXBpXC9nZXQiLCJhdXRoX3RpbWUiOjE1NDExNjc2MTcsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xX3VXMG56SHBhNiIsImV4cCI6MTU0MTE3MTIxNywiaWF0IjoxNTQxMTY3NjE3LCJ2ZXJzaW9uIjoyLCJqdGkiOiJhNmJkOWE3NS1jMjc3LTRkNGEtYTUxNC1iNzhjOTk3ZTE2ZWUiLCJjbGllbnRfaWQiOiIxODY2cXBiZXBydGpxODE5czNpZ2xnbDMwOCJ9.Vr_El1vZzW5FVzsibqzfXgYBuC-ikZxQ_f012iGXBjijoCkK_iZnLkokjLNLO_AwYOb8v_G9JyzYoo38wKkhJI3rK12RHs9wms0RLwfA-Vhxnts7Uto-NnPTX8aXLLJS-97a1Y51ydzaEyG_KxRs-OH2kF2c7ilL7dQh9VXC5jxft-UnYGvhkH2k6JSp6t-8uLVy-1zRGbNpqC6wueBVJ1V-nyI6qH0A12VrmvEefcQfHYlN4A--2pnPvZmC9xElaDmSbDC5ZtoO5Cn5xXkSCIEHr46MQYN_OG88tvJ6mKanKwONNiCZEhYCm8nnRm3XgQkooq19_gpprL8LLglJgQ";

var event = new Object();
event.authorizationToken = "Bearer " + token;
event.methodArn = "arn:aws:execute-api:us-east-1:908234515689:gilqw9rad7/authorizers/tpgx2c";

  // Act
  auth.authorize(event, null, function(err, data) {
    if(err) console.log(err);
    else console.log(JSON.stringify(data));
  });

  // Assert
}

testAuthorize();
