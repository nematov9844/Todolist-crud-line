import React, { useState, useEffect } from "react";
import TodoItem from "../todoItem/todoItem";

export default function Todolist() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [search, setSearch] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetch("https://66ffade74da5bd2375518372.mockapi.io/api/data")
      .then((response) => response.json())
      .then((data) => setTasks(data));
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    const task = { name: newTask, checked: false };

    fetch("https://66ffade74da5bd2375518372.mockapi.io/api/data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks([...tasks, data]);
        setNewTask("");
      });
  };

  const editTask = (id, newName) => {
    const updatedTask = tasks.find((task) => task.id === id);
    updatedTask.name = newName;

    fetch(`https://66ffade74da5bd2375518372.mockapi.io/api/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(tasks.map((task) => (task.id === id ? data : task)));
        setEditingTask(null); 
      });
  };

  const deleteTask = (id) => {
    fetch(`https://66ffade74da5bd2375518372.mockapi.io/api/data/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((task) => task.id !== id));
    });
  };

  const toggleTask = (id) => {
    const updatedTask = tasks.find((task) => task.id === id);
    updatedTask.checked = !updatedTask.checked;

    fetch(`https://66ffade74da5bd2375518372.mockapi.io/api/data/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    })
      .then((response) => response.json())
      .then((data) => {
        setTasks(tasks.map((task) => (task.id === id ? data : task)));
      });
  };

  const progress =
    (tasks.filter((task) => task.checked).length / tasks.length) * 100 || 0;

  return (
    <div className="flex flex-col items-center  p-5 rounded-md  shadow-[rgba(0,0,0,0.4)] shadow-md gap-5 bg-[rgba(71,120,255,0.24)]">
      <form
        className="border-2 border-blue-500 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent pl-3 outline-none  text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="bg-blue-500 text-white font-bold py-1 px-3 rounded-r-md">
          Search
        </button>
      </form>

      <form
        onSubmit={addTask}
        className="border-2 border-fuchsia-500 rounded-lg"
      >
        <input
          type="text"
          className="bg-transparent pl-3 outline-none text-white font-medium"
          placeholder="Add Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          type="submit"
          className="bg-fuchsia-500 text-white py-1 px-3 font-bold rounded-r-md"
        >
          Save
        </button>
      </form>

      <div className="w-full max-w-[450px]">
        {tasks
          .filter(
            (task) =>
              task.name &&
              task.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((task) => (
            <TodoItem
              key={task.id}
              item={task}
              toggleTask={toggleTask}
              editTask={editTask}
              deleteTask={deleteTask}
              setEditingTask={setEditingTask}
              isEditing={editingTask === task.id}
            />
          ))}
      </div>
      <div className="w-full bg-gray-300 max-w-[450px]  rounded-full h-2.5 mt-5">
      <div
  className={`${
    progress <= 10
      ? "bg-green-300"
      : progress <= 20
      ? "bg-green-400"
      : progress <= 30
      ? "bg-green-500"
      : progress <= 40
      ? "bg-green-600"
      : progress <= 50
      ? "bg-yellow-400"
      : progress <= 60
      ? "bg-yellow-500"
      : progress <= 70
      ? "bg-yellow-600"
      : progress <= 80
      ? "bg-orange-400"
      : progress <= 90
      ? "bg-orange-500"
      : "bg-red-500"
  } h-2.5 rounded-full`}
  style={{ width: `${progress}%` }}
></div>

      </div>

      <p className="text-white">{Math.round(progress)}% completed</p>
    </div>
  );
}
