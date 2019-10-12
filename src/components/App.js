import React from 'react';
import useToggleState from '../hooks/useToggleState';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';

function App() {
	const [ chatBox, toggleChatBox ] = useToggleState(true);
	return (
		<>
			<ChatButton toggleChatBox={toggleChatBox} />
			<ChatBox toggleChatBox={toggleChatBox} open={chatBox} />
		</>
	);
}

export default App;
