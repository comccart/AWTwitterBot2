var Twitter = require('twitter')
const express = require("express");
require('dotenv').config();
var fs = require('fs')
const lineReader = require('line-reader');
const lineByLine = require('n-readlines');

const app = express();

var client = new Twitter({
  consumer_key: process.env.API_KEY,
  consumer_secret: process.env.API_SECRET_KEY,
  access_token_key: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

// var client = new Twitter({
//   consumer_key: process.env.API_KEY,
//   consumer_secret: process.env.API_SECRET_KEY,
//   bearer_token: process.env.BEARER_TOKEN
// });

var messageArray = [];

const liner = new lineByLine('./data.txt');

let line;
let lineNumber = 0;

function sendTweet() {
  while (line = liner.next()) {
    //console.log('Line ' + lineNumber + ': ' + line.toString('ascii'));
    messageArray.push(line);
    lineNumber++;
  }

  //console.log('end of line reached');

  //console.log("Line Count is " + lineNumber);
  var num = Math.floor((Math.random() * lineNumber));
  //console.log("Random Number is " + num);
  var currentMessage = messageArray[num];
  //console.log("Selected message is: " + currentMessage);

  client.post('statuses/update', {
    status: '' + currentMessage
  }, function(error, tweet, response) {
    if (error) {
      console.log(error);
    } else {
      console.log(tweet);
    }
  });

}

//// TODO: push to git, check on Vercel

// Try to retweet something as soon as we run the program...
sendTweet();
// ...and then every 36 hours after that. Time here is in milliseconds, so
// 1000 ms = 1 second, 1 sec * 60 = 1 min, 1 min * 60 = 1 hour --> 1000 * 60 * 60 * 36
setInterval(sendTweet, 1000 * 30 * 60 * 36);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port, function() {
  console.log("Server started on port " + port);
});

// app.listen(3000, function() {
//   console.log("Server started on port 3000.");
// });
