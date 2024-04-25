import "./App.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddItemModal from "./components/AddItemModal";
import TodoList from "./components/TodoList";
// import { fetchData } from "./components/FetchData";
import getUserData from "./components/GetUserData";

function App() {
  useEffect(() => {
    getData();
  }, []);

  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  const [logInPic, setLoginPic] = useState();
  const [showAddModal, setShowComponent1] = useState(false);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const toggleLogOut = () => {
    setIsDisplayed((prevState) => !prevState);
  };

  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/");
  };

  const getData = async () => {
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
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const hideModal = () => {
    setShowComponent1(false);
  };

  const showAddItemModal = () => {
    setShowComponent1(true);
  };
  let welcomeTab = " ";
  let pageClass = "min-h-screen p-9 pt-2 md:p-9";
  if (user === undefined) {
    pageClass = "min-h-screen";
    welcomeTab = (
      <div className="flex bg-white place-items-center justify-center min-w-full min-h-screen absolute top-0">
        <div className="text-center">
          <h1 className="text-2xl font-normal">You need to login</h1>
          <button
            className="bg-blue-700 text-white p-2 px-4 rounded-lg mt-3"
            onClick={goToLogin}
          >
            Login
          </button>
        </div>
      </div>
    );
  } else if (user.user_metadata) {
    const [firstName, lastName] = user.user_metadata.name.split(" ");
    welcomeTab = (
      <div className="flex flex-col md:flex-row text-center justify-between mb-5">
        <h1 className="text-2xl font-semibold mb-5 md:mb-0">
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
  }
  return (
    <>
      {showAddModal && (
        <AddItemModal onClose={hideModal} reloadPage={getData} user={user} />
      )}

      <div className={pageClass}>
        <div className="flex justify-between place-items-center mb-9 sticky top-0 bg-white border-b-2">
          <a
            href="/home"
            className="text-2xl font-semibold inline-block text-blue-700"
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
        {welcomeTab}
        <TodoList userData={data} fetch={getData} />
      </div>
    </>
  );
}

export default App;
