import React from 'react';
import Icon from './Icon';
import '@fortawesome/fontawesome-free/css/all.css';
import classes from '../styles/Header.module.css';

export default function Header({ toggleChatBox, speechOutput, toggleSpeechOutput }) {
	return (
		<div className={classes.chatBoxHeader}>
			<h4 className={classes.chatBotName}>Chat Bot</h4>
			<div className={classes.icons}>
				<Icon
					name={`fa-${speechOutput ? 'volume-up' : 'volume-mute'}`}
					onClick={toggleSpeechOutput}
				/>
				<Icon name='fa-minus' onClick={toggleChatBox} />
			</div>
		</div>
	);
}
