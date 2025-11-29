const API_URL = "http://localhost:8080";

export const loginService = async (username, password) => {
    const formData = new URLSearchParams();
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formData,
        credentials: 'include' // Important to include cookies in the request
    });
    
    if (!response.ok) {
        throw new Error('Login failed');
    }

    return true;
;}
