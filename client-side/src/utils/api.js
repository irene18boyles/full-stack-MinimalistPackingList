const API_URL = 'http://localhost:8000/api';

const headers = (token) => ({
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : '',
});

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const register = async (email, username, password) => {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: headers(),
            body: JSON.stringify({ email, username, password})
        });
        if (!response.ok) {
            throw new Error('Error registering user')
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message)
    }
};

export const getTrips = async (token) => {
    try {
        const response = await fetch(`${API_URL}/trips`, {
            method: 'GET',
            headers: headers(token),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch trips')
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message)
    }
};

export const addItemToTrip = async (tripId, itemData, token) => {
    try {
        const response = await fetch(`${API_URL}/trips${tripId}/items`, {
            method: 'POST',
            headers: headers(token),
            body: JSON.stringify(itemData),
        });
        if (!response.ok) {
            throw new Error('Failed to add item');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message)
    }
};