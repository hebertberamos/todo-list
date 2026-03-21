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
  if (isLoading) return <div className="login-rectangle-bg"><div className="login-body"><div className="login-title">Carregando tarefas...</div></div></div>;
  if (error) return <div className="login-rectangle-bg"><div className="login-body"><div className="login-error">Erro: {error}</div></div></div>;

  return (
    <div className="login-rectangle-bg">
      <div className="login-body">
        <div className="login-title">Lista de Tarefas</div>
        <NewTaskForm onTaskCreated={handleAddTask} />
        <ul style={{ width: '100%', padding: 0, margin: 0, listStyle: 'none' }}>
          {tasks.map((task) => (
            <li key={task.id} style={{ width: '100%' }}>
              <div
                className="task-card login-task-card"
                style={{ borderLeft: `5px solid ${getStatusColor(task.status)}` }}
              >
                {editingId === task.id ? (
                  <div className="edit-mode">
                    <input
                      className="login-input"
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Título"
                      style={{ marginBottom: 8 }}
                    />
                    <input
                      className="login-input"
                      type="text"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      placeholder="Descrição"
                      style={{ marginBottom: 8 }}
                    />
                    <select
                      className="login-input"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                      style={{ marginBottom: 8 }}
                    >
                      <option value="TODO">To Do</option>
                      <option value="DOING">Doing</option>
                      <option value="DONE">Done</option>
                    </select>
                    <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                      <button className="login-btn" type="button" onClick={() => saveEdit(task.id)}>
                        <span className="login-btn-text">Salvar</span>
                      </button>
                      <button className="login-btn" type="button" onClick={cancelEditing} style={{ background: '#bbb', color: '#000' }}>
                        <span className="login-btn-text" style={{ color: '#000' }}>Cancelar</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="view-mode">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <h3 style={{ margin: 0, color: '#000' }}>{task.title}</h3>
                      <span
                        className="login-task-status"
                        style={{ backgroundColor: getStatusColor(task.status) }}
                      >
                        {task.status}
                      </span>
                    </div>
                    <p style={{ color: '#222', margin: '8px 0 16px 0' }}>{task.description}</p>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="login-btn" type="button" onClick={() => startEditing(task)}>
                        <span className="login-btn-text">Editar</span>
                      </button>
                      <button
                        className="login-btn"
                        type="button"
                        onClick={() => handleDelete(task.id)}
                        style={{ background: '#fff', color: 'red', border: '1px solid #d32f2f' }}
                      >
                        <span className="login-btn-text" style={{ color: 'red' }}>Deletar</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TasksList;
