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
					value={text}
					placeholder={speechInput ?'Say Something ...' : 'Type a message'}
					disabled={speechInput}
					onChange={handleChange}
					rows='1'
					data-min-rows='1'
					className={classes.input}
				/>
			</div>
			<div className={classes.chatFormButtons}>
				<Icon type='fas' name={`fa-${speechInput ?'microphone' : 'microphone-slash'}`} onClick={toggleSpeechInput} />
			</div>
		</div>
	);
}
