import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import classes from '../styles/ChatButton.module.css';

export default function ChatButton({onClick, open}) {
	return (
		<div className={classes.chatButton} onClick={() => onClick(!open)}>
			<i className="fas fa-comments" />
		</div>
	);
}
