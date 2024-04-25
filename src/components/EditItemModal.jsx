import React, { useState } from "react";

export default function EditItemModal({
  description,
  date,
  time,
  onClose,
  onSave,
}) {
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTime, setEditedTime] = useState(time);
  const hideEditModal = () => {
    onClose();
  };
  const handleSave = (e) => {
    e.preventDefault();
    onSave();
    hideEditModal();
  };

  return (
    <div className="z-50 modal absolute top-0 left-0 min-w-full min-h-screen flex place-items-center justify-center bg-black bg-opacity-70">
      <div className="w-5/6 md:w-1/2 bg-gray-200 p-9 pt-6 rounded-3xl">
        <p className="text-3xl text-right">
          <i
            className="fa-solid fa-xmark text-black"
            id="closeModalBtn"
            role="button"
            onClick={hideEditModal}
          ></i>
        </p>
        <h1 className="text-2xl text-center font-semibold mb-2">
          Edit This Reminder
        </h1>

        <form className="space-y-4" onSubmit={handleSave}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="todo-name"
              placeholder="What are you supposed to do?"
              className="p-2 rounded-lg min-w-full capitalize"
              autoComplete="off"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="todo-date"
              id="todo-date"
              className="p-2 rounded-lg min-w-full"
              value={editedDate}
              onChange={(e) => setEditedDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="todo-time"
              className="p-2 rounded-lg min-w-full"
              value={editedTime}
              onChange={(e) => setEditedTime(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <input
              type="submit"
              value="Edit"
              role="button"
              className="bg-green-800 text-white rounded-lg p-2 px-4 w-full"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
