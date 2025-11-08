import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Tag, Calendar, Trash2, Edit3 } from "lucide-react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

/* ===========================
   Delete Confirm Modal
=========================== */
const DeleteConfirmModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { transform: translateY(10px) scale(0.98); opacity: 0; }
          to { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes pulseWarning {
          0%,100% { transform: scale(1); filter: drop-shadow(0 0 0 rgba(239,68,68,0)); }
          50% { transform: scale(1.08); filter: drop-shadow(0 4px 12px rgba(239,68,68,0.25)); }
        }
        .modal-enter { animation: modalIn 260ms cubic-bezier(.2,.9,.3,1) both; }
        .warning-pulse { animation: pulseWarning 1600ms infinite ease-in-out; }
      `}</style>

      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <div className="relative w-full max-w-md mx-4 modal-enter">
          <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-6 md:p-8 border border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div
                className="p-3 rounded-xl bg-gradient-to-br from-red-50 to-white dark:from-red-950 dark:to-gray-900 border border-red-100 dark:border-red-900 flex items-center justify-center warning-pulse"
                aria-hidden
              >
                <ExclamationTriangleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Delete Journal Entry?
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This action cannot be undone. The entry will be permanently deleted.
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onCancel}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition text-sm font-medium"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow transition text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ===========================
   New Journal Modal (Updated)
=========================== */
const NewJournalModal = ({ isOpen, onClose, onSave, onGoToEditor }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("journal");
  const [selectedTag, setSelectedTag] = useState("General");
  const availableTags = ["General", "Work", "Personal", "Ideas"];

  if (!isOpen) return null;

  const handleCreate = () => {
    const newEntry = {
      id: Date.now(),
      title,
      description,
      content: "",
      type,
      tag: selectedTag,
      date: new Date().toISOString(),
    };
    onSave(newEntry);
    onClose();
    onGoToEditor?.(newEntry); // opens writing page
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-lg border border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          New Journal Entry
        </h2>

        {/* Type Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1 text-gray-600 dark:text-gray-400">
            Select Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
          >
            <option value="journal">Journal</option>
            <option value="author">Author</option>
            <option value="quotes">Quotes</option>
          </select>
        </div>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 mb-4 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200"
        />

        {/* Description */}
        <textarea
          placeholder="Description for your journal..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2.5 h-28 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-200 mb-4"
        />

        {/* Tags */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
            Select Tag
          </label>
          <div className="flex gap-2 flex-wrap">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full border-2 text-sm transition ${
                  selectedTag === tag
                    ? "border-indigo-500 text-indigo-600 bg-indigo-50 dark:bg-indigo-900/20"
                    : "border-dashed border-gray-400 text-gray-500 hover:border-gray-500"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow transition font-medium"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

/* ===========================
   Main Journal Component
=========================== */
const OpenJournal = ({
  entries: initialEntries = [],
  onGoToEditor,
  onCloseJournal,
}) => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : initialEntries;
  });

  const [selectedTag, setSelectedTag] = useState("All");
  const [filteredEntries, setFilteredEntries] = useState(entries);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedTag === "All") setFilteredEntries(entries);
    else setFilteredEntries(entries.filter((entry) => entry.tag === selectedTag));
  }, [entries, selectedTag]);

  const saveEntriesToStorage = (updatedEntries) => {
    setEntries(updatedEntries);
    localStorage.setItem("journalEntries", JSON.stringify(updatedEntries));
  };

  const handleSaveNewEntry = (newEntry) => {
    const updated = [...entries, newEntry];
    saveEntriesToStorage(updated);
    setIsModalOpen(false);
    onGoToEditor(newEntry);
  };

  const handleDeleteClick = (id) => setDeleteModal({ open: true, id });

  const confirmDelete = () => {
    if (deleteModal.id) {
      const updated = entries.filter((e) => e.id !== deleteModal.id);
      saveEntriesToStorage(updated);
    }
    setDeleteModal({ open: false, id: null });
  };

  const cancelDelete = () => setDeleteModal({ open: false, id: null });

  return (
    <>
      <motion.div
        className="min-h-screen bg-gray-50 px-8 py-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h1 className="text-4xl font-semibold text-gray-800 tracking-tight">
            My Journal
          </h1>
          <div className="flex gap-3">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md transition-all"
            >
              <Plus size={18} /> New Entry
            </button>
            <button
              onClick={onCloseJournal}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 rounded-xl transition-all text-gray-700 font-medium"
            >
              Close
            </button>
          </div>
        </div>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-3 mb-8">
          {["All", "General", "Work", "Personal", "Ideas"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTag === tag
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white border border-gray-200 hover:bg-gray-100 text-gray-600"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Entries */}
        {filteredEntries.length === 0 ? (
          <p className="text-gray-400 text-center mt-20 text-lg">
            No journal entries yet. Start writing your thoughts.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEntries.map((entry) => (
              <motion.div
                key={entry.id}
                whileHover={{ scale: 1.02 }}
                className="relative bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-lg transition-all p-6 cursor-pointer"
              >
                {/* Edit/Delete */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onGoToEditor(entry);
                    }}
                    className="p-2 bg-gray-100 hover:bg-indigo-100 rounded-lg"
                  >
                    <Edit3 size={16} className="text-indigo-600" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(entry.id);
                    }}
                    className="p-2 bg-gray-100 hover:bg-red-100 rounded-lg"
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>

                {/* Journal Card */}
                <div
                  onClick={() => onGoToEditor(entry)}
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800 truncate mb-2">
                      {entry.title || "Untitled"}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-4 mb-4">
                      {entry.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-gray-400 text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar size={14} />
                      {new Date(entry.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1 text-gray-600 bg-gray-100 px-2 py-1 rounded-md">
                      <Tag size={12} />
                      {entry.tag || "General"}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Modals */}
      <DeleteConfirmModal
        isOpen={deleteModal.open}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <NewJournalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveNewEntry}
        onGoToEditor={onGoToEditor}
      />
    </>
  );
};

export default OpenJournal;