import React, { useRef, useEffect } from 'react';
import Message from './Message';
import classes from '../styles/Logs.module.css';

export default function Logs({ messages, typingIndicator }) {
	const logEnd = useRef();
	useEffect(() => logEnd.current.scrollIntoView({ behavior: 'smooth' }));
	return (
		<div className={classes.chatBoxContent}>
			<div className={classes.chatLogs}>
				{messages.map(({ text, variant }, i) => (
					<Message key={i} text={text} variant={variant} />
				))}
				{typingIndicator && (
					<Message key="typing" variant="bot" typingIndicator />
				)}
				<div ref={logEnd} />
			</div>
		</div>
	);
}
