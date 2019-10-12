import { useState } from 'react';
import starterMessage from '../helpers/messages/starter';

export default (initialState = []) => {
	const [ state, setState ] = useState([ starterMessage ] || initialState);
	const addLog = (type, payload, user) =>
		setState((state) => [ ...state, { [type]: payload, user } ]);
	return [ state, addLog ];
};
