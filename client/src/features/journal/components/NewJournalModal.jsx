import React, { useState } from "react";

const NewJournalModal = ({ onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("journal");
  const [selectedTag, setSelectedTag] = useState("General");

  const availableTags = ["General", "Work", "Personal", "Ideas"];

  const handleSave = () => {
    const newJournal = {
      title,
      content,
      type,
      tag: selectedTag, // ✅ properly attach tag here
      date: new Date().toISOString(),
    };
    onSave(newJournal);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl shadow-2xl w-full max-w-lg relative">
        <h2 className="text-2xl font-bold mb-4">New Journal</h2>

        {/* Type Selection */}
        <select
          className="border p-2 rounded-md mb-3 w-full"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="journal">Journal</option>
          <option value="author">Author</option>
          <option value="quotes">Quotes</option>
        </select>

        {/* Title */}
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded-md mb-3 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <textarea
          placeholder="Write something..."
          className="border p-2 rounded-md mb-3 w-full h-32"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Tag Search + Pills */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search tags..."
            className="border p-2 rounded-md w-full mb-2"
            onFocus={() => {}} // show tag list on focus
            readOnly
          />

          <div className="flex gap-2 flex-wrap">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 rounded-full border-2 ${
                  selectedTag === tag
                    ? "border-blue-500 text-blue-600"
                    : "border-dashed border-gray-400 text-gray-500"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-400 rounded-md text-white"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 rounded-md text-white"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewJournalModal;
