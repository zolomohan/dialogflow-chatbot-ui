import React from 'react';
import Icon from './Icon';
import '@fortawesome/fontawesome-free/css/all.css';
import classes from '../styles/ChatButton.module.css';

export default function ChatButton({ toggleChatBox }) {
	return (
		<div className={classes.chatButton} onClick={toggleChatBox}>
			<Icon type='fas' name='fa-comments' />
		</div>
	);
}
