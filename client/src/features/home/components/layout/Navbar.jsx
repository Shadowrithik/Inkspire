import React, { useState } from 'react'; // Already present
import { Link, NavLink } from 'react-router-dom';
// Ensure correct path - Assuming Navbar is in src/components/layout
import { useTheme } from '../../../../context/ThemeContext'; // <-- Path from your code
// Assuming SettingsPopup is the correct name and path based on previous steps
import SettingsPopup from '../modals/SettingsPopUp'; // Corrected import name based on your code
// ADDED EyeIcon back
import { SunIcon, MoonIcon, CogIcon ,EyeIcon} from '@heroicons/react/24/outline'; // <-- Icons from your code


const Navbar = () => {
  // --- ADDED State & Theme Logic ---
  const { theme, changeTheme } = useTheme();
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [isSettingsPopupOpen, setIsSettingsPopupOpen] = useState(false); // Changed state name for clarity

  // ADDED Eye Care back
  const themes = [
    { name: 'Light', value: 'light', icon: SunIcon },
    { name: 'Dark', value: 'dark', icon: MoonIcon },
    { name: 'Eye Care', value: 'vintage', icon: EyeIcon }, // value is 'vintage' internally
  ];

  // --- MODIFIED HANDLERS ---
  const handleOpenSettings = () => {
    setIsThemeDropdownOpen(false); // Close theme dropdown first
    setIsSettingsPopupOpen(true); // Then open settings popup
  };

  const handleToggleTheme = () => {
    setIsSettingsPopupOpen(false); // Close settings popup first
    setIsThemeDropdownOpen(!isThemeDropdownOpen); // Then toggle theme dropdown
  };
  // --- END MODIFIED HANDLERS ---

  return (
    // Your header styles - Added vintage variant
    <header className="sticky top-0 z-50 bg-white/10 dark:bg-gray-900/10 vintage:bg-vintage-bg/10 backdrop-blur-md shadow-sm transition-colors duration-300"> {/* Adjusted opacity */}
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">

        {/* Left Section: Logo (Your Code) - Added vintage variant */}
          <NavLink to="/" className="flex items-center space-x-2">
            <img
              src="/icon.svg"
              alt="Inkspire Logo"
              className="h-8 w-8 text-blue-600"
            />
            {/* Added vintage variant */}
            <span className="text-2xl font-bold text-gray-800 dark:text-gray-100 vintage:text-vintage-text">
              Inkspire
            </span>
          </NavLink>

        {/* Center Section: Nav Links (Your Code) - Added vintage variants */}
        {/* Added back background/padding for pill effect */}
        <nav className="hidden md:flex items-center space-x-1 bg-gray-100/70 dark:bg-gray-800/70 vintage:bg-vintage-border/70 p-1 rounded-full shadow-sm">
          <NavLink
            to="/"
            className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? 'bg-white dark:bg-gray-700 vintage:bg-vintage-bg text-gray-900 dark:text-white vintage:text-vintage-text shadow-sm ring-1 ring-blue-500' // Added vintage variants
                : 'text-gray-500 dark:text-gray-400 vintage:text-vintage-text/80 hover:text-gray-700 dark:hover:text-gray-200 vintage:hover:text-vintage-text' // Added vintage variants
              }`
            }
          > Home </NavLink>
          <NavLink
            to="/journal"
              className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? 'bg-white dark:bg-gray-700 vintage:bg-vintage-bg text-gray-900 dark:text-white vintage:text-vintage-text shadow-sm ring-1 ring-blue-500' // Added vintage variants
                : 'text-gray-500 dark:text-gray-400 vintage:text-vintage-text/80 hover:text-gray-700 dark:hover:text-gray-200 vintage:hover:text-vintage-text' // Added vintage variants
              }`
            }
          > Journal </NavLink>
          <NavLink
            to="/library"
              className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? 'bg-white dark:bg-gray-700 vintage:bg-vintage-bg text-gray-900 dark:text-white vintage:text-vintage-text shadow-sm ring-1 ring-blue-500' // Added vintage variants
                : 'text-gray-500 dark:text-gray-400 vintage:text-vintage-text/80 hover:text-gray-700 dark:hover:text-gray-200 vintage:hover:text-vintage-text' // Added vintage variants
              }`
            }
          > Library </NavLink>
          <NavLink
            to="/mybooks"
              className={({ isActive }) => `px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              isActive
                ? 'bg-white dark:bg-gray-700 vintage:bg-vintage-bg text-gray-900 dark:text-white vintage:text-vintage-text shadow-sm ring-1 ring-blue-500' // Added vintage variants
                : 'text-gray-500 dark:text-gray-400 vintage:text-vintage-text/80 hover:text-gray-700 dark:hover:text-gray-200 vintage:hover:text-vintage-text' // Added vintage variants
              }`
            }
          > Mybooks </NavLink>
        </nav>

        {/* --- MODIFIED Right Section Wrapper --- */}
        <div className="flex items-center space-x-4">
          {/* --- Theme Dropdown --- */}
          <div className="relative"> {/* Needs relative positioning for dropdown */}
            <button
              onClick={handleToggleTheme} // <-- USE THE NEW HANDLER
              // Added vintage variant
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 vintage:text-vintage-text hover:bg-gray-200 dark:hover:bg-gray-700 vintage:hover:bg-vintage-border transition-colors"
              aria-label="Change theme"
            >
              {/* Updated icon logic */}
              {theme === 'dark' ? <MoonIcon className="h-6 w-6" /> : theme === 'vintage' ? <EyeIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            {/* Dropdown Menu */}
            {isThemeDropdownOpen && (
              <div
                // Added vintage variant
                className="absolute right-0 mt-2 w-36 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 transition-colors duration-300
                           bg-white/85 dark:bg-gray-800/85 backdrop-blur-lg" // Added duration
                onMouseLeave={() => setIsThemeDropdownOpen(false)}
              >
                {themes.map((t) => ( // Now maps all three
                  <button
                    key={t.value}
                    onClick={() => { changeTheme(t.value); setIsThemeDropdownOpen(false); }} // Kept your onClick logic structure
                    // Added vintage variants
                    className={`flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 vintage:text-vintage-text hover:bg-gray-100 dark:hover:bg-gray-700 vintage:hover:bg-vintage-border ${
                      theme === t.value ? 'font-semibold' : ''
                    }`}
                  >
                    <t.icon className="h-5 w-5 mr-3" />
                    {t.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* --- Settings Button & Popup Container--- */}
          <div className="relative"> {/* Added relative positioning for popup */}
            <button
              onClick={handleOpenSettings} // Use the handler that closes theme dropdown
              // Added vintage variant
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 vintage:text-vintage-text hover:bg-gray-200 dark:hover:bg-gray-700 vintage:hover:bg-vintage-border transition-colors"
              aria-label="Open display settings"
            >
              <CogIcon className="h-6 w-6" /> {/* Corrected Icon Name */}
            </button>
            {/* --- Conditional Popup Rendering --- */}
             {isSettingsPopupOpen && <SettingsPopup isOpen={isSettingsPopupOpen} onClose={() => setIsSettingsPopupOpen(false)} />}
          </div>


          {/* Avatar (Your Code) */}
          <Link to="/profile">
            <img
              src="/images/profile/PFP image.png"
              alt="User Avatar"
              className="w-10 h-10 rounded-full ring-1 ring-blue-600 object-cover"
            />
          </Link>
        </div>
        {/* --- END MODIFIED Right Section Wrapper --- */}

      </div>
       {/* Removed modal rendering from here */}
    </header>
  );
};

export default Navbar;