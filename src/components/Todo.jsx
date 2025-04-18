import React, { useState, useEffect } from "react";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";
import Supabase from "./extras/Supabase";
import Toastify from "toastify-js";

export default function Todo({
  id,
  description,
  date,
  time,
  notifications,
  fetchData,
  setLoading,
}) {
  useEffect(() => {
    getMinutes();
    const intervalId = setInterval(() => {
      getMinutes();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  const [showEditModal, setShowComponent2] = useState(false);
  const [showDeleteModal, setShowComponent3] = useState(false);
  const [editItemDescription, setEditItemDescription] = useState("");
  const [editItemDate, setEditItemDate] = useState("");
  const [editItemTime, setEditItemTime] = useState("");
  const [editItemNotification, setEditItemNotification] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [loading, isLoading] = useState(false);

  let notificationIcon = <i className="fa-regular fa-bell"></i>;

  if (notifications === true) {
    notificationIcon = <i className="fa-solid fa-bell text-yellow-600"></i>;
  }

  const showEditItemModal = (description, date, time, notifications) => {
    setShowComponent2(true);
    setEditItemDescription(description);
    setEditItemDate(date);
    setEditItemTime(time);
    setEditItemNotification(notifications);
  };
  const hideModal = () => {
    setShowComponent2(false);
    setShowComponent3(false);
  };

  const updateTodoItem = async () => {
    isLoading(true);
    let todoDescription = document.getElementById("todo-name").value;
    let todoDate = document.getElementById("todo-date").value;
    let todoTime = document.getElementById("todo-time").value;
    let todoNotification = true;
    if (document.getElementById("todo-notification").selectedIndex === 1) {
      todoNotification = false;
    }
    try {
      const { error } = await Supabase.database
        .from("todo_table")
        .update({
          date: `${todoDate}`,
          description: `${todoDescription}`,
          time: `${todoTime}`,
          notifications: todoNotification,
        })
        .eq("id", `${id}`);
      if (error) {
        isLoading(false);
        throw error;
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
      isLoading(false);
      console.error("Error updating todo item:", error.message);
    }
    fetchData();
    Toastify({
      text: `${todoDescription.toUpperCase()} updated!`,
      className: "info",
      duration: 2000,
      gravity: "top",
      position: "center",
      stopOnFocus: true,
      style: {
        background: "rgb(37 99 235)",
        color: "white",
      },
    }).showToast();
    isLoading(false);
    setShowComponent2(false);
    setLoading(true);
  };

  const showDeleteItemModal = () => {
    setShowComponent3(true);
  };
  const deleteTodoItem = async () => {
    isLoading(true);
    try {
      const { error } = await Supabase.database
        .from("todo_table")
        .delete()
        .eq("id", `${id}`);
      if (error) {
        isLoading(false);
        throw error;
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
      isLoading(false);
      console.error("Error updating todo item:", error.message);
    }
    fetchData();
    Toastify({
      text: `${description.toUpperCase()} deleted!`,
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
    setShowComponent3(false);
    setLoading(true);
  };

  const changeNotification = async () => {
    try {
      const { error } = await Supabase.database
        .from("todo_table")
        .update({
          notifications: !notifications,
        })
        .eq("id", `${id}`);
      if (error) {
        throw error;
      }
      if (!notifications === false) {
        Toastify({
          text: `Notifications are now turned off for ${description}`,
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
      } else if (!notifications === true) {
        Toastify({
          text: `Notifications are now turned on for ${description}`,
          className: "info",
          duration: 2000,
          gravity: "top",
          position: "center",
          stopOnFocus: true,
          style: {
            background: "rgb(37 99 235)",
            color: "white",
          },
        }).showToast();
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
      console.error("Error changing notification settings:", error.message);
    }
    fetchData();
  };

  let todoDate = new Date(date);
  let day = todoDate.getDate();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[Number(todoDate.getMonth())];
  let year = todoDate.getFullYear();
  let formattedDate = `${day}th ${month}, ${year}`;
  let currentDate = new Date();
  const differenceInMs = todoDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));
  const [hours, minutes, seconds] = time.split(":").map(Number);
  let todoTime = todoDate.setHours(hours, minutes, seconds, 0);
  const timeLeft = todoTime - currentDate.getTime();
  const fetchNewData = () => {
    fetchData();
  };

  const getMinutes = () => {
    let [todoHours, todoMinutes, todoSeconds] = time.split(":").map(Number);
    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
    let differenceInMinutes =
      todoHours * 60 + todoMinutes - (currentHours * 60 + currentMinutes);
    if (differenceInMinutes < 60 && differenceInDays < 1) {
      setDaysLeft(`${differenceInMinutes}m left`);
    } else if (currentHours < 24 && differenceInDays < 1) {
      const hoursLeft = Math.floor(differenceInMinutes / 60);
      const minutesLeft = differenceInMinutes % 60;
      setDaysLeft(`${hoursLeft}h ${minutesLeft}m left`);
    } else if (differenceInDays === 1) {
      setDaysLeft("1 day left");
    } else {
      setDaysLeft(`${differenceInDays} days left`);
    }
  };

  if (timeLeft > 0) {
    return (
      <>
        {showEditModal && (
          <EditItemModal
            onClose={hideModal}
            onSave={updateTodoItem}
            description={editItemDescription}
            date={editItemDate}
            time={editItemTime}
            notifications={editItemNotification}
            fetch={fetchNewData}
            loading={loading}
          />
        )}
        {showDeleteModal && (
          <DeleteItemModal
            onClose={hideModal}
            onDelete={deleteTodoItem}
            fetch={fetchNewData}
            loading={loading}
          />
        )}
        <div className="border-x-2 border-y-2 border-b-8 border-gray-300 inline-block p-4 pb-6 rounded-xl shadow-sm bg-gray-800 dark:bg-white">
          <div className="flex justify-between text-white dark:text-black">
            <h1 className="text-xl inline-block font-semibold max-w-64">
              {description.toUpperCase()}
            </h1>
            <h1 className="text-lg inline-block font-medium">{daysLeft}</h1>
          </div>
          <p className="py-5 text-center text-white dark:text-black">
            <i
              className="fa fa-clock-o pr-2 text-xl text-fuchsia-500"
              aria-hidden="true"
            ></i>
            {formattedDate}
            <span className="font-semibold px-2">{time} GMT+1</span>
          </p>

          <div className="text-center">
            <button
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium p-2 px-4 rounded-lg mr-2"
              onClick={() =>
                showEditItemModal(description, date, time, notifications)
              }
            >
              Edit
            </button>
            <button
              className="bg-red-700 hover:bg-red-600 text-white font-medium p-2 px-4 rounded-lg"
              onClick={showDeleteItemModal}
            >
              Delete
            </button>
            <button className="text-2xl px-2" onClick={changeNotification}>
              {notificationIcon}
            </button>
          </div>
        </div>
      </>
    );
  }
}
