import React, { useEffect } from "react";
import Todo from "./Todo";

export default function TodoList({ fetch, todo_user, userData }) {
  const fetchNewData = () => {
    fetch();
  };
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mt-9"
      id="todoItemsGroup"
    >
      {userData?.map((todo, index) => (
        <Todo
          key={index}
          user={todo_user}
          id={todo.id}
          description={todo.description}
          date={todo.date}
          time={todo.time}
          fetchData={fetchNewData}
        />
      ))}
    </div>
  );
}
