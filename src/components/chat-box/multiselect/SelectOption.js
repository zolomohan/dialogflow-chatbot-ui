import React from 'react';
import { suggestion, suggestionMessage } from 'styles/Suggestion.module.css';

export default function SelectOption({ selectedOptions, optionText, toggle }) {
	return (
		<div className={suggestion} onClick={() => toggle(optionText)}>
			<p className={suggestionMessage}>{optionText}</p>
      <input type="checkbox" checked={selectedOptions.includes(optionText)}/>
		</div>
	);
}
