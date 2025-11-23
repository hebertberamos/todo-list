import { useState, useEffect } from 'react';
import { createTaskService, getAllTasks } from '../services/TaskService';
import NewTaskForm from './NewTaskForm';

const TasksList = () => {

  // 1. STATE: Think of these as your temporary database for the UI
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. EFFECT: This runs when the component "mounts" (loads for the first time)
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getAllTasks();
        setTasks(data) // Update state with data
      } catch (err) {
        setError(err.message); // Capture error
      } finally {
        setIsLoading(false); // Stop loading spinner regardless of outcome
      }
    };

    fetchTasks();
  }, []); // The empty array [] ensures this runs only once on mount

  const handleAddTask = async (newTitle, newDescription) => {
    try{
      //Send request to back-end to save new task
      const newTask = await createTaskService(newTitle, newDescription);

      // Update State
      setTasks([...tasks, newTask]);

    } catch(err) {
      setError('Failed to add task');
    }
  };

  // 3. RENDER: The UI logic based on the state
  if (isLoading) return <p>Loading tasks...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

  return (
    <div className='tasks-main-container'>
      <h2>Task List</h2>

      <NewTaskForm onTaskCreated={handleAddTask} />

      <ul >
        {tasks.map((task) => (
          // React needs a unique 'key' for lists to optimize rendering
          <div className="task-card" key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TasksList