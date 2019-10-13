import React, { useState, useEffect } from 'react';
import useToggleState from 'hooks/useToggleState';
import useLogState from 'hooks/useLogState';
import Speech from 'speak-tts';
import Header from 'components/chat-box/header/Header';
import Log from 'components/chat-box/log/Log';
import Suggestions from 'components/chat-box//suggestions/Suggestions';
import Form from 'components/chat-box/form/Form';
import fetchBotResponse from 'helpers/fetchBotResponse';
import speechConfig from 'config/speechOutput';
import { chatBox } from './ChatBox.module.css';

export default function ChatBox({ open, toggleChatBox }) {
	const speech = new Speech(),
		speechRecognition = new window.webkitSpeechRecognition();

	speech
		.init(speechConfig)
		.catch((error) =>
			console.error('An error occured while initializing Speech : ', error)
		);
	speechRecognition.onresult = (event) => {
		let text = '';
		for (let i = event.resultIndex; i < event.results.length; ++i)
			text += event.results[i][0].transcript;
		fetchBotResponse(text, parseBotResponse, addMessage);
		addMessage('text', text, 'user');
		toggleSpeechInput();
	};

	const [ log, addLog ] = useLogState();
	const [ suggestions, setSuggestions ] = useState([]);
	const [ speechInput, toggleSpeechInput ] = useToggleState();
	const [ typing, setTyping ] = useState(false);
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
		fetchBotResponse(res, parseBotResponse, addMessage);
		addMessage('text', res, 'user');
		setTyping(true);
	};

	const parseBotResponse = (res) => {
		if (res.includes('<ar>')) parseSuggestions(res);
		else if (res.includes('<br>')) parseTextResponse(res);
		else if (res.includes('<img>')) parseImageResponse(res);
		else addMessage('text', res, 'bot');
	};

	const parseSuggestions = (res) => {
		parseTextResponse(res.split(/<ar>/)[0]);
		setSuggestions(res.split(/<ar>/).splice(1));
	};

	const parseTextResponse = (res) => {
		if (res.includes('<img>')) parseImageResponse(res.split(/<br>/)[0]);
		const messages = res.split(/<br>/).splice(1);
		for (var message of messages) addMessage('text', message, 'bot');
	};

	const parseImageResponse = (res) => addMessage('image', res.split(/<img>/)[1], 'bot');

	return (
		<div className={chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header
				toggleChatBox={toggleChatBox}
				speechOutput={speechOutput}
				toggleSpeechOutput={toggleSpeechOutput}
			/>
			<Log log={log} typing={typing} />
			<Suggestions suggestions={suggestions} handleSubmit={onUserResponse} />
			<Form
				speechInput={speechInput}
				toggleSpeechInput={toggleSpeechInput}
				handleSubmit={onUserResponse}
			/>
		</div>
	);
}
