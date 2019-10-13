import React from 'react';
import useToggleState from 'hooks/useToggleState';
import Modal from 'components/ui/modal/Modal';
import { image, imageModal } from './Image.module.css';

export default function Image({ src, alt }) {
	const [ modal, toggleModal ] = useToggleState();

	return (
		<>
			{modal && (
				<Modal show={modal} closeModal={toggleModal}>
					<img className={imageModal} src={src} alt={alt} />
				</Modal>
			)}
			<img className={image} src={src} alt={alt} onClick={toggleModal} />
		</>
	);
}
