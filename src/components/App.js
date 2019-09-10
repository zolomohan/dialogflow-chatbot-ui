import React, { Fragment, useState } from 'react';
import ChatButton from './ChatButton';
import Chat from './Chat';
import '../styles/App.css';

function App() {
	const [ chatBoxOpen, setchatBoxOpen ] = useState(false);
	return (
    <Fragment>
      <ChatButton onClick={setchatBoxOpen} open={chatBoxOpen}/>
      <Chat open={chatBoxOpen} />
    </Fragment>
  );
}

export default App;
