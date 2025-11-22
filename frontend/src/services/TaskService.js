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