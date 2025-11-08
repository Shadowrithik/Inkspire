import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

/* =========================
   TagSelector Component
   - closes on mouse leave
   - glossy backdrop tuned for dark/light
========================= */
const TagSelector = ({ availableTags, selectedTags, onChange }) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // close on outside click
    const handleDoc = (e) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleDoc);
    return () => document.removeEventListener("mousedown", handleDoc);
  }, []);

  const toggleTag = (tagName) => {
    if (selectedTags.includes(tagName)) {
      onChange(selectedTags.filter((t) => t !== tagName));
    } else {
      onChange([...selectedTags, tagName]);
    }
    setQuery("");
    setOpen(true);
  };

  const filtered = availableTags
    .map((t) => t.name)
    .filter((n) => n.toLowerCase().includes(query.trim().toLowerCase()));

  // small delay when leaving so quick re-entries don't close immediately
  let leaveTimer = useRef(null);
  const handleMouseLeave = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setOpen(false), 120);
  };
  const handleMouseEnter = () => {
    clearTimeout(leaveTimer.current);
  };

  return (
    <div ref={containerRef} className="relative flex-1 min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        {selectedTags.map((tag) => {
          const tagMeta =
            availableTags.find((a) => a.name === tag) || {
              colorClass: "border-gray-300 text-gray-700",
            };
          return (
            <span
              key={tag}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border-dashed border-2 ${tagMeta.colorClass} bg-white/40 dark:bg-gray-800/40`}
            >
              <span>{tag}</span>
              <button
                onClick={() => toggleTag(tag)}
                aria-label={`remove ${tag}`}
                className="ml-1 text-xs opacity-70 hover:opacity-100"
              >
                ×
              </button>
            </span>
          );
        })}

        <div className="relative flex-1 min-w-[180px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setOpen(true)}
            placeholder="Search or select tags..."
            className="w-full px-3 py-2 text-sm bg-transparent border border-dashed border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:text-gray-200 dark:border-gray-700"
          />

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.99 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.99 }}
                transition={{ duration: 0.14 }}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                className="absolute left-0 right-0 mt-2 z-50 rounded-lg max-h-44 overflow-auto
                  border border-gray-200 dark:border-gray-700 shadow-lg
                  bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
              >
                <div className="p-2">
                  {filtered.length === 0 && (
                    <div className="text-sm text-gray-500 px-2 py-2">No tags found</div>
                  )}

                  {filtered.map((name) => {
                    const isSel = selectedTags.includes(name);
                    return (
                      <button
                        key={name}
                        onClick={() => toggleTag(name)}
                        className={`w-full text-left px-3 py-2 rounded-md mb-1 hover:bg-gray-100/60 dark:hover:bg-gray-800/60 transition-all
                          ${isSel ? "bg-indigo-50 dark:bg-indigo-900/40" : ""}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm">{name}</div>
                          <div className="text-xs text-gray-400">{isSel ? "Selected" : "Add"}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


const MAX_CHARS_PER_PAGE = 800;

const availableTags = [
  { name: "General", colorClass: "border-blue-300 text-blue-600" },
  { name: "Work", colorClass: "border-green-300 text-green-600" },
  { name: "Personal", colorClass: "border-rose-300 text-rose-600" },
  { name: "Ideas", colorClass: "border-amber-300 text-amber-600" },
];

const STORAGE_KEY = "journalEntries";

const CreateEditJournalEntry = ({ entry = null, onSave, onClose }) => {
  const isEditing = !!entry;
  const [content, setContent] = useState("");
  const [pages, setPages] = useState([""]);
  const [selectedTags, setSelectedTags] = useState(entry?.tags || []);
  const category = "Journal";

  // Hydrate content: prefer entry prop, otherwise look into localStorage by id
  useEffect(() => {
    let initialContent = "";
    if (entry && typeof entry.content === "string" && entry.content.length > 0) {
      initialContent = entry.content;
    } else if (entry && entry.id) {
      try {
        const store = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const found = store.find((s) => s.id === entry.id);
        if (found && typeof found.content === "string") initialContent = found.content;
      } catch (e) {
        // ignore parse errors
      }
    }
    setContent(initialContent);
    // also hydrate tags if not provided
    if (!entry?.tags && entry?.id) {
      try {
        const store = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        const found = store.find((s) => s.id === entry.id);
        if (found && Array.isArray(found.tags)) setSelectedTags(found.tags);
      } catch (e) {}
    }
  }, [entry]);

  // Split content into pages
  useEffect(() => {
    const totalPages = Math.max(1, Math.ceil(content.length / MAX_CHARS_PER_PAGE));
    const newPages = [];
    for (let i = 0; i < totalPages; i++) {
      newPages.push(content.slice(i * MAX_CHARS_PER_PAGE, (i + 1) * MAX_CHARS_PER_PAGE));
    }
    setPages(newPages);
  }, [content]);

  // persist to localStorage helper (fallback)
  const persistToLocal = (entryData) => {
    try {
      const store = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
      const exists = store.find((s) => s.id === entryData.id);
      let newStore;
      if (exists) {
        newStore = store.map((s) => (s.id === entryData.id ? entryData : s));
      } else {
        newStore = [...store, entryData];
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore));
    } catch (e) {
      // ignore localStorage errors
      console.warn("Could not persist journal entry to localStorage", e);
    }
  };

  // Save handler — calls parent then persists fallback
  const handleSave = () => {
    const entryId = entry?.id || Date.now();
    const entryData = {
      ...(entry || {}),
      id: entryId,
      title: entry?.title || "Untitled Entry",
      content,
      category,
      tags: selectedTags,
      date: new Date().toISOString(),
    };

    // Primary: ask parent to save
    if (typeof onSave === "function") {
      try {
        onSave(entryData);
      } catch (e) {
        console.warn("onSave threw", e);
      }
    }

    // Fallback local persistence so edit shows next time even if parent misses it
    persistToLocal(entryData);
  };

  // When any page changes we update `content` (joins pages). This keeps content canonical.
  const handlePageChange = (index, text) => {
    const next = [...pages];
    next[index] = text;
    // join pages into content string
    const joined = next.join("");
    setContent(joined);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="relative w-full min-h-[70vh] flex flex-col rounded-2xl shadow-2xl bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 overflow-hidden">

        {/* HEADER */}
        <div className="p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600 flex items-start md:items-center gap-4 flex-wrap">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 flex-shrink-0">
            {entry?.title || "New Journal Entry"}
          </h2>

          <TagSelector
            availableTags={availableTags}
            selectedTags={selectedTags}
            onChange={setSelectedTags}
          />

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-semibold flex items-center gap-2"
            >
              <ArrowDownTrayIcon className="h-5 w-5" /> Save
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>

        {/* PAGES */}
        <div className="flex-1 overflow-y-auto p-8 md:p-12 bg-gray-50 dark:bg-gray-900 relative font-playwrite text-xl text-gray-800 dark:text-stone-300">
          <AnimatePresence>
            {pages.map((pageText, idx) => (
              <motion.div
                key={idx}
                initial={{ rotateY: -90, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: 90, opacity: 0 }}
                transition={{ duration: 0.28 }}
                className="relative mb-8 p-6 rounded-xl bg-[url('https://www.transparenttextures.com/patterns/lined-paper.png')] bg-repeat shadow-inner border border-gray-200 dark:border-gray-700 origin-left backdrop-blur-md"
              >
                <textarea
                  value={pageText}
                  onChange={(e) => handlePageChange(idx, e.target.value)}
                  placeholder="Start writing..."
                  className="w-full bg-transparent border-none focus:outline-none resize-none leading-8 min-h-[60vh]"
                />
                <p className="absolute bottom-3 right-4 text-sm text-gray-500 dark:text-gray-400">
                  Page {idx + 1}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CreateEditJournalEntry;
