import React from 'react';
import { suggestion, suggestionMessage } from '../styles/Suggestion.module.css';

export default function Suggestion({ suggestionText, onClick }) {
	const handleClick = () => onClick(suggestionText);
	return (
		<div className={suggestion} onClick={handleClick}>
			<p className={suggestionMessage}>{suggestionText}</p>
		</div>
	);
}
