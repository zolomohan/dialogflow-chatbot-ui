import React from 'react';
import classes from '../styles/Logs.module.css';

export default function Logs() {
	return (
		<div className={classes.chatBoxContent}>
			<div className={classes.chatLogs} />
		</div>
	);
}
