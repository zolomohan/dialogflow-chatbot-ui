import React from 'react';
import Icon from './Icon';
import useInputState from '../hooks/useInputState';
import classes from '../styles/Form.module.css';

export default function Form({ handleSubmit }) {
	const [ text, changeText, resetText ] = useInputState();

	function handleChange(event) {
		if (event.nativeEvent.inputType === 'insertLineBreak') onSubmit();
		else changeText(event);
	}

	function onSubmit(userResponse = text) {
		handleSubmit(userResponse);
		resetText();
	}

	return (
		<div className={classes.chatForm}>
			<div className={classes.chatInput}>
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
				<Icon type='fas' name='fa-microphone-slash' />
			</div>
		</div>
	);
}
