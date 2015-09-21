'use strict';

var apiKeys = require('./api-keys');
var Twitter = require('twit');

var hashtag = '#whatisnpm';

function formatTweet(tweet){
  return {
    text: tweet.text,
    user: tweet.user.screen_name,
    avatar: tweet.user.profile_image_url
  };
}

function run(hashtag, callback){
  var tweets = new Twitter(apiKeys.twitterKeys);

  tweets.get('search/tweets', { q: hashtag }, function(err, data, response) {
    if(data && data.statuses){
      data.statuses
        .map(formatTweet)
        .forEach(callback);
    }
  });

  var stream = tweets.stream('statuses/filter', { track: hashtag });

  stream.on('tweet', function (tweet) {
    callback(formatTweet(tweet));
  });
}

module.exports = run;

if(require.main === module){
  run('#whatisnpm', function(tweet){
    console.log(tweet);
  });
}
