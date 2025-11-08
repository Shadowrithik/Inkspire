import React, { createContext, useState, useContext } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

// Define the possible options
export const FONT_SIZES = ["small", "medium", "large", "extralarge"]; // Lowercase, no spaces
export const MARGINS = ["narrow", "default", "wide", "verywide"]; // Lowercase, no spaces

export const SettingsProvider = ({ children }) => {
  // Initialize state using default values or localStorage
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem('fontSize');
    return FONT_SIZES.includes(saved) ? saved : 'medium'; // Default to 'medium'
  });
  const [margin, setMargin] = useState(() => {
    const saved = localStorage.getItem('margin');
    return MARGINS.includes(saved) ? saved : 'default'; // Default to 'default'
  });

  const changeFontSize = (newSize) => {
    if (FONT_SIZES.includes(newSize)) {
      setFontSize(newSize);
      localStorage.setItem('fontSize', newSize);
      // Optional: Update CSS variable if you plan to use them directly
      // const multiplier = 0.9 + (FONT_SIZES.indexOf(newSize) * 0.15);
      // document.documentElement.style.setProperty("--font-size-multiplier", `${multiplier}`);
    }
  };

  const changeMargin = (newMargin) => {
     if (MARGINS.includes(newMargin)) {
      setMargin(newMargin);
      localStorage.setItem('margin', newMargin);
      // Optional: Update CSS variable
      // const multiplier = 0.8 + (MARGINS.indexOf(newMargin) * 0.25);
      // document.documentElement.style.setProperty("--margin-multiplier", `${multiplier}`);
    }
  };

  return (
    <SettingsContext.Provider value={{ fontSize, changeFontSize, margin, changeMargin }}>
      {children}
    </SettingsContext.Provider>
  );
};