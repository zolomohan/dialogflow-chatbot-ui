import React from 'react';
import Backdrop from 'components/ui/backdrop/Backdrop';
import { modal } from './Modal.module.css';

export default function Modal({ children, show, closeModal }) {
	return (
		<>
			<div className={modal}>{children}</div>
			<Backdrop show={show} closeModal={closeModal} />
		</>
	);
}
