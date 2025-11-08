import React, { useState, useEffect } from 'react';
import { LockClosedIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

/**
 * Props:
 * - isVaultInitialized: boolean (true => show "Unlock", false => show "Create Vault")
 * - onUnlock(password) => Promise<{success: boolean, error?: string}>
 * - onSetPassword(password) => Promise<void>
 *
 * This component handles its own animations and calls the passed callbacks.
 */

const PasswordModal = ({ isVaultInitialized, onUnlock, onSetPassword }) => {
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorText, setErrorText] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [playUnlockAnim, setPlayUnlockAnim] = useState(false);

  useEffect(() => {
    // reset when mode (create/unlock) toggles or when modal mounts
    setPassword('');
    setErrorText(null);
    setShowPassword(false);
    setIsSubmitting(false);
    setPlayUnlockAnim(false);
  }, [isVaultInitialized]);

  const passwordStrength = (pwd) => {
    // simple strength heuristic (0..4)
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    return score;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setErrorText(null);

    if (!password || password.length < 4) {
      setErrorText('Password must be at least 4 characters.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (isVaultInitialized) {
        // Unlock path
        const res = await onUnlock(password);
        if (!res.success) {
          setErrorText(res.error || 'Incorrect password');
          setIsSubmitting(false);
          return;
        }
        // success — play unlock animation briefly then close
        setPlayUnlockAnim(true);
        setTimeout(() => {
          setIsSubmitting(false);
        }, 650); // allow animation to play
      } else {
        // Create vault path: require a minimum strength
        const strength = passwordStrength(password);
        if (strength < 2) {
          setErrorText('Choose a stronger password (longer or include numbers/symbols).');
          setIsSubmitting(false);
          return;
        }
        await onSetPassword(password);
        // play unlock animation as feedback
        setPlayUnlockAnim(true);
        setTimeout(() => {
          setIsSubmitting(false);
        }, 650);
      }
    } catch (err) {
      console.error(err);
      setErrorText('Something went wrong — try again.');
      setIsSubmitting(false);
    }
  };

  // Strength bar visual helper
  const renderStrengthBar = () => {
    const s = passwordStrength(password);
    const labels = ['Too weak', 'Weak', 'Okay', 'Strong', 'Very strong'];
    return (
      <div className="mt-2">
        <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-800 overflow-hidden">
          <div
            className={`h-2 transition-all duration-300`}
            style={{
              width: `${(s / 4) * 100}%`,
              background:
                s === 0 ? 'transparent' : s <= 1 ? 'linear-gradient(90deg,#f97316,#fb923c)' :
                s === 2 ? 'linear-gradient(90deg,#f59e0b,#f97316)' :
                s === 3 ? 'linear-gradient(90deg,#10b981,#34d399)' :
                'linear-gradient(90deg,#06b6d4,#3b82f6)',
            }}
          />
        </div>
        <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">{labels[s]}</p>
      </div>
    );
  };

  return (
    <>
      <style>{`
        /* small animations for premium feel */
        @keyframes modalIn {
          from { transform: translateY(10px) scale(0.995); opacity: 0; }
          to   { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes lockPulse {
          0% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(99,102,241,0)); }
          50% { transform: scale(1.06); filter: drop-shadow(0 6px 18px rgba(99,102,241,0.18)); }
          100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(99,102,241,0)); }
        }
        @keyframes unlockSpin {
          0% { transform: rotate(0deg) scale(1); opacity: 1; }
          50% { transform: rotate(200deg) scale(1.05); opacity: 1; }
          100% { transform: rotate(360deg) scale(1); opacity: 1; }
        }
        .modal-enter { animation: modalIn 260ms cubic-bezier(.2,.9,.3,1) both; }
        .lock-pulse { animation: lockPulse 2000ms infinite ease-in-out; }
        .unlock-play { animation: unlockSpin 650ms cubic-bezier(.2,.9,.3,1) both; }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* modal */}
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-md mx-4 modal-enter"
        >
          <form
            onSubmit={handleSubmit}
            className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800"
          >
            {/* Top: lock icon + title */}
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`p-3 rounded-xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center ${playUnlockAnim ? 'unlock-play' : 'lock-pulse'}`}
                aria-hidden
              >
                <LockClosedIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-300" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  {isVaultInitialized ? 'Unlock Journal' : 'Create a private vault'}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {isVaultInitialized ? 'Enter your password to open the journal.' : 'Pick a safe password to protect your entries.'}
                </p>
              </div>
            </div>

            {/* input */}
            <div className="mt-2">
              <label className="relative block">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="peer w-full bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-600 transition"
                  placeholder="Your password"
                  autoFocus
                />
                <span className="absolute left-4 -top-3.5 text-xs bg-white dark:bg-gray-900 px-1 text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3.5 transition-all">
                  Password
                </span>

                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-2 top-2 p-2 rounded-md text-gray-500 hover:text-gray-700 dark:hover:text-gray-200"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </label>

              {/* strength meter on create mode */}
              {!isVaultInitialized && password.length > 0 && (
                <div>{renderStrengthBar()}</div>
              )}

              {errorText && <p className="text-sm text-red-500 mt-3">{errorText}</p>}
            </div>

            {/* actions */}
            <div className="mt-6 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition disabled:opacity-60"
                >
                  {isSubmitting ? 'Processing...' : isVaultInitialized ? 'Unlock' : 'Create Vault'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Reset field (this won't change other app logic)
                    setPassword('');
                    setErrorText(null);
                  }}
                  className="px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  Clear
                </button>
              </div>

              <div className="text-right text-xs text-gray-400">
                <p>Entries encrypted AES-GCM</p>
              </div>
            </div>

            {/* subtle footer */}
            <div className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
              Tip: Use a phrase you can remember. You will be asked every time you open the journal.
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PasswordModal;
