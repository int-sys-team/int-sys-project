import { API_URL, AI_API_URL } from '../utils/config'

export const register = async (firstName: string, lastName: string, email: string, password: string) => {
    // TODO remove this from API too
    const username = email;
    const role = 'User';
    const user = JSON.stringify({ firstName,lastName, username, email, password, role })

    const response = await fetch(`${API_URL}/api/Client/Register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // TODO: this will probably break later
            'Origin': 'http://localhost:5173',
        },
        body: user
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response from server:', errorData);
        throw new Error(errorData);
    }

    const data = await response.json();
    return data;
}

export const login = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/api/Client/Login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173',
      },
      body: JSON.stringify({ email, password }),
    });
 
    if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response from server:', errorData);
        throw new Error(errorData);
    }

    const data = await response.json();
    return data;
}
