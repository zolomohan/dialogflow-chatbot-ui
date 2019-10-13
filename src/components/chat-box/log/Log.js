import React, { useRef, useEffect } from 'react';
import Message from 'components/chat-box/log/messages/Message';
import { logs } from './Log.module.css';

export default function Log({ log, typing }) {
	useEffect(() => end.current.scrollIntoView({ behavior: 'smooth' }));
	const end = useRef();
	return (
		<div className={logs}>
			{log.map(({ text, user, image }, i) => (
				<Message key={i} text={text} user={user} image={image} />
			))}
			{typing && <Message key="typing" user="bot" typing />}
			<div ref={end} />
		</div>
	);
}
