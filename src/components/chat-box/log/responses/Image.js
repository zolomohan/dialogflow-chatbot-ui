import React from 'react';
import useToggleState from 'hooks/useToggleState';
import Modal from 'components/ui/Modal';
import style from 'styles/Image.module.css';

const Image = ({ src, alt }) => {
	const [ modal, toggleModal ] = useToggleState();
	return (
		<>
			{modal && (
				<Modal show={modal} closeModal={toggleModal}>
					<img className={style.imageModal} src={src} alt={alt} />
				</Modal>
			)}
			<img className={style.image} src={src} alt={alt} onClick={toggleModal} />
		</>
	);
}

export default Image;
