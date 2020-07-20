import React, { memo } from 'react';
import Message from 'components/chat-box/log/Message';
import style from 'styles/Group.module.css';

const MessageGroup = (props) => {
  const {
    user,
    slider,
    texts = [],
    images = [],
    carousel = [],
    multiSelect = [],
    handleSubmit,
  } = props;
  const isBot = user === 'bot';

  return (
    <div className={style.group}>
      {texts.map((text, i) => (
        <Message key={i} user={user} text={text} hasAvatar={isBot && i === 0} />
      ))}
      {images.map((image, i) => (
        <Message key={i} user={user} image={image} hasAvatar={isBot && i === 0} />
      ))}
      {carousel.map((carousel, i) => (
        <Message key={i} user={user} carousel={carousel.structValue} hasAvatar={isBot && i === 0} />
      ))}
      {multiSelect.length > 0 && (
        <Message
          user={user}
          multiSelect={multiSelect}
          handleSubmit={handleSubmit}
          hasAvatar={isBot}
        />
      )}
      {slider && (
        <Message user={user} slider={slider} hasAvatar={isBot} handleSubmit={handleSubmit} />
      )}
    </div>
  );
};

export default memo(MessageGroup);
