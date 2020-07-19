import React from 'react';
import style from 'styles/Suggestion.module.css';

const Suggestion = ({ text, selected, multiple, onClick }) => {
  const handleClick = () => onClick(text);
  return (
    <div className={style.suggestion} onClick={handleClick}>
      <p>{text}</p>
      {multiple && (
        <input type='checkbox' checked={selected.includes(text)}></input>
      )}
    </div>
  );
}

export default Suggestion;
