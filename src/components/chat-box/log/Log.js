import React, { useRef, useEffect } from 'react';
import Message from 'components/chat-box/log/messages/Message';
import { logs } from 'styles/Log.module.css';
import Group from 'components/chat-box/log/messages/Group';

export default function Log({ log, typing, noSuggestions }) {
	useEffect(() => end.current.scrollIntoView({ behavior: 'smooth' }));
	const end = useRef();
	return (
		<div
			className={logs}
			style={{ height: noSuggestions ? 'calc(70vh + 50px)' : '70vh' }}
		>
			{log.map(({ texts, images, user }, i) => (
				<Group texts={texts} images={images} user={user} key={i} />
			))}
			{typing && <Message key="typing" user="bot" typing hasAvatar />}
			<div ref={end} />
		</div>
	);
}
