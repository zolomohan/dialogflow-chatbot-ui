import React, { Component } from 'react';
import $ from 'jquery';
import Speech from 'speak-tts';
import Header from './Header';
import Logs from './Logs';
import Suggestions from './Suggestions';
import Form from './Form';
import classes from '../styles/Chat.module.css';

export default class ChatBox extends Component {
	constructor(props) {
		super(props);
		this._speech = new Speech();
		this._voiceRecogntion = new window.webkitSpeechRecognition();
		this._speech
			.init({
				volume: 0.5,
				lang: 'en-GB',
				rate: 1,
				pitch: 1,
				voice: 'Google UK English Female'
			})
			.catch((error) =>
				console.error('An error occured while initializing Speech : ', error)
			);

		this.state = {
			log: [
				{
					text:
						"Hey I am Krypto! Say ' Hi ' to talk with me. I'll let you know the details of our college",
					variant: 'bot'
				}
			],
			suggestions: [],
			speechOutput: true,
			speechInput: false,
			typingIndicator: false
		};
	}

	toggleSpeechOutput = () =>
		this.setState(
			({ speechOutput }) => ({ speechOutput: !speechOutput }),
			this._speech.cancel
		);

	toggleSpeechInput = () =>
		this.setState(
			({ speechInput }) => ({ speechInput: !speechInput }),
			() =>
				this.state.speechInput
					? this.startVoiceRecognition()
					: this._voiceRecogntion.stop()
		);

	toggleTypingIndicator = () =>
		this.setState(({ typingIndicator }) => ({ typingIndicator: !typingIndicator }));

	addMessage = (text, variant) => {
		if (variant === 'bot') {
			this.toggleTypingIndicator();
			if (this.state.speechOutput) this._speech.speak({ text });
		}
		this.setState(({ log }) => ({
			log: [ ...log, { text, variant } ]
		}));
	};

	addImage = (image, variant) => {
		this.setState(({ log }) => ({
			log: [ ...log, { image, variant } ]
		}));
		this.toggleTypingIndicator();
	};

	addSuggesstion = (suggestions) => this.setState({ suggestions });

	resetSuggestions = () => this.setState({ suggesstion: [] });

	handleSubmit = (userResponse) => {
		this.addMessage(userResponse, 'user');
		this.postUserResponseToAPI(userResponse);
	};

	postUserResponseToAPI = (text) => {
		this.toggleTypingIndicator();
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
			.then((data) => this.parseResponse(data.result.fulfillment.speech))
			.catch(() =>
				this.addMessage(
					"it seems like there's something wrong. could you try again later?",
					'bot'
				)
			);
	};

	parseResponse = (res) => {
		res = res.replace(/[""]/g, '');
		if (res.includes('<ar>')) this.suggestionResponse(res);
		else if (res.includes('<br>')) this.chatResponse(res);
		else if (res.includes('<img>')) this.imageResponse(res);
		else this.addMessage(res, 'bot');
	};

	suggestionResponse = (res) => {
		this.chatResponse(res.split(/<ar>/)[0]);
		this.resetSuggestions();
		this.addSuggesstion(res.split(/<ar>/).splice(1))
	};

	chatResponse = (res) => {
		const messages = res.split(/<br>/).splice(1);
		for (let message of messages)
			this.addMessage(message, 'bot')
	};

	imageResponse = (res) => this.addImage(res.split(/<img>/)[1], 'bot');

	startVoiceRecognition = () => {
		this._voiceRecogntion.lang = 'en-US';
		this._voiceRecogntion.onresult = (event) => {
			let text = '';
			for (let i = event.resultIndex; i < event.results.length; ++i)
				text += event.results[i][0].transcript;
			this.postUserResponseToAPI(text);
			this.addMessage(text);
			this.toggleSpeechInput();
		};
		this._voiceRecogntion.start();
	};

	render() {
		const {
			toggleSpeechOutput,
			toggleSpeechInput,
			addMessage,
			addSuggesstion,
			resetSuggestions,
			handleSubmit,
			state,
			props
		} = this;
		const { open, toggleChatBox } = props;
		const { typingIndicator, speechOutput, speechInput, suggestions, log } = state;

		return (
			<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
				<Header
					toggleChatBox={toggleChatBox}
					speechOutput={speechOutput}
					toggleSpeechOutput={toggleSpeechOutput}
				/>
				<Logs messages={log} typingIndicator={typingIndicator} />
				<Suggestions suggestions={suggestions} handleSubmit={handleSubmit} />
				<Form
					speechInput={speechInput}
					toggleSpeechInput={toggleSpeechInput}
					addMessage={addMessage}
					addSuggesstion={addSuggesstion}
					resetSuggestions={resetSuggestions}
					handleSubmit={handleSubmit}
				/>
			</div>
		);
	}
}
