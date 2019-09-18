import React, { memo } from 'react';
import classes from '../styles/Message.module.css';

export default memo(function Message({ text = '', image, variant, typingIndicator }) {
	const { chat, bot, self, botImg, chatMessage, imageMessage } = classes;
	return (
		<div className={`${chat} ${variant === 'bot' ? bot : self}`}>
			{variant === 'bot' && (
				<div className={botImg}>
					<img src="https://i.ibb.co/cDCL67q/bot.png" alt="bot" />
				</div>
			)}
			{typingIndicator && (
				<div className={classes.container}>
					<span className={classes.dot} />
					<span className={classes.dot} />
					<span className={classes.dot} />
				</div>
			)}
			{text && <p className={chatMessage}>{text}</p>}
			{image && <img className={imageMessage} src={image} />}
		</div>
	);
});
