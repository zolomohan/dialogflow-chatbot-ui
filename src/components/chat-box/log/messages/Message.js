import React, { memo } from 'react';
import botConfig from '../../../../config/bot';
import TypingIndicator from './typingIndicator/TypingIndicator';
import Avatar from './avatar/Avatar';
import Text from './text/Text';
import Image from './image/Image';
import { message } from './Message.module.css';

export default memo(function Message({ text = '', image, user, typing }) {
	return (
		<div className={message}>
			{user === 'bot' && <Avatar name={botConfig.name} img={botConfig.avatar} />}
			{text && <Text message={text} user={user} />}
			{image && <Image src={image} alt='requested' />}
			{typing && <TypingIndicator />}
		</div>
	);
});
