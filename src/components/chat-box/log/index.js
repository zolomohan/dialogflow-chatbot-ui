import React, { useRef, useEffect } from 'react';
import Message from 'components/chat-box/log/Message';
import { logs } from 'styles/Log.module.css';
import Group from 'components/chat-box/log/Group';

const Log = ({ log, typing, noSuggestions }) => {
	useEffect(() => end.current.scrollIntoView({ behavior: 'smooth' }));
	const end = useRef();
	return (
		<div
			className={logs}
			style={{ height: !noSuggestions ? 'calc(70vh + 50px)' : '70vh' }}
		>
			{log.map(({ texts, images, carousel, user }, i) => (
				<Group texts={texts} images={images} carousel={carousel} user={user} key={i} />
			))}
			{typing && <Message key="typing" user="bot" typing hasAvatar />}
			<div ref={end} />
		</div>
	);
}

export default Log;
