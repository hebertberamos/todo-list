import { useState, useEffect, use } from "react";
import {
  createTaskService,
  deleteTaskService,
  getAllTasks,
  updateTaskService,
} from "../services/TaskService";
import NewTaskForm from "./NewTaskForm";

const TasksList = () => {
  const getStatusColor = (status) => {
    switch (status) {
      case "DONE":
        return "green";
      case "DOING":
        return "orange";
      default:
        return "gray"; // TODO
    }
  };

  // STATE: Think of these as your temporary database for the UI
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editStatus, setEditStatus] = useState("TODO");

  // EFFECT: This runs when the component "mounts" (loads for the first time)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data); // Update state with data
      } catch (err) {
        dw;
        setError(err.message); // Capture error
      } finally {
        setIsLoading(false); // Stop loading spinner regardless of outcome
      }
    };

    fetchTasks();
  }, []); // The empty array [] ensures this runs only once on mount

  const handleAddTask = async (newTitle, newDescription) => {
    try {
      //Send request to back-end to save new task
      const newTask = await createTaskService(newTitle, newDescription);

      // Update State
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  // Start editing
  const startEditing = (task) => {
    setEditingId(task.id);
    setEditTitle(task.title); // Pre-fill the input with current title
    setEditDescription(task.description);
    setEditStatus(task.status);
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditTitle("");
    setEditDescription("");
  };

  // Save changes
  const saveEdit = async (id) => {
    try {
      // Create the object to send to backend
      // NOTE: We keep the existing status/description, only changing title or description for now
      // If you want to edit description too, you need a second input field.
      const taskToUpdate = tasks.find((t) => t.id === id);
      const updatedTask = {
        ...taskToUpdate,
        title: editTitle,
        description: editDescription,
        status: editStatus,
      };

      const result = await updateTaskService(id, updatedTask);

      // Update the UI
      setTasks(tasks.map((task) => (task.id === id ? result : task)));

      // Exit edit mode
      setEditingId(null);
    } catch (err) {
      alert("Failed to update: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja deletar essa task?")) return;

    try {
      await deleteTaskService(id);

      setTasks((prevTasks) => prevTasks.filter((task) => task.id != id));
    } catch (err) {
      alert(err.message);
    }
  };

  // RENDER: The UI logic based on the state
  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

  return (
    <div className="tasks-main-container">
      <h2>Task List</h2>

      <NewTaskForm onTaskCreated={handleAddTask} />

      <ul>
        {tasks.map((task) => (
          <div
            className="task-card"
            key={task.id}
            style={{ borderLeft: `5px solid ${getStatusColor(task.status)}` }}
          >
            {editingId === task.id ? (
              /* --- EDIT MODE --- */
              <div className="edit-mode">
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />

                {/* DROPDOWN FOR ENUM */}
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  style={{ marginLeft: "10px" }}
                >
                  <option value="TODO">To Do</option>
                  <option value="DOING">Doing</option>
                  <option value="DONE">Done</option>
                </select>

                <div style={{ marginTop: "10px" }}>
                  <button onClick={() => saveEdit(task.id)}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </div>
              </div>
            ) : (
              /* --- VIEW MODE --- */
              <div className="view-mode">
                <h3>{task.title}</h3>

                {/* Display Status Badge */}
                <span
                  style={{
                    backgroundColor: getStatusColor(task.status),
                    color: "white",
                    padding: "2px 8px",
                    borderRadius: "4px",
                    fontSize: "0.8rem",
                  }}
                >
                  {task.status}
                </span>

                <p>{task.description}</p>

                <button onClick={() => startEditing(task)}>Edit</button>
                <button
                  onClick={() => handleDelete(task.id)}
                  style={{ marginLeft: "10px", color: "red" }}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksList;
