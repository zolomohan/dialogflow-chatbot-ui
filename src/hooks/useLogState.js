import { useState } from 'react';
import starterMessage from '../helpers/messages/starter';

export default (initialState = []) => {
	const [ state, setState ] = useState(starterMessage || initialState);
	const addLog = (response, user) =>
		setState((state) => [
			...state,
			{ texts: response.texts, images: response.images, user}
		]);
	return [ state, addLog ];
};
