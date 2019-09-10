import { useState } from 'react';
export default (initialState = '') => {
	const [ state, setState ] = useState(initialState);
	const change = (event) => setState(event.target.value);
	const reset = () => setState('');
	return [ state, change, reset ];
};