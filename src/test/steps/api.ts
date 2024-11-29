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

Then('the response should contain the field {string}', async function (field:string) {
  const responseBody = await response.json(); 
  assert.ok(responseBody.hasOwnProperty(field), `Expected field "${field}" not found in response`); 
});

Then('the age should be {string}', async function (expectedAge: string) {
  const responseBody = await response.json();
  assert.strictEqual(responseBody.age, expectedAge === "null" ? null : parseInt(expectedAge, 10));
});

Given('I send a GET request to agify API with no name parameter', async () => {
  const url = `${config.agifyApiUrl}`;
  const requestContext = await request.newContext();
  response = await requestContext.get(url);
});

Then('the response time should be less than {int} milliseconds', function (maxResponseTime: number) {
  assert.ok(responseTime < maxResponseTime, `Expected response time to be less than ${maxResponseTime} milliseconds, but got ${responseTime} milliseconds`);
});

Given('I make 500 requests to the Agify API with various names', { timeout: 60000 },async function () {
    const names = ['alice', 'bob', 'charlie', 'david', 'eve', 'frank', 'grace', 'heidi', 'ivan', 'judy'];
  const requestContext = await request.newContext();

  for (let i = 0; i < 500; i++) {
    const name = names[i % names.length];
    const url = `${config.agifyApiUrl}?name=${name}`;
    const startTime = Date.now();
    response = await requestContext.get(url);
    const endTime = Date.now();
    responseTimes.push(endTime - startTime);
  }
});

Then('the average response time should be less than {int}ms', function (maxAverageResponseTime: number) {
  const totalResponseTime = responseTimes.reduce((accumulatedValue, currentResponsetime) => accumulatedValue + currentResponsetime, 0);
  const averageResponseTime = totalResponseTime / responseTimes.length;
  assert.ok(averageResponseTime < maxAverageResponseTime, `Expected average response time to be less than ${maxAverageResponseTime}ms, but got ${averageResponseTime}ms`);
});

Given('I make 500 requests concurrently to the Agify API', { timeout: 60000 }, async function () {
  const names = ['alice', 'bob', 'charlie', 'david', 'eve', 'frank', 'grace', 'heidi', 'ivan', 'judy'];
  const requestContext = await request.newContext();

  const requests = [];
  for (let i = 0; i < 500; i++) {
    const name = names[i % names.length];
    const url = `${config.agifyApiUrl}?name=${name}`;
    const startTime = Date.now();
    const requestPromise = requestContext.get(url).then(response => {
      const endTime = Date.now();
      responseTimes.push(endTime - startTime);
      responses.push(response);
    });
    requests.push(requestPromise);
  }
  await Promise.all(requests);
});

Then('the system should handle all requests without crashing or significant delay', function () {
  const totalResponseTime = responseTimes.reduce((aaccumulatedValuecc, currentResponsetime) => aaccumulatedValuecc + currentResponsetime, 0);
  const averageResponseTime = totalResponseTime / responseTimes.length;
  console.log(`Average Response Time: ${averageResponseTime}ms`);
  assert.ok(averageResponseTime < 2000, `Expected average response time to be less than 1000ms, but got ${averageResponseTime}ms`);
});

Then('the response status code for all requests should be {int}', function (statusCode: number) {
  for (const response of responses) {
    assert.strictEqual(response.status(), statusCode);
  }
});

Given('I send 10000 requests to the Agify API in 10 seconds', { timeout: 20000 }, async function () {
  const names = ['alice', 'bob', 'charlie', 'david', 'eve', 'frank', 'grace', 'heidi', 'ivan', 'judy'];
  const requestContext = await request.newContext();

  const requests = [];
  for (let i = 0; i < 10000; i++) {
    const name = names[i % names.length];
    const url = `${config.agifyApiUrl}?name=${name}`;
    const requestPromise = requestContext.get(url).then(response => {
      responses.push(response);
    });
    requests.push(requestPromise);
  }
  // Enforce the 10-second time limit
  await Promise.race([
    Promise.all(requests),
    new Promise(reject => setTimeout(() => reject(new Error('Timeout: 10 seconds exceeded')), 10000))
  ]);
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
    assert.strictEqual(responseBody.error, ExpectedErrorMessage);
  
        assert.strictEqual(responseBody.error, ExpectedErrorMessage);
  
    }
});

Given('I make a request to the Agify API with the name parameter containing a SQL injection payload {string}', async (sqlInjectionString: string) => {
  const url = `${config.agifyApiUrl}?name=%27%20OR%201=1%20--`;
  const requestContext = await request.newContext();
   response = await requestContext.get(url); 
  })

Then('the response body should not expose any database error message', async () => {
  const responseBody = await response.json();
   assert.ok(!responseBody.hasOwnProperty('error'), 'Expected no database error message in response');
})



