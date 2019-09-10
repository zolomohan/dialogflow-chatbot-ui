import React from 'react';
import $ from 'jquery';
import useInputState from '../hooks/useInputState';
import classes from '../styles/Form.module.css';

export default function Form({ addMessage }) {
	const [ text, changeText, resetText ] = useInputState();

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
			.then((data) => console.log(data.result.fulfillment.speech))
			.catch(() =>
				addMessage(
					"it seems like there's something wrong. could you try again later?",
					'bot'
				)
			);
	}

	function handleChange(event) {
		if (event.nativeEvent.inputType === 'insertLineBreak') {
			addMessage(text, 'user');
			postUserResponseToAPI(text);
			resetText();
		} else changeText(event);
	}

	return (
		<div className={classes.chatForm}>
			<div className={classes.chatInput}>
				<div className={classes.suggestionDiv} />
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
