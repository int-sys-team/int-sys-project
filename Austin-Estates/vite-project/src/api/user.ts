import { API_URL, AI_API_URL } from '../utils/config'

export const getAllUsers = async (userToken: string) => {
    const response = await fetch(
        `${API_URL}/api/Client/GetAllClients`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const getUser = async (id: string, userToken: string) => {
    const response = await fetch(
        `${API_URL}/api/Client/GetClientById/${id}`, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        }
    );
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
