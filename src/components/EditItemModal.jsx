import React, { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./extras/theme";

export default function EditItemModal({
  description,
  date,
  time,
  notifications,
  onSave,
  onClose,
  loading
}) {
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDate, setEditedDate] = useState(date);
  const [editedTime, setEditedTime] = useState(time);
  const [editedNotification, setEditedNotification] = useState(notifications);

  const handleSave = (e) => {
    e.preventDefault();
    onSave();
  };
  let selectedOption = "On";
  if (editedNotification == false) {
    selectedOption = "Off";
  }

  return (
    <div className="z-50 modal fixed top-0 left-0 min-w-full min-h-screen flex place-items-center justify-center bg-black bg-opacity-70">
      <div className="w-5/6 md:w-1/2 bg-gray-200 p-9 pt-6 rounded-3xl">
        <p className="text-3xl text-right">
          <i
            className="fa-solid fa-xmark text-black"
            id="closeModalBtn"
            role="button"
            onClick={onClose}
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
          <div>
            <label htmlFor="time">Notifications</label>
            <select
              name="notifications"
              id="todo-notification"
              className="p-2 rounded-lg ml-3 w-1/5"
              value={selectedOption}
              onChange={(e) => setEditedNotification(e.target.value)}
            >
              <option value="On">On</option>
              <option value="Off">Off</option>
            </select>
          </div>
          <div className="mt-4 p-2 bg-green-800 text-center text-white rounded-lg">
            {loading ? (
              <ThemeProvider theme={theme.theme}>
                <CircularProgress color="secondary" size={20} />
              </ThemeProvider>
            ) : (
              <button type="submit" className="w-full">
                Edit
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
