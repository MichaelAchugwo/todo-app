import "./App.css";
import { useState, useEffect } from "react";
import AddItemModal from "./components/AddItemModal";
import TodoList from "./components/TodoList";
import Supabase from "./components/Supabase";


function App() {
  const [data, setData] = useState([]);
  const [showAddModal, setShowComponent1] = useState(false);

  const fetchData = async () => {
    try {
      const { data: todoList, error } = await Supabase.database
        .from("todo_table")
        .select("*")
        .order("date");
      if (error) {
        throw error;
      }
      setData(todoList);
    } catch (error) {
      alert("ERROR! Check your internet connection");
      console.error("Error fetching data:", error.message);
    }
  };
  const hideModal = () => {
    setShowComponent1(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showAddItemModal = () => {
    setShowComponent1(true);
  };

  return (
    <>
      {showAddModal && (
        <AddItemModal onClose={hideModal} reloadPage={fetchData} />
      )}

      <div className="min-h-screen p-9">
        <div className="flex justify-between mb-5 sticky top-0">
          <h1 className="text-2xl font-semibold inline-block text-blue-700">
            <i className="fa-solid fa-list pr-3"></i>TODO Assistant
          </h1>
        </div>
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold inline-block">
            Welcome Back,{" "}
          </h1>
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
