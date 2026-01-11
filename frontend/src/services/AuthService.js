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
};

export const registerService = async (name, email, password) => { 
    const response = await fetch(`${API_URL}/auth`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        }),
        credentials: 'include' 
    });

    if (response.status !== 200 && response.status !== 201) {
        throw new Error('Falha ao tentar registrar o usuário.');
    }

    return true;
}