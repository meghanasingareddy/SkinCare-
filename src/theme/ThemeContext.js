import React, { createContext, useContext, useState, useMemo } from 'react';
import { getThemeColors } from './colors';

const ThemeContext = createContext({
  mode: 'light',
  colors: getThemeColors('light'),
  setMode: () => {},
  toggleMode: () => {},
});

export const ThemeProvider = ({ children, initialMode = 'light' }) => {
  const [mode, setMode] = useState(initialMode);

  const colors = useMemo(() => getThemeColors(mode), [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        colors,
        setMode,
        toggleMode,
        isDark: mode === 'dark',
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
