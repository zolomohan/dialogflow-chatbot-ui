import React, { useRef, useEffect } from 'react';
import Message from 'components/chat-box/log/Message';
import { logs } from 'styles/Log.module.css';
import Group from 'components/chat-box/log/Group';

const Log = ({ log, typing, noSuggestions, handleSubmit }) => {
  useEffect(() => end.current.scrollIntoView({ behavior: 'smooth' }));
  const end = useRef();
  return (
    <div className={logs} style={{ height: noSuggestions ? 'calc(70vh + 50px)' : '70vh' }}>
      {log.map(({ texts, images, carousel, slider, user }, i) => (
        <Group
          key={i}
          user={user}
          texts={texts}
          images={images}
          slider={slider}
          carousel={carousel}
          handleSubmit={handleSubmit}
        />
      ))}
      {typing && <Message key='typing' user='bot' typing hasAvatar />}
      <div ref={end} />
    </div>
  );
};

export default Log;
