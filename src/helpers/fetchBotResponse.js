import $ from 'jquery';
import random from 'helpers/randomFromArray';
import errorMessages from 'helpers/messages/error';
import dialogflow from 'config/dialogflow';

export default (userResponse, parseBotResponse, addMessage) => {
	const { url, accessToken, sessionId } = dialogflow;
	$.post({
		url,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		headers: {
			Authorization: `Bearer ${accessToken}`
		},
		data: JSON.stringify({
			query: userResponse,
			lang: 'en',
			sessionId
		})
	})
		.then((res) => parseBotResponse(res.result.fulfillment.speech))
		.catch(() => addMessage('text', random(errorMessages), 'bot'));
};
