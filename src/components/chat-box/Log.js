import React, { useRef, useEffect } from 'react';
import Message from './messages';
import { chatBoxContent, chatLogs } from '../../styles/Log.module.css';

export default function Log({ log, typing }) {
	useEffect(() => logEnd.current.scrollIntoView({ behavior: 'smooth' }));
	const logEnd = useRef();
	return (
		<div className={chatBoxContent}>
			<div className={chatLogs}>
				{log.map(({ text, user, image }, i) => (
					<Message key={i} text={text} user={user} image={image} />
				))}
				{typing && <Message key="typing" user="bot" typing />}
				<div ref={logEnd} />
			</div>
		</div>
	);
}
