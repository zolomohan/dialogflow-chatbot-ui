import React from 'react';
import classes from '../styles/Chat.module.css';
import Header from './Header';
import Logs from './Logs';
import Form from './Form';

export default function Chat({ open, toggleChatBox }) {
	return (
		<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header toggleChatBox={toggleChatBox} />
			<Logs />
			<Form />
		</div>
	);
}
