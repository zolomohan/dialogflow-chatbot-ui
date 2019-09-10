import React, { Fragment, useState } from 'react';
import ChatButton from './ChatButton';
import ChatBox from './ChatBox';
import '../styles/App.css';

function App() {
	const [ chatBoxOpen, setchatBoxOpen ] = useState(false);
	return (
    <Fragment>
      <ChatButton onClick={setchatBoxOpen} open={chatBoxOpen}/>
      <ChatBox open={chatBoxOpen} />
    </Fragment>
  );
}

export default App;
