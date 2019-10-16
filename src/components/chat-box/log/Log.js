import React, { useRef, useEffect } from 'react';
import Message from 'components/chat-box/log/messages/Message';
import { logs } from 'styles/Log.module.css';

export default function Log({ log, typing, noSuggestions }) {
	useEffect(() => end.current.scrollIntoView({ behavior: 'smooth' }));
	const end = useRef();
	return (
		<div
			className={logs}
			style={{ height: noSuggestions ? 'calc(70vh + 50px)' : '70vh' }}
		>
			{log.map(({ text, user, image }, i) => (
				<Message key={i} text={text} user={user} image={image} />
			))}
			{typing && <Message key="typing" user="bot" typing />}
			<div ref={end} />
		</div>
	);
}
