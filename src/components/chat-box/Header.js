import React from 'react';
import Icon from 'components/ui/Icon';
import bot from 'config/bot';
import { header, botName } from 'styles/Header.module.css';

export default function Header({ toggleChatBox, speechOutput, toggleSpeechOutput }) {
	return (
		<div className={header}>
			<h4 className={botName}>{bot.name}</h4>
			<span>
				<Icon
					name={`${speechOutput ? 'volume-up' : 'volume-mute'}`}
					onClick={toggleSpeechOutput}
					marginRight
				/>
				<Icon name="minus" onClick={toggleChatBox} marginRight />
			</span>
		</div>
	);
}
