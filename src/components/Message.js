import React, { memo } from 'react';
import botConfig from '../config/bot';
import classes from '../styles/Message.module.css';
import TypingIndicator from './TypingIndicator';

export default memo(function Message({ text = '', image, user, typingIndicator }) {
	const { chat, bot, self, botImg, chatMessage, imageMessage } = classes;
	return (
		<div className={`${chat} ${user === 'bot' ? bot : self}`}>
			{user === 'bot' && (
				<div className={botImg}>
					<img src={botConfig.avatar} alt="bot avatar" />
				</div>
			)}
			{typingIndicator && <TypingIndicator />}
			{text && <p className={chatMessage}>{text}</p>}
			{image && <img className={imageMessage} src={image} alt="requested" />}
		</div>
	);
});
