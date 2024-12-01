import { Given, When, Then } from '@cucumber/cucumber';                
import { request, APIRequestContext, APIResponse} from 'playwright';   
import assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';

let response: APIResponse;
let responses: APIResponse[] = [];
let responseTime: number;
let responseTimes: number[] = [];

const configPath = path.resolve(process.cwd(), 'utilities/config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

Given('I send a GET request to agify API for name {string}', async function (name:string) {
  const url = `${config.agifyApiUrl}?name=${name}`;   
  const requestContext = await request.newContext();
  const startTime = Date.now();
   response = await requestContext.get(url);                
   responseTime = Date.now() - startTime;
  });

When('the response status is {int}', function (statusCode:number) {
  assert.strictEqual(response.status(), statusCode);
  });

  Then('the response should contain the field {string} with value {string}', async function (nameField:string, nameValue:string) {
    const responseBody = await response.json();
    console.log('Response Body:', responseBody); 
    assert.ok(responseBody.hasOwnProperty(nameField), `Expected field "${nameField}" not found in response`); 
    assert.strictEqual(responseBody.name, nameValue, `Expected name "${nameValue}" not found in response`);
  });
  

Then('the response should contain the field {string}', async function (field:string) {
  const responseBody = await response.json(); 
  assert.ok(responseBody.hasOwnProperty(field), `Expected field "${field}" not found in response`); 
});

Given('I send a GET request to agify API with no name parameter', async () => {
  const url = `${config.agifyApiUrl}`;
  const requestContext = await request.newContext();
  response = await requestContext.get(url);
});

Then('the response time should be less than {int} milliseconds', function (maxResponseTime: number) {
  assert.ok(responseTime < maxResponseTime, `Expected response time to be less than ${maxResponseTime} milliseconds, but got ${responseTime} milliseconds`);
});

Then('the response status code should be {int}', (expectedStatuscode: number) => {
  for (const response of responses) {
    assert.strictEqual(response.status(), expectedStatuscode);
  }
});

Then('the response should contain {string}', async function (ExpectedErrorMessage:string) {
  for (const response of responses) {
    const responseBody = await response.json();
    assert.strictEqual(responseBody.error, ExpectedErrorMessage); 
    }
});

Then('the error message should contain {string}', async function (expectedMessage: string) {
  const responseBody = await response.json();
  console.log('Response Body:', responseBody); 
  assert.ok(responseBody.error.includes(expectedMessage), `Expected error message "${expectedMessage}" not found in response`);
});

Given('I make a request to the Agify API with the name parameter containing {string}', async (sqlInjectionString: string) => {
  const url = `${config.agifyApiUrl}?name=${encodeURIComponent(sqlInjectionString)}`;
  const requestContext = await request.newContext();
   response = await requestContext.get(url); 
  });

Then('the response body should not expose any database error message', async () => {
  const responseBody = await response.json();
  assert.ok(!/database|sql|syntax|error/i.test(JSON.stringify(responseBody)), 'Expected no database error message in response');
});


Then('the response body should not contain the injected script', async function () {
  const responseBody = await response.json();
  console.log('Response Body:', responseBody); 
  assert.ok(!responseBody.includes("<script>alert('XSS')</script>"), 'Injected script found in response body');
});

Given('I make a request to the Agify API without a valid API key', async function () {
  const url = `${config.agifyApiUrl}?name="Michael"&apikey="fhggjh"`;
  const requestContext = await request.newContext();
  response = await requestContext.get(url, {
    headers: {
      'Authorization': 'InvalidAPIKey'
    }
  });
});

Given('I send a POST request to agify API for name {string}', async(name: string) => {
  const url = `${config.agifyApiUrl}?name=${name}`;   
  const requestContext = await request.newContext();
  response = await requestContext.post(url); 
})

Given('I make 101 requests concurrently to the Agify API in a day', { timeout: 60000 }, async function () {
  const names = ['alice', 'bob', 'charlie', 'david', 'eve', 'frank', 'grace', 'heidi', 'ivan', 'judy'];
  const requestContext = await request.newContext();

  const requests = [];
  for (let i = 0; i < 101; i++) {
    const name = names[i % names.length];
    const url = `${config.agifyApiUrl}?name=${name}`;
    const requestPromise = requestContext.get(url).then(response => {
      responses.push(response);
    });
    requests.push(requestPromise);
  }

  await Promise.all(requests);
});

