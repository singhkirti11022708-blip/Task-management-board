import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./taskcard";

function Column({
  title,
  tasks,
  column,
  deleteTask,
  moveTask,
  search,
}) {
  const { setNodeRef } = useDroppable({
    id: column,
  });

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div ref={setNodeRef} className="column">
      <h2>{title}</h2>

      {filteredTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          column={column}
          deleteTask={deleteTask}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
}

export default Column;