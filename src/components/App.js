import React from 'react';
import useToggleState from '../hooks/useToggleState';
import ChatButton from './chat-button/ChatButton';
import ChatBox from './chat-box/ChatBox';

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
