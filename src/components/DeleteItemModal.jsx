import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./extras/theme";

export default function DeleteItemModal({ onClose, onDelete, fetch, loading }) {
  const deleteTodoItem = async () => {
    onDelete();
  };
  return (
    <div className="z-50 fixed top-0 left-0 min-w-full min-h-screen flex place-items-center justify-center bg-black bg-opacity-70">
      <div className="w-5/6 md:w-1/3 bg-gray-200 p-9 text-center rounded-3xl">
        <h1 className="text-2xl font-semibold mb-5">Are you sure?</h1>
        <button
          id="deleteItem"
          className="bg-red-600 hover:bg-red-500 text-white p-2 px-4 rounded-lg"
          onClick={deleteTodoItem}
        >
          {loading ? (
            <ThemeProvider theme={theme.theme}>
              <CircularProgress color="secondary" size={20} />
            </ThemeProvider>
          ) : (
            <>Yes, Delete</>
          )}
        </button>

        <button
          onClick={onClose}
          className="bg-gray-400 p-2 px-4 ml-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
