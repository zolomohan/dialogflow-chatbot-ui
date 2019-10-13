import React from 'react';
import useToggleState from 'hooks/useToggleState';
import ChatBox from 'components/chat-box/ChatBox';
import ChatButton from 'components/chat-button/ChatButton';

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
