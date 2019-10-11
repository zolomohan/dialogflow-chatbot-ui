import React, { useState, useEffect } from 'react';
import useToggleState from '../hooks/useToggleState';
import useLogState from '../hooks/useLogState';
import $ from 'jquery';
import Header from './Header';
import Logs from './Logs';
import Suggestions from './Suggestions';
import Form from './Form';
import speech from '../config/speechOutput';
import dialogflow from '../config/dialogflow';
import classes from '../styles/Chat.module.css';

export default function ChatBox({ open, toggleChatBox }) {
	let speechRecognition = new window.webkitSpeechRecognition();
	speechRecognition.onresult = (event) => {
		let text = '';
		for (let i = event.resultIndex; i < event.results.length; ++i)
			text += event.results[i][0].transcript;
		fetchBotResponse(text);
		addMessage('text', text, 'user');
		toggleSpeechInput();
	};
	const [ log, addLog ] = useLogState();
	const [ suggestions, setSuggestions ] = useState([]);
	const [ speechInput, toggleSpeechInput ] = useToggleState();
	const [ typing, toggleTyping, setTyping ] = useToggleState();
	const [ speechOutput, toggleSpeechOutput ] = useToggleState(true);

	useEffect(speech.cancel, [ speechOutput ]);
	useEffect(
		() => (speechInput ? speechRecognition.start() : speechRecognition.stop()),
		[ speechInput ]
	);

	const addMessage = (type, payload, user) => {
		if (user === 'bot') {
			setTyping(false);
			if (speechOutput && type !== 'image') speech.speak({ text: payload });
		}
		addLog(type, payload, user);
	};

	const onUserResponse = (res) => {
		fetchBotResponse(res);
		toggleTyping();
		addMessage('text', res, 'user');
	};

	const fetchBotResponse = (text) => {
		const { url, accessToken, sessionId } = dialogflow;
		$.post({
			url,
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			headers: {
				Authorization: `Bearer ${accessToken}`
			},
			data: JSON.stringify({
				query: text,
				lang: 'en',
				sessionId
			})
		})
			.then((res) => parseBotResponse(res.result.fulfillment.speech))
			.catch(() =>
				addMessage(
					'text',
					"it seems like there's something wrong. could you try again later?",
					'bot'
				)
			);
	};

	const parseBotResponse = (res) => {
		if (res.includes('<ar>')) parseSuggestions(res);
		else if (res.includes('<br>')) parseTextResponse(res);
		else if (res.includes('<img>')) parseImageResponse(res);
		else addMessage('text', res, 'bot');
	};

	const parseSuggestions = (res) => {
		parseTextResponse(res.split(/<ar>/)[0]);
		setSuggestions([]);
		setSuggestions(res.split(/<ar>/).splice(1));
	};

	const parseTextResponse = (res) => {
		if (res.includes('<img>')) parseImageResponse(res.split(/<br>/)[0]);
		const messages = res.split(/<br>/).splice(1);
		for (var message of messages) addMessage('text', message, 'bot');
	};

	const parseImageResponse = (res) => addMessage('image', res.split(/<img>/)[1], 'bot');

	return (
		<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header
				toggleChatBox={toggleChatBox}
				speechOutput={speechOutput}
				toggleSpeechOutput={toggleSpeechOutput}
			/>
			<Logs log={log} typingIndicator={typing} />
			<Suggestions suggestions={suggestions} handleSubmit={onUserResponse} />
			<Form
				speechInput={speechInput}
				toggleSpeechInput={toggleSpeechInput}
				handleSubmit={onUserResponse}
			/>
		</div>
	);
}
