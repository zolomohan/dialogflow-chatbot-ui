import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import classes from '../styles/ChatButton.module.css';

export default function ChatButton() {
	return (
		<div className={classes.chatButton}>
			<i className="fas fa-comments" />
		</div>
	);
}
