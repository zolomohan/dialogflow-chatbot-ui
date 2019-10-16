import React from 'react';
import { avatar } from 'styles/Avatar.module.css';

export default function Avatar({ name, img }) {
	return (
		<div className={avatar}>
			<img src={img} alt={`${name} avatar`} />
		</div>
	);
}
