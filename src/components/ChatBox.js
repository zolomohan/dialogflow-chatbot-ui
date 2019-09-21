import React, { useState, useEffect } from 'react';
import useToggleState from '../hooks/useToggleState';
import useLogState from '../hooks/useLogState';
import $ from 'jquery';
import Header from './Header';
import Logs from './Logs';
import Suggestions from './Suggestions';
import Form from './Form';
import speech from '../helpers/speechOutput';
import classes from '../styles/Chat.module.css';

export default function ChatBox({ open, toggleChatBox }) {
	let voiceRecogntion = new window.webkitSpeechRecognition();
	const [ log, addLog ] = useLogState();
	const [ suggestions, setSuggestions ] = useState([]);
	const [ speechInput, toggleSpeechInput ] = useToggleState();
	const [ typing, toggleTyping, setTyping ] = useToggleState();
	const [ speechOutput, toggleSpeechOutput ] = useToggleState(true);

	useEffect(speech.cancel, [ speechOutput ]);
	useEffect(() => (speechInput ? startVoiceRecognition() : voiceRecogntion.stop()), [
		speechInput
	]);

	const addMessage = (type, payload, user) => {
		if (user === 'bot') {
			setTyping(false);
			if (speechOutput && type !== 'image') speech.speak({ text: payload });
		}
		addLog(type, payload, user);
	};

	const handleSubmit = (userResponse) => {
		addMessage('text', userResponse, 'user');
		postUserResponseToAPI(userResponse);
	};

	const postUserResponseToAPI = (text) => {
		toggleTyping();
		$.ajax({
			type: 'POST',
			url: 'https://api.dialogflow.com/v1/query?v=20150910',
			contentType: 'application/json; charset=utf-8',
			dataType: 'json',
			headers: {
				Authorization: 'Bearer 38578c4faf424691a4540abffe6a1ec8'
			},
			data: JSON.stringify({
				query: text,
				lang: 'en',
				sessionId: 'somerandomthing'
			})
		})
			.then((data) => parseResponse(data.result.fulfillment.speech))
			.catch(() =>
				addMessage(
					'text',
					"it seems like there's something wrong. could you try again later?",
					'bot'
				)
			);
	};

	const parseResponse = (res) => {
		res = res.replace(/[""]/g, '');
		if (res.includes('<ar>')) suggestionResponse(res);
		else if (res.includes('<br>')) chatResponse(res);
		else if (res.includes('<img>')) imageResponse(res);
		else addMessage('text', res, 'bot');
	};

	const suggestionResponse = (res) => {
		chatResponse(res.split(/<ar>/)[0]);
		setSuggestions([]);
		setSuggestions(res.split(/<ar>/).splice(1));
	};

	const chatResponse = (res) => {
		const messages = res.split(/<br>/).splice(1);
		for (var message of messages) addMessage('text', message, 'bot');
	};

	const imageResponse = (res) => addMessage('image', res.split(/<img>/)[1], 'bot');

	const startVoiceRecognition = () => {
		voiceRecogntion.lang = 'en-US';
		voiceRecogntion.onresult = (event) => {
			let text = '';
			for (let i = event.resultIndex; i < event.results.length; ++i)
				text += event.results[i][0].transcript;
			postUserResponseToAPI(text);
			addMessage('text', text, 'user');
			toggleSpeechInput();
		};
		voiceRecogntion.start();
	};

	return (
		<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header
				toggleChatBox={toggleChatBox}
				speechOutput={speechOutput}
				toggleSpeechOutput={toggleSpeechOutput}
			/>
			<Logs messages={log} typingIndicator={typing} />
			<Suggestions suggestions={suggestions} handleSubmit={handleSubmit} />
			<Form
				speechInput={speechInput}
				toggleSpeechInput={toggleSpeechInput}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}
