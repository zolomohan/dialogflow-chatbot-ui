# JIT Chat Bot
A Chat Bot Using DialogFlow created for Jeppiaar Institute of Technology

## Working
This Chat Bot uses AJAX to perform Get Requests to the Dialogflow API where the Chat Bot is Set Up. <br />
The Details are setup in Firebase which is fetched by Dialogflow. <br />
This Chat Bot uses the V2 API provided by Dialogflow.

In Order to Use This Code, <br />
Create a Chat Bot using Dialogflow and Copy the AccessToken and The Base URL and replace it in "accessToken.js"

### accessToken.js File Content Format

<pre>
const accessToken = ' <em><strong> ** You Access Token Goes Here ** </strong></em>',
      baseUrl = ' <em><strong> ** Your Base URL of the API Goes Here ** </strong></em> ';
      
export { accessToken, baseUrl };
</pre>
