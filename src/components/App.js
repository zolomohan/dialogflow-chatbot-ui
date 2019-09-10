import React, { Fragment } from 'react';
import useToggleState from '../hooks/useToggleState';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';
import '../styles/App.css';

function App() {
	const [ chatBox, toggleChatBox ] = useToggleState();
	return (
    <Fragment>
      <ChatButton toggleChatBox={toggleChatBox} open={chatBox}/>
      <ChatBox toggleChatBox={toggleChatBox} open={chatBox} />
    </Fragment>
  );
}

export default App;
