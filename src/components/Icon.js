import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
export default function Icon({ type = 'fas', name, onClick }) {
	return <i className={`${type} fa-${name}`} onClick={onClick} />;
}
