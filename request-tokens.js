'use strict';

var prompt = require('prompt');
var fs = require('fs');
var _ = require('lodash');

var schema = {
  properties: {}
};

[
  'consumer_key',
  'consumer_secret',
  'access_token',
  'access_token_secret'
]
  .forEach(function(key){
    schema.properties[key] = {
      required: true,
      message: 'Enter your ' + key + ' from dev.twitter.com'
    };
  });

prompt.start();

prompt.get(schema, function(err, results){
  if(err){
    console.error(err);
    process.exit(1);
  }

  var template = fs.readFileSync('./_api-keys.js');
  var compiled = _.template(template);

  fs.writeFileSync('./api-keys.js', compiled(results));

  console.log('api-keys.js successfully generated.');
});
