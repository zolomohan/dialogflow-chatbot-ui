import React from 'react';
import Icon from 'components/ui/Icon';
import { chatButton } from 'styles/ChatButton.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default function ChatButton({ toggleChatBox }) {
	return (
		<div className={chatButton} onClick={toggleChatBox}>
			<Icon name="comments" disableHover />
		</div>
	);
}
