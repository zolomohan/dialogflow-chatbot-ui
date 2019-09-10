import React from 'react';
import classes from '../styles/Chat.module.css';
import Header from './Header';
import Logs from './Logs';
import Form from './Form';

export default function Chat({ open }) {
	return (
		<div className={classes.chatBox} style={{ display: open ? 'block' : 'none' }}>
			<Header />
			<Logs />
			<Form />
		</div>
	);
}
