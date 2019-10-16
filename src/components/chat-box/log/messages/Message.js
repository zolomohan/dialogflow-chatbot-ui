import React, { memo } from 'react';
import botConfig from 'config/bot';
import Text from 'components/chat-box/log/messages/Text';
import Image from 'components/chat-box/log/messages/Image';
import Avatar from 'components/chat-box/log/messages/Avatar';
import Typing from 'components/chat-box/log/messages/Typing';
import { message } from 'styles/Message.module.css';

export default memo(function Message({ text = '', image, user, typing }) {
	return (
		<div className={message}>
			{user === 'bot' && <Avatar name={botConfig.name} img={botConfig.avatar} />}
			{text && <Text message={text} user={user} />}
			{image && <Image src={image} alt="requested" />}
			{typing && <Typing />}
		</div>
	);
});
