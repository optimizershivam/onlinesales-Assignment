
const readline = require('readline');
const Bottleneck = require('bottleneck');




const API_URL = 'http://api.mathjs.org/v4/'; 

// Configured rate limiting
const API_RATE_LIMIT = 50; // API rate limit per second
const MAX_CONCURRENT_REQUESTS = 500; // Maximum number of concurrent requests

// Created a readline interface for reading user input from the console
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  // Created a queue to store expressions
  const requestQueue = [];
  
  // Created a  rate limiter to control the rate at which expressions are sent to the API
  const limiter = new Bottleneck({
    maxConcurrent: API_RATE_LIMIT,
    minTime: Math.ceil(1000 / API_RATE_LIMIT),
  });
  

  
  // Function to evaluate an expression using the API
  async function evaluateExpression(expression) {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"expr":[expression] })
      });
  
      const data = await response.json();
      return data.result;
    } catch (error) {
      throw error;
    }
  }
  
 
 
  // Function to process expressions from user input
  async function processUserInput() {
    console.log('Enter expressions to evaluate (type "end" to finish):');
  
    for await (const expression of rl) {
      if (expression.trim().toLowerCase() === 'end') {
        rl.close();
        break;
      }
  
      requestQueue.push(expression);
      rl.prompt();
    }
  }
  
 /// Function to process the request queue
async function processRequestQueue() {
  while (requestQueue.length > 0) {
    const expression = requestQueue.shift();

    try {
      const result = await limiter.schedule(() => evaluateExpression(expression));
      console.log(`${expression} => ${result}`);
    } catch (error) {
      console.log(`Error evaluating ${expression}: ${error.message}`);
    }
  }
}
 // Main function
async function main() {
  // Start processing expressions from user input
  await processUserInput();

  // Process the request queue
  await processRequestQueue();
}


main().catch(error => console.error(error));

// step to run the code.

// step 1 - npm install

// step 2 - node index.js

// step 3 - Enter expressions to evaluate (type "end" to finish)
         
   /*       example -  2 * 4 * 4
                       5 / (7 - 5)
                       sqrt(5^2 - 4^2)
                       sqrt(-3^2 - 4^2)
                       end
*/
