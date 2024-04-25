import React from "react";

export default function DeleteItemModal({ onClose, onDelete }) {
  const hideModal = () => {
    onClose();
  };
  const deleteTodoItem = async () => {
    onDelete();
    hideModal();
  };
  return (
    <div className="z-50 absolute top-0 left-0 min-w-full min-h-screen flex place-items-center justify-center bg-black bg-opacity-70">
      <div className="w-5/6 md:w-1/3 bg-gray-200 p-9 text-center rounded-3xl">
        <h1 className="text-2xl font-semibold mb-5">Are you sure?</h1>
        <button
          id="deleteItem"
          className="bg-red-600 hover:bg-red-500 text-white p-2 px-4 rounded-lg"
          onClick={deleteTodoItem}
        >
          Yes, Delete
        </button>
        <button
          onClick={hideModal}
          className="bg-gray-400 p-2 px-4 ml-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}