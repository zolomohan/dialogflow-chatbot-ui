import React from 'react';
import Icon from 'components/ui/Icon';
import bot from 'config/bot';
import style from 'styles/Header.module.css';

const Header = ({ toggleChatBox, speechOutput, toggleSpeechOutput }) => {
	return (
		<div className={style.header}>
			<h4 className={style.botName}>{bot.name}</h4>
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

export default Header;