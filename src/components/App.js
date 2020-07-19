import React from 'react';
import useToggleState from 'hooks/useToggleState';
import ChatBox from 'components/chat-box';
import ChatButton from 'components/ChatButton';

function App() {
	const [ chatBox, toggleChatBox ] = useToggleState(true);
	return (
		<>
			<ChatBox toggleChatBox={toggleChatBox} open={chatBox} />
			<ChatButton toggleChatBox={toggleChatBox} />
		</>
	);
}

export default App;
