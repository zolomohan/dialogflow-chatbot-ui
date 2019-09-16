import React, { Component } from 'react';
import $ from 'jquery';
import Speech from 'speak-tts';
import Header from './Header';
import Logs from './Logs';
import Suggestions from './Suggestions';
import Form from './Form';
import classes from '../styles/Chat.module.css';

const DEFAULT_TIME_DELAY = 300;

export default class ChatBox extends Component {
	constructor(props) {
		super(props);
		this._speech = new Speech();
		this._speech
			.init({
				volume: 0.5,
				lang: 'en-GB',
				rate: 1,
				pitch: 1,
				voice: 'Google UK English Female',
				listeners: {
					onvoiceschanged: (voices) => {
						console.log('Voices changed', voices);
					}
				}
			})
			.then((data) => console.log('Speech is ready', data))
			.catch((error) =>
				console.error('An error occured while initializing Speech : ', error)
			);

		this.state = {
			log: [
				{
					text:
						"Hey I am Krypto! Say ' Hi ' to talk with me. I'll let you know the placement details of our college",
					variant: 'bot'
				}
			],
			suggestions: [],
			speechOutput: true
		};
	}

	toggleSpeechOutput = () =>
		this.setState(
			({ speechOutput }) => ({ speechOutput: !speechOutput }),
			this._speech.cancel
		);

	addMessage = (text, variant) => {
		if (this.state.speechOutput && variant === 'bot') this._speech.speak({ text });
		this.setState(({ log }) => ({
			log: [ ...log, { text, variant } ]
		}));
	};

	addSuggesstion = (suggestions) => this.setState({ suggestions });

	resetSuggestions = () => this.setState({ suggesstion: [] });

	handleSubmit = (userResponse) => {
		this.addMessage(userResponse, 'user');
		this.postUserResponseToAPI(userResponse);
	};

	postUserResponseToAPI = (text) => {
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

	parseResponse = (responseString) => {
		responseString = responseString.replace(/[""]/g, '');
		if (responseString.includes('<ar')) this.suggestionResponse(responseString);
		else if (responseString.includes('<br'))
			setTimeout(() => this.chatResponse(responseString), DEFAULT_TIME_DELAY);
		else this.addMessage(responseString, 'bot');
	};

	suggestionResponse = (message) => {
		this.chatResponse(message);
		let suggestionList = message.split(/<ar>/).splice(1);
		this.resetSuggestions();
		setTimeout(() => this.addSuggesstion(suggestionList), DEFAULT_TIME_DELAY);
	};

	chatResponse = (message) => {
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
		const addMessage = this.addMessage;
		(function theLoop(listOfMessages, i, numMessages) {
			setTimeout(() => {
				addMessage(listOfMessages[i].text, 'bot');
				if (i++ < numMessages - 1) {
					// showTypingIndicator();
					theLoop(listOfMessages, i, numMessages);
				}
			}, listOfMessages[i].delay);
		})(listOfMessages, i, numMessages);
	};

	render() {
		const { open, toggleChatBox } = this.props;
		return (
			<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
				<Header
					toggleChatBox={toggleChatBox}
					speechOutput={this.state.speechOutput}
					toggleSpeechOutput={this.toggleSpeechOutput}
				/>
				<Logs messages={this.state.log} />
				<Suggestions
					suggestions={this.state.suggestions}
					handleSubmit={this.handleSubmit}
				/>
				<Form
					addMessage={this.addMessage}
					addSuggesstion={this.addSuggesstion}
					resetSuggestions={this.resetSuggestions}
					handleSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}
