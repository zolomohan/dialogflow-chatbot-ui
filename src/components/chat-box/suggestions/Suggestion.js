import React from 'react';
import style from 'styles/Suggestion.module.css';

const Suggestion = ({ text, onClick }) => {
  const handleClick = () => onClick(text);
  return (
    <div className={style.suggestion} onClick={handleClick}>
      <p>{text}</p>
    </div>
  );
};

export default Suggestion;
