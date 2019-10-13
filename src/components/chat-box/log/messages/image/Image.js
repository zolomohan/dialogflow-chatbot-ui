import React, { Fragment } from 'react';
import { image, imageModal } from './Image.module.css';
import useToggleState from '../../../../../hooks/useToggleState';
import Modal from '../../../../ui/modal/Modal';

export default function Image({ src, alt }) {
	const [ modal, toggleModal ] = useToggleState();

	return (
		<Fragment>
			{modal && (
				<Modal show={modal} closeModal={toggleModal}>
					<img className={imageModal} src={src} alt={alt} />
				</Modal>
			)}
			<img className={image} src={src} alt={alt} onClick={toggleModal} />
		</Fragment>
	);
}
