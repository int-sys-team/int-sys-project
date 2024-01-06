import { API_URL, AI_API_URL } from '../utils/config'

export const getWishlist = async (userToken: string) => {
    const response = await fetch(
        `${API_URL}/api/Client/GetWishes`,
        {
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

export const addToWishlist = async (propertyId: string, userToken: string) => {
    try {
        const response = await fetch(
            `${API_URL}/api/Client/AddWish/${propertyId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        if (!response.ok) {
            console.log(response);
            return;
        }
        const data = await response.json();
        return data
    } catch (e) {
        console.log(e);
    }
};

export const removeFromWishlist = async (propertyId: string, userToken: string) => {
    try {
        const response = await fetch(
            `${API_URL}/api/Client/RemoveWish/${propertyId}`,
            {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            }
        );
        if (!response.ok) {
            console.log(response);
            return;
        }
        const data = await response.json();
        return data
    } catch (e) {
        console.log(e);
    }
}
