import React, { memo } from 'react';
import Suggestion from 'components/chat-box/suggestions/suggestion/Suggestion';
import { suggestionContainer } from './Suggestions.module.css';

export default memo(function Suggestions({ suggestions, handleSubmit }) {
	return (
		<div
			className={suggestionContainer}
			style={{ display: suggestions.length === 0 ? 'none' : 'flex' }}
		>
			{suggestions.map((suggestion, i) => (
				<Suggestion suggestionText={suggestion} key={i} onClick={handleSubmit} />
			))}
		</div>
	);
});
