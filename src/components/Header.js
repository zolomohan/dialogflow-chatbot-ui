import React from 'react';
import Icon from './Icon';
import '@fortawesome/fontawesome-free/css/all.css'
import classes from '../styles/Header.module.css';

export default function Header({toggleChatBox}) {
	return (
		<div className={classes.chatBoxHeader}>
			<h4 className={classes.chatBotName}>Chat Bot</h4>
			<div className={classes.icons}>
				<Icon type='fas' name='fa-volume-up' />
				<Icon type='fas' name='fa-minus' onClick={toggleChatBox} />
			</div>
		</div>
	);
}
