import React from 'react';
import { container, dot } from './TypingIndicator.module.css';

export default function TypingIndicator() {
	return (
		<div className={container}>
			<span className={dot} />
			<span className={dot} />
			<span className={dot} />
		</div>
	);
}
