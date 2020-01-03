# Dialogflow Chat Bot User Interface

## How to Use

In order to use this interface for your bot, modify **src/config/dialgflow.js**

<pre>
export default {
  url: 'https://api.dialogflow.com/v1/query?v=20150910',
  accessToken: ' <b>Your Access Token Goes Here</b> ',
  sessionId: ' <b>Random Session ID</b> ',
};
</pre>

To modify the bot preferences, modify **src/config/bot.js**

<pre>
export default {
  name: ' <b>Your Bot Name Goes Here</b> ',
  avatar: '<b> link to the bot avatar goes here</b>'
}
</pre>

### Dialogflow

Responses to Intents must contain tag descriptions.
These tags can be set in config/resIdentifier.js.

For Example,
```
export default{
  text: '<text>',
  image: '<img>',
  suggestion: '<sug>'
}
```
  
### Example: 

**User Respnse:** Hello

**Bot Response**: <b>\<text\></b>Hey There!<b>\<img\></b><em>Image Link</em><b><sug\></b>Set Alarm<b><sug\></b>To-Do


<blockquote>This project was bootstrapped with <a href="https://github.com/facebook/create-react-app">Create React App</a>.</blockquote>
