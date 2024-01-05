import { API_URL, AI_API_URL } from '../utils/config'

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
