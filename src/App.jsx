import { useState, useEffect } from "react";
import "./App.css";
import Column from "./components/Column";

import {
  DndContext,
  closestCenter,
} from "@dnd-kit/core";


function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");

  const [board, setBoard] = useState(() => {
    const savedBoard = localStorage.getItem("board");

    return savedBoard
      ? JSON.parse(savedBoard)
      : {
          todo: [],
          progress: [],
          done: [],
        };
  });

  useEffect(() => {
    localStorage.setItem("board", JSON.stringify(board));
  }, [board]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      priority: priority,
    };

    setBoard({
      ...board,
      todo: [...board.todo, newTask],
    });

    setTask("");
    setPriority("Medium");
  };

  const deleteTask = (column, id) => {
    setBoard({
      ...board,
      [column]: board[column].filter(
        (item) => item.id !== id
      ),
    });
  };

  const moveTask = (from, to, task) => {
    setBoard({
      ...board,
      [from]: board[from].filter(
        (item) => item.id !== task.id
      ),
      [to]: [...board[to], task],
    });
  };


const handleDragEnd = (event) => {
  const { active, over } = event;

  if (!over) return;

  const from = active.data.current.column;
  const to = over.id;

  if (from === to) return;

  const task = board[from].find(
    (item) => item.id === active.id
  );

  moveTask(from, to, task);
};

  return (
    <div className="app">
      <h1>Task Management Board</h1>

      <div className="addTask">
        <input
          type="text"
          placeholder="Enter Task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <button onClick={addTask}>
          Add Task
        </button>
      </div>

      <div className="searchBox">
        <input
          type="text"
          placeholder="Search Task..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </div>

      <DndContext
  collisionDetection={closestCenter}
  onDragEnd={handleDragEnd}
>
  <div className="board">

    <Column
      title="To Do"
      tasks={board.todo}
      column="todo"
      deleteTask={deleteTask}
      moveTask={moveTask}
      search={search}
    />

    <Column
      title="In Progress"
      tasks={board.progress}
      column="progress"
      deleteTask={deleteTask}
      moveTask={moveTask}
      search={search}
    />

    <Column
      title="Done"
      tasks={board.done}
      column="done"
      deleteTask={deleteTask}
      moveTask={moveTask}
      search={search}
    />

  </div>
</DndContext>
    </div>
    
  );
}

export default App;