import React from 'react';
import Icon from 'components/ui/icon/Icon';
import { backdrop, close } from './Backdrop.module.css';

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
