import React from 'react';
import Icon from './Icon';
import useInputState from '../hooks/useInputState';
import classes from '../styles/Form.module.css';

export default function Form({ handleSubmit, speechInput, toggleSpeechInput }) {
	const [ text, changeText, resetText ] = useInputState();

	function handleChange(event) {
		event.nativeEvent.inputType === 'insertLineBreak'
			? onSubmit()
			: changeText(event);
	}

	function onSubmit(userResponse = text) {
		handleSubmit(userResponse);
		resetText();
	}

	return (
		<div className={classes.chatForm}>
			<div className={classes.chatInput}>
				<textarea
					autoFocus
					rows='1'
					value={text}
					data-min-rows='1'
					disabled={speechInput}
					onChange={handleChange}
					className={classes.input}
					placeholder={speechInput ?'Say Something ...' : 'Type a message'}
				/>
			</div>
			<div className={classes.chatFormButtons}>
				<Icon name={`${speechInput ?'microphone' : 'microphone-slash'}`} onClick={toggleSpeechInput} />
			</div>
		</div>
	);
}
