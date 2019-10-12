import React, { memo } from 'react';
import Suggestion from './Suggestion';
import { suggestionContainer } from '../styles/Suggestions.module.css';

export default memo(function Suggestions({ suggestions, handleSubmit }) {
	return (
		<div className={suggestionContainer}>
			{suggestions.map((suggesstion, i) => (
				<Suggestion suggesstion={suggesstion} key={i} onClick={handleSubmit} />
			))}
		</div>
	);
});
