import React from 'react';
import classes from '../styles/Suggestions.module.css'

export default function Suggestions({ suggestions }) {
	return (
		<div className={classes.suggestionContainer}>
			{suggestions.map((suggesstion) => (
				<div className={classes.suggestions}>
					<p className={classes.chatMessage}>{suggesstion}</p>
				</div>
			))}
		</div>
	);
}
