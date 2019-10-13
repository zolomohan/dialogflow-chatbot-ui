import React from 'react';
import Icon from './Icon';
import { backdrop, close } from '../../styles/Backdrop.module.css';

export default function Backdrop({ show, closeModal }) {
	return (
		show && (
			<div className={backdrop} onClick={closeModal}>
				<div className={close}>
					<Icon name="times" />
				</div>
			</div>
		)
	);
}
