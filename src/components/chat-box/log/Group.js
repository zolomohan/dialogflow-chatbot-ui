import React, { memo } from 'react';
import Message from './messages/Message';

export default memo(function Group({ texts = [], images = [], user = 'bot' }) {
	return (
		<div>
			{texts.map((text, i) => <Message text={text} user={user} key={i}/>)}
			{images.map((image, i) => <Message image={image} user={user} key={i} />)}
		</div>
	);
});
