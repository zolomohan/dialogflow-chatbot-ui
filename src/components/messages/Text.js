import React from 'react';
import { text, bot, self } from '../../styles/Text.module.css';

export default function Text({ message, user }) {
	return <p className={`${text} ${user === 'bot' ? bot : self}`}>{message}</p>;
}
