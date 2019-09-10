import React from 'react';
import Message from './Message';
import classes from '../styles/Logs.module.css';

export default function Logs({ messages }) {
	return (
		<div className={classes.chatBoxContent}>
			<div className={classes.chatLogs}>
				{messages.map((message) => (
					<Message text={message.text} variant={message.variant} />
				))}
			</div>
		</div>
	);
}
