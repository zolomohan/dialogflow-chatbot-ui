import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
export default ({ type, name, onClick }) => (
	<i className={`${type} ${name}`} onClick={onClick} />
);
