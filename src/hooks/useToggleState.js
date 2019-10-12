import { useState } from 'react';

export default (initialState = false) => {
	const [ state, setState ] = useState(initialState);
	const toggleState = () => setState((state) => !state);
	return [ state, toggleState ];
};
