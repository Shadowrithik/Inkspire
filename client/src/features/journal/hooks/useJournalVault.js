import { useState, useEffect, useCallback } from 'react';

// --- Web Crypto Helpers ---
async function getKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return window.crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );
}

async function encryptData(data, password) {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(password, salt);
  const enc = new TextEncoder();
  const encrypted = await window.crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(JSON.stringify(data)));

  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  const ivHex = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
  const encryptedHex = Array.from(new Uint8Array(encrypted)).map(b => b.toString(16).padStart(2, '0')).join('');

  return `${saltHex}:${ivHex}:${encryptedHex}`;
}

async function decryptData(encryptedString, password) {
  try {
    const [saltHex, ivHex, encryptedHex] = encryptedString.split(':');
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const iv = new Uint8Array(ivHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const encrypted = new Uint8Array(encryptedHex.match(/.{1,2}/g).map(b => parseInt(b, 16)));
    const key = await getKey(password, salt);
    const dec = new TextDecoder();
    const decrypted = await window.crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, encrypted);
    return JSON.parse(dec.decode(decrypted));
  } catch (error) {
    console.error('Decryption failed:', error);
    return null;
  }
}

// --- Vault Logic ---
const VAULT_KEY = 'inkspire_journal_vault';
const SESSION_PASSWORD_KEY = 'inkspire_session_password';
const SAMPLE_ENTRIES = [
  {
    id: 'sample-1',
    title: 'My First Entry',
    content: "This is a sample entry. Click 'Edit' to change it or 'New Entry' to write your own!",
    date: new Date().toISOString(),
    tags: ['guide'],
  },
];

export const useJournalVault = () => {
  const [entries, setEntries] = useState([]);
  const [isLocked, setIsLocked] = useState(true);
  const [password, setPassword] = useState(null);
  const [isVaultInitialized, setIsVaultInitialized] = useState(false);

  // On mount — check if vault + session password exist
  useEffect(() => {
    const vault = localStorage.getItem(VAULT_KEY);
    setIsVaultInitialized(!!vault);

    const savedPassword = sessionStorage.getItem(SESSION_PASSWORD_KEY);
    if (savedPassword && vault) {
      setPassword(savedPassword);
      setIsLocked(false);
      decryptData(vault, savedPassword).then((data) => {
        if (data?.entries) setEntries(data.entries);
      });
    }
  }, []);

  const saveVault = useCallback(
    async (currentEntries, currentPassword = password) => {
      if (!currentPassword) {
        console.error('Vault is locked. Cannot save.');
        return;
      }
      const dataToSave = { entries: currentEntries };
      const encryptedVault = await encryptData(dataToSave, currentPassword);
      localStorage.setItem(VAULT_KEY, encryptedVault);
      console.log('✅ Vault saved with', currentEntries.length, 'entries');
    },
    [password]
  );

  const initializeVault = async (newPassword) => {
    const defaultData = { entries: SAMPLE_ENTRIES };
    const encryptedVault = await encryptData(defaultData, newPassword);
    localStorage.setItem(VAULT_KEY, encryptedVault);
    sessionStorage.setItem(SESSION_PASSWORD_KEY, newPassword);
    setPassword(newPassword);
    setEntries(defaultData.entries);
    setIsLocked(false);
    setIsVaultInitialized(true);
  };

  const unlockVault = async (attemptedPassword) => {
    const encryptedVault = localStorage.getItem(VAULT_KEY);
    if (!encryptedVault) return { success: false, error: 'Vault not found.' };

    const data = await decryptData(encryptedVault, attemptedPassword);
    if (!data) return { success: false, error: 'Incorrect password.' };

    sessionStorage.setItem(SESSION_PASSWORD_KEY, attemptedPassword);
    setPassword(attemptedPassword);
    setEntries(data.entries || SAMPLE_ENTRIES);
    setIsLocked(false);
    return { success: true };
  };

  const lockVault = () => {
    sessionStorage.removeItem(SESSION_PASSWORD_KEY);
    setPassword(null);
    setEntries([]);
    setIsLocked(true);
  };

  const addEntry = async (newEntryData) => {
    const newEntry = { ...newEntryData, id: `entry-${Date.now()}`, date: new Date().toISOString() };
    const newEntries = [newEntry, ...entries];
    setEntries(newEntries);
    await saveVault(newEntries);
  };

  const updateEntry = async (updatedEntry) => {
    const newEntries = entries.map((e) => (e.id === updatedEntry.id ? updatedEntry : e));
    setEntries(newEntries);
    await saveVault(newEntries);
  };

  const deleteEntry = async (id) => {
    const newEntries = entries.filter((e) => e.id !== id);
    setEntries(newEntries);
    await saveVault(newEntries);
  };

  return {
    entries,
    isLocked,
    isVaultInitialized,
    initializeVault,
    unlockVault,
    lockVault,
    addEntry,
    updateEntry,
    deleteEntry,
  };
};
