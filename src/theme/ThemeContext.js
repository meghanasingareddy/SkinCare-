import React, { createContext, useContext, useState, useMemo } from 'react';
import { getThemeColors } from './colors';

const ThemeContext = createContext({
  accent: 'pink',
  mode: 'light',
  colors: getThemeColors('pink', 'light'),
  setAccent: () => {},
  setMode: () => {},
  toggleMode: () => {},
  toggleAccent: () => {},
});

export const ThemeProvider = ({ children, initialAccent = 'pink', initialMode = 'light' }) => {
  const [accent, setAccent] = useState(initialAccent);
  const [mode, setMode] = useState(initialMode);

  const colors = useMemo(() => getThemeColors(accent, mode), [accent, mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleAccent = () => {
    setAccent((prev) => (prev === 'pink' ? 'blue' : 'pink'));
  };

  return (
    <ThemeContext.Provider
      value={{
        accent,
        mode,
        colors,
        setAccent,
        setMode,
        toggleMode,
        toggleAccent,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
