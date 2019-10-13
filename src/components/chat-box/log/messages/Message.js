import React, { memo } from 'react';
import botConfig from 'config/bot';
import Text from 'components/chat-box/log/messages/text/Text';
import Image from 'components/chat-box/log/messages/image/Image';
import Avatar from 'components/chat-box/log/messages/avatar/Avatar';
import Typing from 'components/chat-box/log/messages/typing/Typing';
import { message } from './Message.module.css';

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
