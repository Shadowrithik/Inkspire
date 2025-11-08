import React, { useState, useEffect, useRef } from 'react';
import { useJournalVault } from '../hooks/useJournalVault';
import PasswordModal from '../components/PasswordModal';
import JournalCover from '../components/JournalCover';
import OpenJournal from '../components/OpenJournal';
import CreateEditJournalEntry from '../components/CreateEditJournalEntry';

const VIEWS = {
  LOCKED: 'LOCKED',
  COVER: 'COVER',
  OPEN_BOOK: 'OPEN_BOOK',
  EDITOR: 'EDITOR',
};

const JournalPage = () => {
  const vault = useJournalVault();
  const [currentView, setCurrentView] = useState(VIEWS.LOCKED);
  const [entryToEdit, setEntryToEdit] = useState(null);
  const lockTimerRef = useRef(null);

  // Lock journal automatically if inactive or page hidden
  useEffect(() => {
    const autoLock = () => {
      vault.lockVault();
      setCurrentView(VIEWS.LOCKED);
    };

    const resetTimer = () => {
      clearTimeout(lockTimerRef.current);
      lockTimerRef.current = setTimeout(autoLock, 60000); // 60s idle lock
    };

    const handleVisibilityChange = () => {
      if (document.hidden) autoLock();
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(lockTimerRef.current);
    };
  }, [vault]);

  useEffect(() => {
    if (vault.isLocked) setCurrentView(VIEWS.LOCKED);
    else setCurrentView(VIEWS.COVER);
  }, [vault.isLocked]);

  const handleSetPassword = async (password) => {
    await vault.initializeVault(password);
    setCurrentView(VIEWS.COVER);
  };

  const handleUnlock = async (password) => {
    const result = await vault.unlockVault(password);
    if (result.success) setCurrentView(VIEWS.COVER);
    return result;
  };

  const handleGoToEditor = (entry = null) => {
    setEntryToEdit(entry);
    setCurrentView(VIEWS.EDITOR);
  };

  const handleCloseEditor = () => {
    setEntryToEdit(null);
    setCurrentView(VIEWS.OPEN_BOOK);
  };

  const handleSaveEntry = async (entryData) => {
    if (entryToEdit) await vault.updateEntry(entryData);
    else await vault.addEntry(entryData);
    handleCloseEditor();
  };

  if (currentView === VIEWS.LOCKED)
    return (
      <PasswordModal
        isVaultInitialized={vault.isVaultInitialized}
        onUnlock={handleUnlock}
        onSetPassword={handleSetPassword}
      />
    );

  if (currentView === VIEWS.COVER)
    return (
      <JournalCover
        onOpenJournal={() => {
          if (vault.isLocked) setCurrentView(VIEWS.LOCKED);
          else setCurrentView(VIEWS.OPEN_BOOK);
        }}
        animateClose={vault.isLocked}
      />
    );

  if (currentView === VIEWS.OPEN_BOOK)
    return (
      <OpenJournal
        entries={vault.entries}
        onGoToEditor={handleGoToEditor}
        onCloseJournal={() => setCurrentView(VIEWS.COVER)}
        onDeleteEntry={vault.deleteEntry}
      />
    );

  if (currentView === VIEWS.EDITOR)
    return (
      <CreateEditJournalEntry
        entry={entryToEdit}
        onSave={handleSaveEntry}
        onClose={handleCloseEditor}
      />
    );

  return <div className="dark:text-white">Loading Journal...</div>;
};

export default JournalPage;
