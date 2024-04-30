import "./App.css";
import "toastify-js/src/toastify.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddItemModal from "./components/AddItemModal";
import TodoList from "./components/TodoList";
import getUserData from "./components/extras/GetUserData";
import fetchData from "./components/extras/FetchData";
import Supabase from "./components/extras/Supabase";
import Loader from "./components/extras/Loader";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

function App() {
  useEffect(() => {
    Supabase.database.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        navigate("/login");
      } else {
        getData();
      }
    });
  }, []);

  const [data, setData] = useState([]);
  const [user, setUser] = useState();
  const [logInPic, setLoginPic] = useState();
  const [showAddModal, setShowComponent1] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [welcomeTab, setWelcome] = useState();
  const [darkMode, setDarkMode] = useState(false);

  const toggleLogOut = () => {
    setIsDisplayed((prevState) => !prevState);
  };

  const reloadComponents = async () => {
    const data = await fetchData(user);
    setData(data);
    setLoading(false);
  };

  const navigate = useNavigate();

  const getData = async () => {
    setLoading(true);
    try {
      const { user, userData } = await getUserData();
      setUser(user);
      setLoginPic(
        <>
          <img
            src="user_avatar.png"
            className="rounded-full m-2 mb-2"
            width="40px"
            alt="Profile Picture"
            role="button"
            onClick={toggleLogOut}
          />
        </>
      );
      setData(userData);
      const [firstName, lastName] = user.user_metadata.name.split(" ");
      setWelcome(
        <div className="flex flex-col md:flex-row text-center justify-between mb-5">
          <h1 className="text-2xl font-semibold mb-5 md:mb-0 dark:text-white">
            Welcome Back, <span className="text-red-500">{firstName}</span>
          </h1>
          <button
            id="addTodoBtn"
            className="bg-blue-700 hover:bg-blue-600 text-lg p-2 px-4 text-white rounded-md"
            onClick={showAddItemModal}
          >
            Add New Item
          </button>
        </div>
      );
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    setLoading(false);
  };

  const hideModal = () => {
    setShowComponent1(false);
  };

  const showAddItemModal = () => {
    setShowComponent1(true);
  };
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div className={darkMode ? "dark" : ""}>
      {showAddModal && (
        <AddItemModal
          onClose={hideModal}
          user={user}
          fetch={reloadComponents}
          setLoading={setLoading}
          setShow={setShowComponent1}
        />
      )}
      <div className="min-h-screen p-9 pt-2 dark:bg-gray-800">
        <div className="flex justify-between place-items-center mb-9 sticky top-0 bg-white dark:bg-gray-800">
          <a
            href="/"
            className="text-2xl font-semibold inline-block text-blue-700 dark:text-white"
          >
            <i className="fa-solid fa-list pr-3"></i>TODO Assistant
          </a>
          <div className="flex flex-col text-center md:flex-row mt-2 md:mt-0 place-items-center bg-gray-100 shadow-none md:shadow-md rounded-xl mb-2">
            {logInPic}
            {isDisplayed && (
              <a
                href="/logout"
                className="font-semibold px-2 pb-2 md:pb-0 md:pl-0"
              >
                Logout
              </a>
            )}
          </div>
        </div>
        <Loader when={loading}>
          {welcomeTab}
          <TodoList
            userData={data}
            fetch={reloadComponents}
            setLoading={setLoading}
          />
        </Loader>
        <div
          role="button"
          className="fixed bottom-[30px] right-[30px] p-2 rounded-full bg-black text-white"
          onClick={toggleDarkMode}
        >
          {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
        </div>
      </div>
    </div>
  );
}

export default App;
