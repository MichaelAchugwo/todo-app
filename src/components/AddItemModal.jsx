import React, { useState } from "react";
import Supabase from "./extras/Supabase";
import CircularProgress from "@mui/material/CircularProgress";
import theme from "./extras/theme";
import { ThemeProvider } from "@mui/material/styles";
import Toastify from "toastify-js";

export default function AddItemModal({
  user,
  onClose,
  fetch,
  setLoading,
  setShow,
}) {
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const hideModal = () => {
    onClose();
  };
  const addItemToDB = async (e) => {
    e.preventDefault();
    isLoading(true);
    const inputDate = document.getElementById("todoDate").value;
    const currentDate = new Date();
    const reminderTimeInput = document.getElementById("todoTime").value;
    const [hours, minutes] = reminderTimeInput.split(":").map(Number);

    const inputTime =
      new Date(inputDate).getTime() + hours * 3600000 + minutes * 60000;
    const currentTime = currentDate.getTime() + 3600000;
    const isDayAfter2100 = new Date(inputDate).getTime() > 4132252800000;

    let notificationBoolean = true;
    const notificationInput =
      document.getElementById("notificationSelect").selectedIndex;
    if (notificationInput === 1) {
      notificationBoolean = false;
    }
    if (inputTime < currentTime || isDayAfter2100) {
      Toastify({
        text: "Choose a valid date and time. Between now and year 2100",
        className: "info",
        duration: 2000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "rgb(185 28 28)",
          color: "white",
        },
      }).showToast();
      isLoading(false);
    } else {
      try {
        const { data: todoList } = await Supabase.database
          .from("todo_table")
          .insert([
            {
              date: `${document.getElementById("todoDate").value}`,
              time: `${document.getElementById("todoTime").value}`,
              description: `${
                document.getElementById("todoDescription").value
              }`,
              email: user.email,
              username: user.user_metadata.name,
              user_id: user.id,
              notifications: notificationBoolean,
            },
          ])
          .select();
        setData(todoList);
        if (notificationBoolean === true) {
        }
      } catch (error) {
        Toastify({
          text: "ERROR! Check your internet connection",
          className: "info",
          duration: 2000,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "rgb(185 28 28)",
            color: "white",
          },
        }).showToast();
        console.error("Error:", error);
      }
      fetch();
      Toastify({
        text: `${document
          .getElementById("todoDescription")
          .value.toUpperCase()} added!`,
        className: "info",
        duration: 2000,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "rgb(22 101 52)",
          color: "white",
        },
      }).showToast();
      isLoading(false);
      setShow(false);
      setLoading(true);
    }
  };
  const getCurrentDate = () => {
    let date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };
  const getCurrentTime = () => {
    let date = new Date();
    let time = "";
    let timeArray = date.toTimeString().split(" ")[0].split(":");
    time = time + timeArray[0] + ":" + timeArray[1];
    return time;
  };

  return (
    <div className="z-50 modal fixed min-w-full min-h-screen flex place-items-center justify-center bg-black bg-opacity-70">
      <div className="w-5/6 md:w-1/2 bg-gray-200 p-9 pt-6 rounded-3xl">
        <p className="text-3xl text-right">
          <i
            className="fa-solid fa-xmark text-black"
            id="closeModalBtn"
            role="button"
            onClick={hideModal}
          ></i>
        </p>
        <h1 className="text-2xl text-center font-semibold mb-2">
          Add New Thing to do
        </h1>
        <form className="space-y-4" onSubmit={addItemToDB}>
          <div>
            <label htmlFor="name">Description</label>
            <input
              type="text"
              name="description"
              id="todoDescription"
              placeholder="What are you supposed to do?"
              className="p-2 rounded-lg min-w-full capitalize"
              autoComplete="off"
              required
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="todoDate"
              defaultValue={getCurrentDate()}
              className="p-2 rounded-lg min-w-full"
              required
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="time"
              name="time"
              id="todoTime"
              className="p-2 rounded-lg min-w-full"
              defaultValue={getCurrentTime()}
              required
            />
          </div>
          <div>
            <label htmlFor="notificationSelect">Reminder</label>
            <select
              name="notifications"
              id="notificationSelect"
              className="p-2 rounded-lg ml-3 w-1/5"
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
                Add
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
