import React, { useState } from 'react';
import style from 'styles/MultiSelect.module.css';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Icon from 'components/ui/Icon';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff',
    },
  },
});

export default function MultiSelect({ multiSelect, handleSubmit }) {
  const [selected, setSelected] = useState([]);
  const [confirmed, setConfirmed] = useState(false);

  const toggle = (option) => {
    if (!selected.includes(option)) setSelected((current) => [...current, option]);
    else setSelected((current) => current.filter((i) => option !== i));
  };

  const handleMultipleSuggestions = () => {
    let intent = '';
    selected.map((text) => (intent += `${text} `));
    setConfirmed(true);
    handleSubmit(intent);
  };

  return (
    <div className={style.multiSelectContainer}>
      {multiSelect.map((option, i) => (
        <div className={style.option}>
          <p>{option}</p>
          <ThemeProvider theme={theme}>
            <Checkbox
              checked={selected.includes(option)}
              color='primary'
              disabled={confirmed}
              onClick={() => toggle(option)}
            />
          </ThemeProvider>
        </div>
      ))}
      <button
        className={`${style.submit} btn btn-block btn-success`}
        onClick={handleMultipleSuggestions}
        disabled={confirmed}
        style={{ display: confirmed ? 'none' : 'block' }}
      >
        Continue
      </button>
    </div>
  );
}
