import React from 'react';
import Message from './Message';
import classes from '../styles/Logs.module.css';

export default function Logs() {
	return (
		<div className={classes.chatBoxContent}>
			<div className={classes.chatLogs}>
				<Message
					text="Hey I am Krypto! Say ' Hi ' to talk with me. I'll let you know the placement details of our college"
					variant="bot"
				/>
			</div>
		</div>
	);
}
