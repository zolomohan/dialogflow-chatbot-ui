import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import { icon, hoverIcon, iconMargin } from 'styles/Icon.module.css';

export default function Icon({ type = 'fas', name, onClick, marginRight, disableHover }) {
	return (
		<i
			className={`${type} fa-${name} ${icon} ${!disableHover && hoverIcon} 
				${marginRight && iconMargin}`}
			onClick={onClick}
		/>
	);
}
