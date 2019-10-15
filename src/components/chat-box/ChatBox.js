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
		let transcript = '';
		for (let i = event.resultIndex; i < event.results.length; ++i)
			transcript += event.results[i][0].transcript;
		onUserResponse(transcript);
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

	const addMessage = (type, payload, user = 'bot') => {
		if (user === 'bot') {
			setTyping(false);
			if (speechOutput && type !== 'image') speech.speak({ text: payload });
		}
		addLog(type, payload, user);
	};

	const onUserResponse = (userResponse) => {
		fetchBotResponse(userResponse).then(onBotResponse);
		addMessage('text', userResponse, 'user');
		setTyping(true);
	};

	const onBotResponse = (botResponse) => {
		setSuggestions(botResponse.suggestions);
		botResponse.texts.map((text) => addMessage('text', text));
		botResponse.images.map((image) => addMessage('image', image));
	};

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