import $ from 'jquery';
import random from 'helpers/randomFromArray';
import errorMessages from 'helpers/messages/error';
import dialogflow from 'config/dialogflow';

export default async (userResponse) => {
	let response = new Object();
	await $.post({
		url: dialogflow.url,
		contentType: 'application/json; charset=utf-8',
		dataType: 'json',
		headers: {
			Authorization: `Bearer ${dialogflow.accessToken}`
		},
		data: JSON.stringify({
			query: userResponse,
			lang: 'en',
			sessionId: dialogflow.sessionId
		})
	})
		.then((res) => {
			res = res.result.fulfillment.speech;
			const suggestions = res.split(/<ar>/);
			res = suggestions[0];
			response.suggestions = suggestions.splice(1);

			const texts = res.split(/<br>/);
			res = texts[0];
			response.texts = texts.splice(1);
			response.images = res.split(/<img>/).splice(1);
		})
		.catch(() => (response.texts = [ random(errorMessages) ]));
	return response;
};
