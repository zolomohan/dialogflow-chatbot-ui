import React from 'react';
import classes from '../../styles/Backdrop.module.css';

export default function Backdrop({ show, closeModal }) {
	return show ? <div className={classes.Backdrop} onClick={closeModal} /> : null;
}
