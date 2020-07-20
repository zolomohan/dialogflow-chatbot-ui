import $ from 'jquery';
import random from 'helpers/randomFromArray';
import errorMessages from 'helpers/messages/error';
import dialogflow from 'config/dialogflow';
import resIdentifier from 'config/resIndentifier';

export default async (userResponse) => {
  let response = {};
  await $.post({
    url: dialogflow.url,
    contentType: 'application/json; charset=utf-8',
    dataType: 'json',
    data: JSON.stringify({
      text: userResponse,
    }),
  })
    .then((res) => {
      if (res.fulfillmentMessages.length > 1)
        response.carousel = res.fulfillmentMessages[1].payload.fields.card.listValue.values;

      res = res.fulfillmentText;
      const multiSelect = res.split(new RegExp(resIdentifier.multiSelect));
      res = multiSelect[0];
      response.multiSelect = multiSelect.splice(1);
      const suggestions = res.split(new RegExp(resIdentifier.suggestion));
      res = suggestions[0];
      response.suggestions = suggestions.splice(1);

      const texts = res.split(new RegExp(resIdentifier.text));
      res = texts[0];
      response.texts = texts.splice(1);
      response.images = res.split(new RegExp(resIdentifier.image)).splice(1);
    })
    .catch(() => {
      response.texts = [random(errorMessages)];
      response.suggestions = [];
      response.multiSelect = [];
      return response;
    });
  return response;
};
