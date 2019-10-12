import React, { memo } from 'react';
import botConfig from '../config/bot';
import classes from '../styles/Message.module.css';
import TypingIndicator from './TypingIndicator';
import Avatar from './Avatar';

export default memo(function Message({ text = '', image, user, typingIndicator }) {
	const { message, bot, self, textMessage, imageMessage } = classes;
	return (
		<div className={`${message} ${user === 'bot' ? bot : self}`}>
			{user === 'bot' && <Avatar name={botConfig.name} img={botConfig.avatar} />}
			{typingIndicator && <TypingIndicator />}
			{text && <p className={textMessage}>{text}</p>}
			{image && <img className={imageMessage} src={image} alt="requested" />}
		</div>
	);
});
