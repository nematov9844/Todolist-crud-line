import React, { useState } from "react";

export default function TodoItem({ item, toggleTask, editTask, deleteTask, setEditingTask, isEditing }) {
  const [editedName, setEditedName] = useState(item.name);

  const handleEdit = () => {
    setEditingTask(item.id);
  };

  const handleSave = () => {
    editTask(item.id, editedName);
  };

  return (
    <div className="grid grid-cols-4 font-bold items-center gap-3 p-2 border-b border-gray-300">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => toggleTask(item.id)}
      />

      {isEditing ? (
        <>
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            className="bg-gray-100 px-2 rounded-md"
          />
          <button onClick={handleSave} className="bg-green-500 text-white px-3 rounded-md">Save</button>
        </>
      ) : (
        <>
          <span className={item.checked ? "line-through" : ""}> <span className="text-white">{item.name}</span> </span>
          <button onClick={handleEdit} className="bg-fuchsia-700 text-white px-3 rounded-md">Edit</button>
        </>
      )}
      <button onClick={() => deleteTask(item.id)} className="bg-red-500 text-white px-3 rounded-md">Delete</button>
    </div>
  );
}
