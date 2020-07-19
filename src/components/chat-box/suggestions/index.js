import React, { memo, useState } from 'react';
import Suggestion from 'components/chat-box/suggestions/Suggestion';
import Icon from 'components/ui/Icon';

import { suggestionBox } from 'styles/SuggestionBox.module.css';
import { suggestion } from 'styles/Suggestion.module.css';


const Suggestions = ({ suggestions, options, handleSubmit, multiple }) => {
  const [selected, setSelected] = useState([]);

  const toggle = (option) => {
    if (!selected.includes(option)) setSelected((current) => [...current, option]);
    else setSelected((current) => current.filter((i) => option !== i));
  };

  const handleMultipleSuggestions = () => {
    let intent = '';
		selected.map((text) => (intent += `${text} `));
		setSelected([]);
    handleSubmit(intent);
  };

  return (
    <div
      className={suggestionBox}
      style={{ display: (suggestions.length || options.length )=== 0 ? 'none' : 'flex' }}
    >
      {multiple
        ? options.map((option, i) => (
            <Suggestion
							multiple
              key={i}
              text={option}
              selected={selected}
              onClick={toggle}
            />
          ))
        : suggestions.map((suggestion, i) => (
            <Suggestion key={i} text={suggestion} onClick={handleSubmit} />
          ))}
      {multiple && (
        <div className={suggestion} onClick={handleMultipleSuggestions}>
          <Icon name='check' disableHover/>
        </div>
      )}
    </div>
  );
};

export default memo(Suggestions);
