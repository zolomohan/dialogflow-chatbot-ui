import React from 'react';
import bot from 'config/bot';
import style from 'styles/Avatar.module.css';

export default function Avatar() {
	return (
		<div className={style.avatar}>
			<img src={bot.avatar} alt={`${bot.name} avatar`} />
		</div>
	);
}
