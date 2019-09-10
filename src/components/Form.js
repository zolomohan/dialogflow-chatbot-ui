import React from 'react';
import useInputState from '../hooks/useInputState';
import classes from '../styles/Form.module.css';

export default function Form({addMessage}) {
	const [ text, changeText, resetText ] = useInputState();

	function handleChange(event){
		if(event.nativeEvent.inputType === 'insertLineBreak') {
			addMessage(text, 'user');
			resetText();
		}
		else
			changeText(event);
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
