import React from 'react';
import Icon from '../../ui/icon/Icon';
import bot from '../../../config/bot';
import { chatBoxHeader, chatBotName, icons } from './Header.module.css';

export default function Header({ toggleChatBox, speechOutput, toggleSpeechOutput }) {
	return (
		<div className={chatBoxHeader}>
			<h4 className={chatBotName}>{bot.name}</h4>
			<div className={icons}>
				<Icon
					name={`${speechOutput ? 'volume-up' : 'volume-mute'}`}
					onClick={toggleSpeechOutput}
					marginRight
				/>
				<Icon name="minus" onClick={toggleChatBox} marginRight/>
			</div>
		</div>
	);
}
