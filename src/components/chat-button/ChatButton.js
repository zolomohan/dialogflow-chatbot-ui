import React from 'react';
import Icon from 'components/ui/icon/Icon';
import { chatButton } from './ChatButton.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

export default function ChatButton({ toggleChatBox }) {
	return (
		<div className={chatButton} onClick={toggleChatBox}>
			<Icon name="comments" />
		</div>
	);
}
