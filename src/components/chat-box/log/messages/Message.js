import React, { memo } from 'react';
import bot from 'config/bot';
import Text from 'components/chat-box/log/messages/Text';
import Image from 'components/chat-box/log/messages/Image';
import Avatar from 'components/chat-box/log/messages/Avatar';
import Typing from 'components/chat-box/log/messages/Typing';
import Carousel from 'components/chat-box/log/messages/Carousel';
import { message } from 'styles/Message.module.css';

export default memo(function Message({ text, image, carousel, user, typing, hasAvatar }) {
	return (
		<div
			className={message}
			style={{
				marginLeft: hasAvatar ? 'none' : '60px',
			}}
		>
			{hasAvatar && <Avatar name={bot.name} img={bot.avatar} />}
			{text && <Text message={text} user={user} />}
			{carousel && <Carousel carousel={carousel.fields} user={user} />}
			{image && <Image src={image} alt="requested" noAvatar={!hasAvatar} />}
			{typing && <Typing />}
		</div>
	);
});
