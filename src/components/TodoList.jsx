import React from "react";
import Todo from "./Todo";

export default function TodoList({ data, fetchData }) {
  const fetchNewData = () => {
    fetchData();
  };
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-5 mt-9"
      id="todoItemsGroup"
    >
      {data?.map((todo, index) => (
        <Todo
          key={index}
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