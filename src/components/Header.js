import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'
import classes from '../styles/Header.module.css';

export default function Header({toggleChatBox}) {
	return (
		<div className={classes.chatBoxHeader}>
			<h4 className={classes.chatBotName}>Chat Bot</h4>
			<div className={classes.icons}>
				<i className="fas fa-volume-up" id="speechResponse" />
				<i className="fas fa-minus" onClick={toggleChatBox} />
			</div>
		</div>
	);
}
