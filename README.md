# JIT CHAT BOT
A Chat Bot for Jeppiaar Institute of Technology Using DialogFlow

## Working
This Chat Bot uses AJAX to perform Get Requests to the Dialogflow API where the Chat Bot is Set Up. <br />
This Chat Bot uses the V2 API provided by Dialogflow.

In Order to Use This Code, <br />
Create a Chat Bot using Dialogflow and Copy the AccessToken and The Base URL and Add it in a new File named "accessToken.js"

### accessToken.js File Content Format

const accessToken = ' <em><strong> ** You Access Token Goes Here ** </strong></em>', <br />
      baseUrl = ' <em><strong> ** Your Base URL of the API Goes Here ** </strong></em> ';

export { accessToken, baseUrl };
