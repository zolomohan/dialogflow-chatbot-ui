import React from 'react';
import Backdrop from 'components/ui/Backdrop';
import { modal } from 'styles/Modal.module.css';

export default function Modal({ children, show, closeModal }) {
	return (
		<>
			<div className={modal}>{children}</div>
			<Backdrop show={show} closeModal={closeModal} />
		</>
	);
}
