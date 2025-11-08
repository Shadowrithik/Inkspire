// /components/OpenQuotes.jsx
import React, { useState, useEffect } from 'react';

const OpenQuotes = ({ entries = [], onNew, onEdit, onBack, onDelete, onDeleteMultiple }) => {
  const [selected, setSelected] = useState({});
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setSelected({});
    setSelectAll(false);
  }, [entries]);

  const toggleSelect = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const handleSelectAll = () => {
    if (!selectAll) {
      const map = {};
      entries.forEach(e => map[e.id] = true);
      setSelected(map);
      setSelectAll(true);
    } else {
      setSelected({});
      setSelectAll(false);
    }
  };

  const selectedIds = Object.keys(selected).filter(k => selected[k]);
  const handleDeleteSelected = () => {
    if (!selectedIds.length) return;
    onDeleteMultiple(selectedIds);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <button onClick={onBack} className="px-3 py-1 bg-gray-200 rounded">Back</button>
        <div className="flex items-center gap-2">
          <button onClick={onNew} className="px-3 py-1 bg-green-500 text-white rounded">New Quote</button>
          <button onClick={handleSelectAll} className="px-3 py-1 bg-gray-100 rounded">{selectAll ? 'Unselect All' : 'Select All'}</button>
          <button onClick={handleDeleteSelected} disabled={!selectedIds.length} className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50">Delete Selected</button>
        </div>
      </div>

      <div className="space-y-3">
        {entries.length === 0 && <div className="p-4 border rounded text-gray-500">No quotes yet.</div>}
        {entries.map(entry => (
          <div key={entry.id} className="p-3 border rounded flex items-start gap-3">
            <input type="checkbox" checked={!!selected[entry.id]} onChange={() => toggleSelect(entry.id)} />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-semibold">{entry.title}</div>
                  <div className="text-xs text-gray-500">{new Date(entry.date).toLocaleString()}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => onEdit(entry)} className="text-sm px-2 py-1 bg-yellow-200 rounded">Edit</button>
                  <button onClick={() => onDelete(entry.id)} className="text-sm px-2 py-1 bg-red-200 rounded">Delete</button>
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-700 italic">{entry.content?.slice(0, 300)}{entry.content && entry.content.length > 300 ? '...' : ''}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OpenQuotes;
