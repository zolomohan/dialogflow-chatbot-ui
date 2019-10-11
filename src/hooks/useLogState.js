import { useState } from 'react';
import starterMessage from '../helpers/starterMessage'

export default (initialState = []) => {
	const [ state, setState ] = useState([ starterMessage ] || initialState);

	const addLog = (type, payload, user) => {
		let newLog = state;
		newLog.push({ [type]: payload, user });
		setState(newLog);
	};

	return [ state, addLog ];
};
