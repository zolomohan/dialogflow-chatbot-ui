import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { icon, iconMargin } from './Icon.module.css';

export default function Icon({ type = 'fas', name, onClick, marginRight }) {
	return (
		<i
			className={`${type} fa-${name} ${icon} ${marginRight && iconMargin}`}
			onClick={onClick}
		/>
	);
}
