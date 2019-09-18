import React, { useState, useEffect } from 'react';
import useToggleState from '../hooks/useToggleState';
import $ from 'jquery';
import Header from './Header';
import Logs from './Logs';
import Suggestions from './Suggestions';
import Form from './Form';
import speech from '../helpers/speechOutput';
import classes from '../styles/Chat.module.css';

export default function ChatBox({ open, toggleChatBox }) {
	let voiceRecogntion = new window.webkitSpeechRecognition();
	const [ log, setLog ] = useState([
		{
			text:
				"Hey I am Krypto! Say ' Hi ' to talk with me. I'll let you know the details of our college",
			variant: 'bot'
		}
  ]);
	const [ suggestions, setSuggestions ] = useState([]);
	const [ speechInput, toggleSpeechInput ] = useToggleState();
	const [ typing, toggleTyping, setTyping ] = useToggleState();
	const [ speechOutput, toggleSpeechOutput ] = useToggleState(true);

	useEffect(speech.cancel, [ speechOutput ]);
	useEffect(() => (speechInput ? startVoiceRecognition() : voiceRecogntion.stop()), [
		speechInput
	]);

	const addMessage = (text, variant) => {
		if (variant === 'bot') {
			setTyping(false);
			if (speechOutput) speech.speak({ text });
		}
		let newLog = log;
		newLog.push({ text, variant });
		setLog(newLog);
	};

	const addImage = (image, variant) => {
		let newLog = log;
		newLog.push({ image, variant });
		setLog(newLog);
		setTyping(false);
	};

	const handleSubmit = (userResponse) => {
		addMessage(userResponse, 'user');
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
				Authorization: 'Bearer ' + '38578c4faf424691a4540abffe6a1ec8'
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
		else this.addMessage(res, 'bot');
	};

	const suggestionResponse = (res) => {
		chatResponse(res.split(/<ar>/)[0]);
		setSuggestions([])
		setSuggestions(res.split(/<ar>/).splice(1))
	};

	const chatResponse = (res) => {
		const messages = res.split(/<br>/).splice(1);
		for (let message of messages) addMessage(message, 'bot');
	};

	const imageResponse = (res) => addImage(res.split(/<img>/)[1], 'bot');

	const startVoiceRecognition = () => {
		voiceRecogntion.lang = 'en-US';
		voiceRecogntion.onresult = (event) => {
			let text = '';
			for (let i = event.resultIndex; i < event.results.length; ++i)
				text += event.results[i][0].transcript;
			postUserResponseToAPI(text);
			addMessage(text);
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
				addMessage={addMessage}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}
