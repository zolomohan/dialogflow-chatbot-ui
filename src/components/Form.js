import React from 'react';
import useInputState from '../hooks/useInputState';
import $ from 'jquery';
import Suggestions from './Suggestions';
import classes from '../styles/Form.module.css';

const DEFAULT_TIME_DELAY = 300;

export default function Form({ addMessage, addSuggesstion, resetSuggestions, suggesstions }) {
	const [ text, changeText, resetText ] = useInputState();

	function handleChange(event) {
		if (event.nativeEvent.inputType === 'insertLineBreak') {
			addMessage(text, 'user');
			postUserResponseToAPI(text);
			resetText();
		} else changeText(event);
	}

	function postUserResponseToAPI(text) {
		$.ajax({
			type: 'POST',
			url: 'https://api.dialogflow.com/v1/query?v=20150910',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			headers: {
				Authorization: 'Bearer ' + '1f2d4c70eb62402da8b081e30d8327f9'
			},
			data: JSON.stringify({ query: text, lang: 'en', sessionId: 'somerandomthing' })
		})
			.then((data) => parseResponse(data.result.fulfillment.speech))
			.catch(() =>
				addMessage(
					"it seems like there's something wrong. could you try again later?",
					'bot'
				)
			);
	}

	function parseResponse(responseString) {
		responseString = responseString.replace(/[""]/g, '');
		if (responseString.includes('<ar')) suggestionResponse(responseString);
		else if (responseString.includes('<br'))
			setTimeout(() => chatResponse(responseString), DEFAULT_TIME_DELAY);
		else addMessage(responseString, 'bot');
	}

	function suggestionResponse(message) {
		chatResponse(message);
		let suggestionList = message.split(/<ar>/).splice(1);
		resetSuggestions();
		setTimeout(() => addSuggesstion(suggestionList), DEFAULT_TIME_DELAY);
	}

	function chatResponse(message) {
		var matches,
			listOfMessages = [],
			regex = /\<br(?:\s+?(\d+))?\>(.*?)(?=(?:\<br(?:\s+\d+)?\>)|$)/g;

		while ((matches = regex.exec(message))) {
			if (matches[1] === undefined) matches[1] = DEFAULT_TIME_DELAY;
			var messageText = matches[2].split(/<ar>/);
			listOfMessages.push({
				text: messageText[0],
				delay: matches[1]
			});
		}

		var i = 0,
			numMessages = listOfMessages.length;

		(function theLoop(listOfMessages, i, numMessages) {
			setTimeout(() => {
				addMessage(listOfMessages[i].text, 'bot');
				if (i++ < numMessages - 1) {
					// showTypingIndicator();
					theLoop(listOfMessages, i, numMessages);
				}
			}, listOfMessages[i].delay);
		})(listOfMessages, i, numMessages);
	}

	return (
		<div className={classes.chatForm}>
			<div className={classes.chatInput}>
				<Suggestions suggesstions={suggesstions} />
				<div className={classes.suggestionDiv} />~
				<textarea
					value={text}
					onChange={handleChange}
					className={classes.input}
					placeholder="Type a message"
					rows="1"
					data-min-rows="1"
				/>
			</div>
			<div className={classes.chatFormButtons}>
				<i className="fas fa-microphone-slash" id="speechInput" />
			</div>
		</div>
	);
}
