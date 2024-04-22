import React, { useState, useEffect } from "react";
import EditItemModal from "./EditItemModal";
import DeleteItemModal from "./DeleteItemModal";

export default function Todo({ id, description, date, time, fetchData }) {
  const [showEditModal, setShowComponent2] = useState(false);
  const [showDeleteModal, setShowComponent3] = useState(false);
  const [editItemDescription, setEditItemDescription] = useState("");
  const [editItemDate, setEditItemDate] = useState("");
  const [editItemTime, setEditItemTime] = useState("");
  const [daysLeft, setDaysLeft] = useState("");
  const [minutesLeft, setMinutesLeft] = useState();
  const [db, setDB] = useState();

  const showEditItemModal = (description, date, time) => {
    setShowComponent2(true);
    setEditItemDescription(description);
    setEditItemDate(date);
    setEditItemTime(time);
  };
  const hideModal = () => {
    setShowComponent2(false);
    setShowComponent3(false);
  };

  const updateTodoItem = async () => {
    let todoDescription = document.getElementById("todo-name").value;
    let todoDate = document.getElementById("todo-date").value;
    let todoTime = document.getElementById("todo-time").value;

    try {
      const db = await new Promise((resolve, reject) => {
        const request = window.indexedDB.open("myDatabase", 2);

        request.onerror = (event) => {
          console.error("Failed to open database:", event.target.error);
          reject(event.target.error);
        };

        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      });

      const transaction = db.transaction(["todo"], "readwrite");
      const objectStore = transaction.objectStore("todo");
      const editRequest = objectStore.put({
        id,
        date: todoDate,
        time: todoTime,
        description: todoDescription,
      });

      editRequest.onsuccess = () => {
        console.log("Todo item edited successfully");
        db.close();
        fetchData(); // Assuming fetchData() is a function to update the UI after editing
      };

      editRequest.onerror = (event) => {
        console.error("Error editing todo item:", event.target.error);
        db.close();
      };
    } catch (error) {
      alert("ERROR! Check your internet connection");
      console.error("Error updating todo item:", error.message);
    }
  };

  const showDeleteItemModal = () => {
    setShowComponent3(true);
  };
  const deleteTodoItem = async () => {
    try {
      const db = await new Promise((resolve, reject) => {
        const request = window.indexedDB.open("myDatabase", 2);

        request.onerror = (event) => {
          console.error("Failed to open database:", event.target.error);
          reject(event.target.error);
        };

        request.onsuccess = (event) => {
          resolve(event.target.result);
        };
      });
      const transaction = db.transaction(["todo"], "readwrite");
      const objectStore = transaction.objectStore("todo");
      const deleteRequest = objectStore.delete(id);

      deleteRequest.onsuccess = () => {
        console.log("Todo item deleted successfully");
      };

      deleteRequest.onerror = (event) => {
        console.error("Error deleting todo item:", event.target.error);
      };

      db.close();
      fetchData();
    } catch (error) {
      alert("ERROR! Check your internet connection");
      console.error("Error fetching data:", error.message);
    }
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

  const fetchNewData = () => {
    fetchData();
  };
  const getMinutes = () => {
    let [todoHours, todoMinutes, todoSeconds] = time.split(":").map(Number);
    let currentHours = new Date().getHours();
    let currentMinutes = new Date().getMinutes();
    let differenceInMinutes =
      todoHours * 60 + todoMinutes - (currentHours * 60 + currentMinutes);
    setMinutesLeft(differenceInMinutes);
    if (differenceInMinutes < 60 && differenceInDays < 1) {
      setDaysLeft(`${differenceInMinutes}m left`);
    } else if (currentHours < 24 && differenceInDays < 1) {
      const hoursLeft = Math.floor(differenceInMinutes / 60);
      const minutesLeft = differenceInMinutes % 60;
      setDaysLeft(`${hoursLeft}h ${minutesLeft}m left`);
    } else {
      setDaysLeft(`${differenceInDays} days left`);
    }
  };

  useEffect(() => {
    getMinutes();
    const intervalId = setInterval(() => {
      getMinutes();
    }, 60000);
    return () => {
      clearInterval(intervalId);
    };
  }, [time]);

  if (minutesLeft > 0) {
    return (
      <>
        {showEditModal && (
          <EditItemModal
            onClose={hideModal}
            onSave={updateTodoItem}
            description={editItemDescription}
            date={editItemDate}
            time={editItemTime}
            fetchData={fetchNewData}
          />
        )}
        {showDeleteModal && (
          <DeleteItemModal onClose={hideModal} onDelete={deleteTodoItem} />
        )}
        <div className="bg-gray-100 inline-block p-4 pb-6 rounded-xl shadow-lg">
          <div className="flex justify-between">
            <h1 className="text-xl inline-block font-semibold max-w-64">
              {description.toUpperCase()}
            </h1>
            <h1 className="text-lg inline-block font-medium">{daysLeft}</h1>
          </div>
          <p className="py-5 text-center">
            <i
              className="fa fa-clock-o pr-2 text-xl text-fuchsia-500"
              aria-hidden="true"
            ></i>
            {formattedDate}
            <span className="font-semibold px-2">{time} GMT+1</span>
          </p>

          <div className="text-center">
            <button
              id="editTodoBtn1"
              className="bg-blue-700 hover:bg-blue-600 text-white font-medium p-2 px-4 rounded-lg mr-2"
              onClick={() => showEditItemModal(description, date, time)}
            >
              Edit
            </button>
            <button
              id="deleteTodoBtn1"
              className="bg-red-700 hover:bg-red-600 text-white font-medium p-2 px-4 rounded-lg"
              onClick={showDeleteItemModal}
            >
              Delete
            </button>
          </div>
        </div>
      </>
    );
  }
}
