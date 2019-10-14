import $ from 'jquery';
import parser from 'helpers/parser';
import random from 'helpers/randomFromArray';
import errorMessages from 'helpers/messages/error';
import dialogflow from 'config/dialogflow';

export default async (userResponse) => {
	let botResponse = {
		texts: [],
		images: [],
		suggestions: []
	};

	const { url, accessToken, sessionId } = dialogflow;
	await $.post({
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
		.then((res) => (botResponse = parser(res.result.fulfillment.speech)))
		.catch(() => botResponse.texts.push(random(errorMessages)));
	return botResponse;
};
