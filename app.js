var Twitter = require('twitter')
const express = require("express");
require('dotenv').config();
var fs = require('fs')
const lineReader = require('line-reader');

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

var currentMessage = "";
var messageArray = [];
var lineCount = 0;

app.get("/", function(req, res){
  lineReader.eachLine('data.txt', (line, last) => {
      //console.log(line);
      messageArray.push(line);
      lineCount++;
  });
  console.log("Selected one is: " + messageArray[Math.floor((Math.random()*lineCount))]);
});

// fs.readFile('data.txt', function(err, data)
// {
//     if (err) throw err;
//
//     currentMessage = data.toString().split("\n");
//
//     console.log(currentMessage)
// });

// var text = "";
// async function FileReader(file) {
//   TEXT = await file.text();
// }
// function RandomText(text) {
//   const textArray = text.split("n");
//   const randomKey = Math.floor(Math.random() * textArray.length);
//   console.log(textArray[randomKey]);
// }


// client.post('statuses/update', {status: 'I Love Twitter'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body.
//   console.log(response);  // Raw response object.
// });

// app.get("/", function(req, res){
//   var params = {screen_name: 'WisdomWilkinson'};
//   client.get('statuses/user_timeline', params, function(error, tweets, response) {
//     if (!error) {
//       console.log(tweets);
//     } else {
//       console.log(error);
//     }
//   });
// });

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
// app.listen(port, function() {
//   console.log("Server started on port 3000");
// });

app.listen(3000, function() {
  console.log("Server started on port 3000.");
});
