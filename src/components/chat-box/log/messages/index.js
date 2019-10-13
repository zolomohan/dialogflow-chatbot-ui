import React, { memo } from 'react';
import botConfig from '../../../../config/bot';
import TypingIndicator from './TypingIndicator';
import Avatar from './Avatar';
import Text from './Text';
import Image from './Image';
import { message } from '../../../../styles/Message.module.css';

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
