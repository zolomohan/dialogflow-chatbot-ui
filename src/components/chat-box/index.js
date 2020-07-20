import React, { useState, useEffect } from 'react';
import useToggleState from 'hooks/useToggleState';
import Speech from 'speak-tts';
import Header from 'components/chat-box/Header';
import Log from 'components/chat-box/log';
import Suggestions from 'components/chat-box/suggestions';
import Input from 'components/chat-box/Input';
import fetchBotResponse from 'helpers/fetchBotResponse';
import useLogState from 'hooks/useLogState';
import speechConfig from 'config/speechOutput';
import style from 'styles/ChatBox.module.css';

const ChatBox = ({ open, toggleChatBox }) => {
  let speech, speechRecognition;
  if (window.webkitSpeechRecognition) {
    speech = new Speech();
    speechRecognition = new window.webkitSpeechRecognition();

    speech
      .init(speechConfig)
      .catch((error) => console.error('An error occured while initializing Speech : ', error));
    speechRecognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i)
        transcript += event.results[i][0].transcript;
      onUserResponse(transcript);
      toggleSpeechInput();
    };
  }

  const [log, addLog] = useLogState();
  const [suggestions, setSuggestions] = useState([]);
  const [multiSelect, setMultiSelect] = useState([]);
  const [speechInput, toggleSpeechInput] = useToggleState();
  const [typing, setTyping] = useState(false);
  const [speechOutput, toggleSpeechOutput] = useToggleState(
    window.webkitSpeechRecognition ? true : false
  );

  useEffect(() => {
    if (window.webkitSpeechRecognition) speech.cancel();
  }, [speechOutput]);

  useEffect(() => {
    if (speechInput) {
      if (window.webkitSpeechRecognition) speechRecognition.start();
    } else {
      if (window.webkitSpeechRecognition) speechRecognition.stop();
    }
  }, [speechInput, speechRecognition]);

  const onUserResponse = (response) => {
    fetchBotResponse(response).then(onBotResponse);
    addLog({ texts: [response] }, 'user');
    setTyping(true);
  };

  const onBotResponse = (response) => {
    setSuggestions(response.suggestions);
    setMultiSelect(response.multiSelect);
    addLog(response, 'bot');
    if (speechOutput) response.texts.map((text) => speech.speak({ text }));
    setTyping(false);
  };

  return (
    <div className={style.chatBox} style={{ display: open ? 'block' : 'none' }}>
      <Header
        toggleChatBox={toggleChatBox}
        speechOutput={speechOutput}
        toggleSpeechOutput={toggleSpeechOutput}
      />
      <Log
        log={log}
        typing={typing}
        handleSubmit={onUserResponse}
        noSuggestions={(suggestions.length || multiSelect.length) === 0}
      />
      <Suggestions
        multiple={multiSelect.length > 0}
        suggestions={suggestions}
        options={multiSelect}
        handleSubmit={onUserResponse}
      />
      <Input
        speechInput={speechInput}
        toggleSpeechInput={toggleSpeechInput}
        handleSubmit={onUserResponse}
      />
    </div>
  );
};

export default ChatBox;
