import React, { memo } from 'react';
import Text from 'components/chat-box/log/responses/Text';
import Image from 'components/chat-box/log/responses/Image';
import Avatar from 'components/chat-box/log/Avatar';
import Typing from 'components/chat-box/log/responses/Typing';
import Carousel from 'components/chat-box/log/responses/Carousel';
import Slider from 'components/chat-box/log/responses/Slider';
import MultiSelect from 'components/chat-box/log/responses/MultiSelect';
import style from 'styles/Message.module.css';

const Message = (props) => {
  const {
    text,
    image,
    carousel,
    slider,
    user,
    typing,
    hasAvatar,
    multiSelect,
    handleSubmit,
  } = props;

  const marginLeft = hasAvatar ? 'none' : '60px';

  return (
    <div className={style.message} style={{ marginLeft }}>
      {(hasAvatar && !multiSelect) && <Avatar />}
      {typing && <Typing />}
      {text && <Text message={text} user={user} />}
      {image && <Image src={image} noAvatar={!hasAvatar} />}
      {carousel && <Carousel carousel={carousel.fields} user={user} />}
      {slider && <Slider slider={slider} handleSubmit={handleSubmit} />}
      {multiSelect && <MultiSelect multiSelect={multiSelect} handleSubmit={handleSubmit} />}
    </div>
  );
};

export default memo(Message);
