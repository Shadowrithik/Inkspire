import React, { createContext, useState, useEffect, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // ADDED 'vintage' back to the list of valid themes
    return ['light', 'dark', 'vintage'].includes(savedTheme) ? savedTheme : 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    // ADDED 'vintage' to remove list
    root.classList.remove('light', 'dark', 'vintage');
    // ADDED logic to add 'vintage' class
    if (theme === 'dark' || theme === 'vintage') {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const changeTheme = (newTheme) => {
    // ADDED 'vintage' back to the validation
    if (['light', 'dark', 'vintage'].includes(newTheme)) {
      setTheme(newTheme);
    } else {
      setTheme('light'); // Default to light if invalid
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};