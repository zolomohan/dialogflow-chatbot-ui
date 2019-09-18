import React from 'react';
import Message from './Message';
import classes from '../styles/Logs.module.css';

export default function Logs({ messages, typingIndicator }) {
	return (
		<div className={classes.chatBoxContent}>
			<div className={classes.chatLogs}>
				{messages.map((message, i) => (
					<Message key={i} text={message.text} variant={message.variant} />
				))}
				{typingIndicator && (
					<Message key="typing" variant="bot" typingIndicator />
				)}
			</div>
		</div>
	);
}
