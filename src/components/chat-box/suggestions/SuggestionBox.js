import React, { memo } from 'react';
import Suggestion from 'components/chat-box/suggestions/Suggestion';
import { suggestionBox } from 'styles/SuggestionBox.module.css';

export default memo(function SuggestionBox({ suggestions, handleSubmit }) {
	return (
		<div
			className={suggestionBox}
			style={{ display: suggestions.length === 0 ? 'none' : 'flex' }}
		>
			{suggestions.map((suggestion, i) => (
				<Suggestion suggestionText={suggestion} key={i} onClick={handleSubmit} />
			))}
		</div>
	);
});
