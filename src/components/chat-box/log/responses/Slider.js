import React, { useState } from 'react';
import MuiSlider from '@material-ui/core/Slider';
import style from 'styles/Slider.module.css';
import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Icon from 'components/ui/Icon';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#fff',
    },
  },
});

const useStyles = makeStyles({
  root: {
    width: 250,
  },
});

export default function Slider({ slider, handleSubmit }) {
  const classes = useStyles();
  const [confirmed, setConfirmed] = useState(false);
  const [value, setValue] = useState(slider.default.numberValue);
  return (
    <ThemeProvider theme={theme}>
      <div className={`${classes.root} ${style.slider}`}>
        <MuiSlider
          marks
          value={value}
          onChange={(e, value) => setValue(value)}
          disabled={confirmed}
          color='primary'
          valueLabelDisplay='auto'
          step={slider.step.numberValue}
          min={slider.min.numberValue}
          max={slider.max.numberValue}
          defaultValue={slider.default.numberValue}
        />
      </div>
      <div
        className={style.submit}
        style={{ display: !confirmed ? 'block' : 'none' }}
        onClick={() => {
          setConfirmed(true);
          handleSubmit(`value: ${value}`);
        }}
      >
        <Icon name='check' disableHover />
      </div>
    </ThemeProvider>
  );
}
