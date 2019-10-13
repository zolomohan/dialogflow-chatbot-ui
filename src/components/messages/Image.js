import React from 'react';
import { image } from '../../styles/Image.module.css';

export default function Image({ src, alt }) {
	return <img className={image} src={src} alt={alt} />;
}
