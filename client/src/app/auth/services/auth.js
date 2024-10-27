// services/auth.js
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://www.desawisatatanjung.com/in';

export const login = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    localStorage.setItem('adminToken', data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    await fetch(`${API_URL}/auth/logout`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    localStorage.removeItem('adminToken');
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('adminToken');
};

export const isAuthenticated = () => {
  return !!getAuthToken();
};

export const setupAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};