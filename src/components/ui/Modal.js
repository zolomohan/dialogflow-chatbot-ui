import React from 'react';
import Backdrop from './Backdrop';
import classes from '../../styles/Modal.module.css';

export default function Modal({ children, show, closeModal }) {
	return (
		<>
			<Backdrop show={show} closeModal={closeModal} />
			<div className={classes.Modal}>{children}</div>
		</>
	);
}
