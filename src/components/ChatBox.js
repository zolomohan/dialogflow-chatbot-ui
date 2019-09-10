import React, { useState } from 'react';
import classes from '../styles/Chat.module.css';
import Header from './Header';
import Logs from './Logs';
import Form from './Form';

export default function Chat({ open, toggleChatBox }) {
	const [ log, setLog ] = useState([
		{
			text:
				"Hey I am Krypto! Say ' Hi ' to talk with me. I'll let you know the placement details of our college",
			variant: 'bot'
		}
	]);
	return (
		<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header toggleChatBox={toggleChatBox} />
			<Logs messages={log} />
			<Form />
		</div>
	);
}
