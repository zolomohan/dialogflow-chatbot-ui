import React, { memo } from 'react';
import Message from 'components/chat-box/log/Message';
import style from 'styles/Group.module.css';

 const MessageGroup = ({ texts = [], images = [], carousel = [], slider, handleSubmit, user }) => {
	return (
		<div className={style.group}>
			{texts.map((text, i) => (
				<Message
					key={i}
					user={user}
					text={text}
					hasAvatar={user === 'bot' && i === 0}
				/>
			))}
			{images.map((image, i) => (
				<Message
					key={i}
					user={user}
					image={image}
					hasAvatar={user === 'bot' && i === 0}
				/>
			))}
			{carousel.map((carousel, i) => (
				<Message
					key={i}
					user={user}
					carousel={carousel.structValue}
					hasAvatar={user === 'bot' && i === 0}
				/>
			))}
			{slider && 
				<Message 
					user={user} 
					slider={slider} 
					hasAvatar={user === 'bot'}
					handleSubmit={handleSubmit}
				/>}
		</div>
	);
};

export default memo(MessageGroup);
