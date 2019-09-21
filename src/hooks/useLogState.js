import { useState } from 'react';

export default (initialState = []) => {
	const [ state, setState ] = useState(
		[
			{
				text: "Hey There, I am Krypto! Say 'Hey' to talk with me.",
				user: 'bot'
			}
		] || initialState
	);

	const addLog = (type, payload, user) => {
		let newLog = state;
		newLog.push({ [type]: payload, user });
		setState(newLog);
	};

	return [ state, addLog ];
};
