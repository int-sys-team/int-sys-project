import { API_URL, AI_API_URL } from '../utils/config'

export const getProperties = async (page: number = 0, count: number = 10) => {
    const response = await fetch(
        `${AI_API_URL}/db/properties?page=${page}&count=${count}`
    );
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};

export const getSimilarProperties = async (targetPropertyId: string) => {
    try {
        const response = await fetch(`${AI_API_URL}/similar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: targetPropertyId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.houses
    } catch (error) {
        console.error('Error fetching similar properties:', error.message);
    }
};


export const getPropertyById = async (id: string) => {
    const response = await fetch(
        `${API_URL}/api/Property/GetPropertyById/${id}`
    );
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
};
