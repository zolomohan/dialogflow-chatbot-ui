import React, { useState, useEffect } from 'react';
import useToggleState from 'hooks/useToggleState';
import Speech from 'speak-tts';
import Header from 'components/chat-box/Header';
import Log from 'components/chat-box/log/Log';
import SuggestionBox from 'components/chat-box/suggestions/SuggestionBox';
import Form from 'components/chat-box/Form';
import fetchBotResponse from 'helpers/fetchBotResponse';
import useLogState from 'hooks/useLogState';
import speechConfig from 'config/speechOutput';
import { chatBox } from 'styles/ChatBox.module.css';

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
		[ speechInput, speechRecognition ]
	);

	const onUserResponse = (response) => {
		fetchBotResponse(response).then(onBotResponse);
		addLog({ texts: [ response ] }, 'user');
		setTyping(true);
	};

	const onBotResponse = (response) => {
		setSuggestions(response.suggestions);
    addLog(response, 'bot');
    if (speechOutput)
      response.texts.map((text) => speech.speak({text}))
		setTyping(false);
	};

	return (
		<div className={chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header
				toggleChatBox={toggleChatBox}
				speechOutput={speechOutput}
				toggleSpeechOutput={toggleSpeechOutput}
			/>
			<Log log={log} typing={typing} noSuggestions={suggestions.length === 0} />
			<SuggestionBox suggestions={suggestions} handleSubmit={onUserResponse} />
			<Form
				speechInput={speechInput}
				toggleSpeechInput={toggleSpeechInput}
				handleSubmit={onUserResponse}
			/>
		</div>
	);
}
