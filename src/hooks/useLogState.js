import { useState } from 'react';
import starterMessage from '../helpers/messages/starter';

export default (initialState = []) => {
  const [state, setState] = useState(starterMessage || initialState);
  const addLog = (response, user) =>
    setState((state) => [
      ...state,
      {
        user,
        texts: response.texts,
        slider: response.slider,
        images: response.images,
        carousel: response.carousel,
        multiSelect: response.multiSelect,
      },
    ]);
  return [state, addLog];
};
