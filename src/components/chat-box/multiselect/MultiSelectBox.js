import React, { memo, useState } from 'react';
import SelectOption from 'components/chat-box/multiselect/SelectOption';
import { suggestionBox } from 'styles/SuggestionBox.module.css';
import { suggestion, suggestionMessage } from 'styles/Suggestion.module.css';
import Icon from 'components/ui/Icon';

export default memo(function MultiSelect({ options, handleSubmit }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const toggleOption = (option) => {
    if (!selectedOptions.includes(option)) setSelectedOptions((current) => [...current, option]);
    else setSelectedOptions((current) => current.filter((i) => option !== i));
  };

  const handleClick = () => {
    selectedOptions.map((text) => handleSubmit(text))
  };

  return (
    <div className={suggestionBox} style={{ display: options.length === 0 ? 'none' : 'flex' }}>
      {options.map((option, i) => (
        <SelectOption optionText={option} selectedOptions={selectedOptions} key={i} toggle={toggleOption} />
      ))}
      <div className={suggestion} onClick={handleClick}>
        <Icon name='check'></Icon>
      </div>
    </div>
  );
});
