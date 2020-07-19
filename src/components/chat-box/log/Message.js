import React, { memo } from 'react';
import Text from 'components/chat-box/log/responses/Text';
import Image from 'components/chat-box/log/responses/Image';
import Avatar from 'components/chat-box/log/Avatar';
import Typing from 'components/chat-box/log/responses/Typing';
import Carousel from 'components/chat-box/log/responses/Carousel';
import style from 'styles/Message.module.css';

const Message = ({ text, image, carousel, user, typing, hasAvatar }) => {
  const marginLeft = hasAvatar ? 'none' : '60px';
  return (
    <div className={style.message} style={{ marginLeft }}>
      {hasAvatar && <Avatar />}
      {text && <Text message={text} user={user} />}
      {carousel && <Carousel carousel={carousel.fields} user={user} />}
      {image && <Image src={image} noAvatar={!hasAvatar} />}
      {typing && <Typing />}
    </div>
  );
};

export default memo(Message);
