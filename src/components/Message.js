import React from 'react';
import classes from '../styles/Message.module.css';

export default function Message({ text, variant }) {
	const { chat, bot, self, botImg, chatMessage } = classes;
	return (
		<div className={`${chat} ${variant === 'bot' ? bot : self}`}>
			{variant === 'bot' && (
				<div className={botImg}>
					<img src='https://i.ibb.co/cDCL67q/bot.png' alt='bot' />
				</div>
			)}
			<p className={chatMessage}>{text}</p>
		</div>
	);
}
