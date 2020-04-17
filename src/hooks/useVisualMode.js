import React, { useState } from 'react';

export function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);
  const [mode, setMode] = useState(initial);

  function transition (newMode, replace = false){
    if (!replace){
      history.push(newMode);
    }
    setMode(newMode);
  };

  function back (){
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    }
  };

  return { mode, transition, back };
};
