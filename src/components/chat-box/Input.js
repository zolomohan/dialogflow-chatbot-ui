import React from 'react';
import useInputState from 'hooks/useInputState';
import Icon from 'components/ui/Icon';
import { form, input, formButtons } from 'styles/Form.module.css';

const Input = ({ handleSubmit, speechInput, toggleSpeechInput }) => {
	const [ text, changeText, resetText ] = useInputState();

	const handleChange = (event) =>
		event.nativeEvent.inputType === 'insertLineBreak'
			? onSubmit()
			: changeText(event);

	const onSubmit = () => {
		if (text.trim() !== '') handleSubmit(text);
		resetText();
	}

	return (
		<div className={form}>
			<div className={input}>
				<textarea
					autoFocus
					rows="1"
					value={text}
					disabled={speechInput}
					onChange={handleChange}
					placeholder={speechInput ? 'Say Something ...' : 'Type a message'}
				/>
			</div>
			<div className={formButtons}>
				<Icon name="arrow-right" onClick={onSubmit} marginRight />
				<Icon
					name={`${speechInput ? 'microphone' : 'microphone-slash'}`}
					onClick={toggleSpeechInput}
				/>
			</div>
		</div>
	);
}

export default Input;
