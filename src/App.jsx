import "./App.css";
import { useState, useEffect } from "react";
import AddItemModal from "./components/AddItemModal";
import TodoList from "./components/TodoList";

function App() {
  const [data, setData] = useState([]);
  const [db, setDB] = useState();
  const [showAddModal, setShowComponent1] = useState(false);

  const getIndexedDB = async () => {
    const request = window.indexedDB.open("myDatabase", 2);

    setDB(request.result);

    request.onerror = (event) => {
      console.error("Failed to open database:", event.target.error);
    };

    request.onsuccess = (event) => {
      const db = event.target.result;
      console.log("Database opened successfully");

      // Check if the "todo" table exists, create it if not
      if (!db.objectStoreNames.contains("todo")) {
        createTodoTable(db);
      } else {
        console.log('Using existing "todo" table');
      }

      // Close the database connection
      db.close();
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      console.log("Creating object stores...");

      createTodoTable(db);
    };
  };

  const createTodoTable = async () => {
    const objectStore = await db.createObjectStore("todo", {
      keyPath: "id",
      autoIncrement: true,
    });
    objectStore.createIndex("date", "date", { unique: false });
    objectStore.createIndex("time", "time", { unique: false });
    objectStore.createIndex("description", "description", { unique: false });
    console.log('Created "todo" table');
  };

  const fetchData = async () => {
    try {
      const request = window.indexedDB.open("myDatabase", 2);

      request.onerror = (event) => {
        console.error("Failed to open database:", event.target.error);
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["todo"], "readonly");
        const objectStore = transaction.objectStore("todo");
        const getAllRequest = objectStore.getAll();

        getAllRequest.onsuccess = () => {
          const allItems = getAllRequest.result;
          const sortedItems = allItems.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setData(sortedItems);
        };

        getAllRequest.onerror = (event) => {
          console.error("Error fetching todo items:", event.target.error);
        };

        db.close();
      };
    } catch (error) {
      alert("ERROR! Check your internet connection");
      console.error("Error fetching data:", error.message);
    }
  };

  const hideModal = () => {
    setShowComponent1(false);
  };

  useEffect(() => {
    getIndexedDB();
    fetchData();
  }, []);

  const showAddItemModal = () => {
    setShowComponent1(true);
  };

  return (
    <>
      {showAddModal && (
        <AddItemModal onClose={hideModal} reloadPage={fetchData} db={db} />
      )}

      <div className="min-h-screen p-9">
        <div className="flex justify-between mb-5 sticky top-0">
          <h1 className="text-2xl font-semibold inline-block text-blue-700">
            <i className="fa-solid fa-list pr-3"></i>TODO Assistant
          </h1>
        </div>
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold inline-block">Welcome Back</h1>
          <button
            id="addTodoBtn"
            className="bg-blue-700 hover:bg-blue-600 text-lg p-2 px-4 text-white rounded-md"
            onClick={showAddItemModal}
          >
            Add New Item
          </button>
        </div>
        <TodoList data={data} fetchData={fetchData} />
      </div>
    </>
  );
}

export default App;
