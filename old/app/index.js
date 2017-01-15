/**
 * Created by kostya on 1/15/17.
 */

// const calc = require('./calc');
//
// const numbersToAdd = [
//     3,
//     4,
//     10,
//     2
// ];
//
// const result = calc.sum(numbersToAdd);
// console.log(`The result is: ${result}`);


// const http = require('http');
// const port = 3000;
//
// const requestHandler = (request, response) => {
//     console.log(request.url);
//     response.end('Hello node.js server!');
// };
//
// const server = http.createServer(requestHandler);
//
// server.listen(port, (err) => {
//    if (err) {
//        return console.log('something bad happened', err);
//    }
//
//    console.log(`server listening on ${port}`);
// });

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (request, response) => {
    response.send('Hello from express!')
});

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server listening on ${port}`);
});