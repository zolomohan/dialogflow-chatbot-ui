import React from 'react';
import classes from '../styles/Suggesstions.module.css'

export default function Suggestions({ suggesstions }) {
	return (
		<div className={classes.suggestionContainer}>
			{suggesstions.map((suggesstion) => (
				<div className={classes.suggestions}>
					<p className={classes.chatMessage}>{suggesstion}</p>
				</div>
			))}
		</div>
	);
}
