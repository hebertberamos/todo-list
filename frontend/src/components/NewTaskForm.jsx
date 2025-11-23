import { useState } from "react";

const NewTaskForm = ({ onTaskCreated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) return; // Don't submite because title can't be null.

    onTaskCreated(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="task-form-container">
      <h1>New task</h1>
      <div className="task-form">
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Título..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "8px", margin: "10px" }}
          />
          <input
            type="text"
            placeholder="Descrição..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "8px", margin: "10px" }}
          />
          <button type="submite">Salvar</button>
        </form>
      </div>
    </div>
  );
};

export default NewTaskForm;
