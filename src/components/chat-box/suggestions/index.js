import React, { memo, useState } from 'react';
import Suggestion from 'components/chat-box/suggestions/Suggestion';

import { suggestionBox } from 'styles/SuggestionBox.module.css';

const Suggestions = ({ suggestions, handleSubmit }) => {
  return (
    <div className={suggestionBox} style={{ display: suggestions.length === 0 ? 'none' : 'flex' }}>
      {suggestions.map((suggestion, i) => (
        <Suggestion key={i} text={suggestion} onClick={handleSubmit} />
      ))}
    </div>
  );
};

export default memo(Suggestions);
