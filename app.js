'use strict';

var restify = require('restify');
var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Middleware
//=========================================================

// Anytime the major version is incremented any existing conversations will be restarted.
bot.use(builder.Middleware.dialogVersion({ version: 1.0, resetCommand: /^reset/i }));

const dashbot = require('dashbot')(process.env.DASHBOT_API_KEY,
  {debug:true, urlRoot: process.env.DASHBOT_URL_ROOT}).microsoft;

dashbot.setFacebookToken(process.env.FACEBOOK_PAGE_TOKEN);

bot.use(dashbot);


//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', function (session) {
    session.send('Hello World');
});