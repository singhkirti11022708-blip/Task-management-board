import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

function TaskCard({ task, column, deleteTask, moveTask }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
    data: {
      column,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="task">
      <h3>{task.text}</h3>

      <p className={task.priority.toLowerCase()}>
        Priority: {task.priority}
      </p>

      {column === "todo" && (
        <button onClick={() => moveTask("todo", "progress", task)}>
          Move →
        </button>
      )}

      {column === "progress" && (
        <>
          <button onClick={() => moveTask("progress", "todo", task)}>
            ← Back
          </button>

          <button onClick={() => moveTask("progress", "done", task)}>
            Done →
          </button>
        </>
      )}

      {column === "done" && (
        <button onClick={() => moveTask("done", "progress", task)}>
          ← Back
        </button>
      )}

      <button onClick={() => deleteTask(column, task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskCard;