import React, { useState, useEffect } from 'react'; // Added useEffect back, it might be needed by hooks internally
import { useTheme } from '../../../../context/ThemeContext'; // Your path
import { useSettings } from '../../../../context/SettingsContext'; // Your path
// ADDED EyeIcon back
import { SunIcon, MoonIcon, EyeIcon } from '@heroicons/react/24/outline';
import { AdjustmentsVerticalIcon, ArrowsRightLeftIcon, BookOpenIcon } from '@heroicons/react/24/outline';

const SettingsPopup = ({ isOpen, onClose }) => {
  const { theme, changeTheme } = useTheme();
  const { fontSize, changeFontSize, margin, changeMargin } = useSettings();
  const [showThemeOptions, setShowThemeOptions] = useState(false); // Your state

  // ADDED Eye Care back
  const themes = [
    { name: 'Light', value: 'light', icon: SunIcon },
    { name: 'Dark', value: 'dark', icon: MoonIcon },
    { name: 'Eye Care', value: 'vintage', icon: EyeIcon }, // value is 'vintage' internally
  ];

  // --- Slider logic (Your code) ---
  const FONT_SIZES = ['small', 'medium', 'large', 'extralarge'];
  const MARGINS = ['narrow', 'default', 'wide', 'verywide'];
  const fontSizeMap = FONT_SIZES.reduce((acc, name, i) => ({ ...acc, [name]: i }), {});
  const marginMap = MARGINS.reduce((acc, name, i) => ({ ...acc, [name]: i }), {});
  const currentFontSizeIndex = fontSizeMap[fontSize] ?? FONT_SIZES.indexOf('medium'); // Your calculation
  const currentMarginIndex = marginMap[margin] ?? MARGINS.indexOf('default'); // Your calculation

  // Handlers need to be defined even if commented out in your snippet
  const handleFontSizeChange = (e) => {
    const index = parseInt(e.target.value, 10);
    if (index >= 0 && index < FONT_SIZES.length) {
        changeFontSize(FONT_SIZES[index]);
    }
   };
  const handleMarginChange = (e) => {
    const index = parseInt(e.target.value, 10);
     if (index >= 0 && index < MARGINS.length) {
        changeMargin(MARGINS[index]);
    }
  };
  const formatLabel = (str = '') => str.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase());
  // ---

  if (!isOpen) {
    return null;
  }

  return (
    // Pop-up container: Added vintage classes
    <div
      className="absolute right-0 top-full mt-2 w-72 origin-top-right rounded-lg shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none z-[100]
                 bg-white/90 dark:bg-gray-800/90 vintage:bg-vintage-bg/90 backdrop-blur-lg" // Added vintage bg
      onMouseLeave={onClose}
    >
      {/* Content */}
      <div className="p-4">
         {/* Header - Added vintage class */}
         <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-900 dark:text-white vintage:text-vintage-text">Display Settings</h2>
         </div>
          {/* Description - Added vintage class */}
         <p className="text-xs text-gray-700 dark:text-gray-300 vintage:text-vintage-text/90 mb-5">
            Customize reading experience.
         </p>

        {/* Font Size - Added vintage classes */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AdjustmentsVerticalIcon className="h-4 w-4 text-gray-600 dark:text-gray-400 vintage:text-vintage-text/70" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100 vintage:text-vintage-text">Font Size</span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 vintage:text-vintage-text/90">{formatLabel(FONT_SIZES[currentFontSizeIndex])}</span>
          </div>
          <input type="range" min="0" max={FONT_SIZES.length - 1} step="1"
                 value={currentFontSizeIndex}
                 onChange={handleFontSizeChange}
                 className="w-full h-2 bg-gray-300 dark:bg-gray-600 vintage:bg-vintage-border rounded-lg appearance-none cursor-pointer accent-blue-500 py-1" // Added vintage bg
          />
        </div>

        {/* Margins - Added vintage classes */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ArrowsRightLeftIcon className="h-4 w-4 text-gray-600 dark:text-gray-400 vintage:text-vintage-text/70" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100 vintage:text-vintage-text">Margins</span>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 vintage:text-vintage-text/90">{formatLabel(MARGINS[currentMarginIndex])}</span>
          </div>
          <input type="range" min="0" max={MARGINS.length - 1} step="1"
                 value={currentMarginIndex}
                 onChange={handleMarginChange}
                 className="w-full h-2 bg-gray-300 dark:bg-gray-600 vintage:bg-vintage-border rounded-lg appearance-none cursor-pointer accent-blue-500 py-1" // Added vintage bg
          />
        </div>

        {/* Theme Section - Added vintage classes */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <BookOpenIcon className="h-4 w-4 text-gray-600 dark:text-gray-400 vintage:text-vintage-text/70" />
              <span className="text-sm font-medium text-gray-800 dark:text-gray-100 vintage:text-vintage-text">Theme</span>
            </div>
            {/* Theme Toggle Buttons */}
            <div className="flex space-x-2">
               {themes.map((t) => ( // Now maps all three
                 <button
                   key={t.value}
                   onClick={() => changeTheme(t.value)}
                   // Added vintage classes
                   className={`p-1.5 rounded-md border-2 ${
                     theme === t.value
                       ? 'border-blue-500 ring-1 ring-blue-500/50'
                       : 'border-gray-300 dark:border-gray-600 vintage:border-vintage-border hover:border-gray-400 dark:hover:border-gray-500 vintage:hover:border-vintage-accent/50'
                   }`}
                 >
                    {/* Added vintage classes */}
                   <t.icon className={`h-5 w-5 ${theme === t.value ? 'text-blue-600 dark:text-blue-400 vintage:text-vintage-accent' : 'text-gray-600 dark:text-gray-400 vintage:text-vintage-text/80'}`} />
                 </button>
               ))}
            </div>
          </div>
           {/* Added vintage classes */}
          <div className="text-xs text-gray-700 dark:text-gray-300 vintage:text-vintage-text/90 border border-gray-300 dark:border-gray-600 vintage:border-vintage-border rounded-md p-2">
            Change appearance with light, dark, or eye care themes. {/* Updated text */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPopup;