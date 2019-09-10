import React from 'react';
import classes from '../styles/Form.module.css';

export default function Form() {
	return (
		<div className={classes.chatForm}>
			<div className={classes.chatInput}>
				<div className={classes.suggestionDiv} />
				<textarea className={classes.input} placeholder="Type a message" rows="1" data-min-rows="1" />
			</div>
			<div className={classes.chatFormButtons}>
				<i className="fas fa-microphone-slash" id="speechInput" />
			</div>
		</div>
	);
}
