const API_URL = 'http://localhost:8080/tasks'

export const getAllTasks = async () => {
    const response = await fetch(API_URL);

    if(!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
};

export const createTaskService = async (taskTitle, taskDescription) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        // Send a JSON object string matching the DTO structure
        body: JSON.stringify({ title: taskTitle, description: taskDescription }),
    });

    if(!response.ok) {
        throw new Error('Failed to create task');
    }

    return await response.json(); // Return the created task (with the new ID)
}

export const deleteTaskService = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
    });

    if(!response.ok) {
        throw new Error('Failed to delete task');
    }

    // Don't return .json() because the API don't return response in this method
    return true;
}

export const updateTaskService = async (id, task) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  });

  if (!response.ok) {
    throw new Error('Failed to update task');
  }

  return await response.json();
};