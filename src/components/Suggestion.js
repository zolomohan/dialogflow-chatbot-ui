import React from 'react';
import { suggestion, suggestionMessage } from '../styles/Suggestion.module.css';

export default function Suggestion({ suggesstion, onClick }) {
	const handleClick = () => onClick(suggesstion);
	return (
		<div className={suggestion} onClick={handleClick}>
			<p className={suggestionMessage}>{suggesstion}</p>
		</div>
	);
}
