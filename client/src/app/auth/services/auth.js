const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://test-desa-wisata-tanjung.vercel.app/in';


// Fungsi untuk mengambil token dari localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('adminToken');
  }
  return null;
};

// Fungsi untuk mengecek apakah user sudah login
export const isAuthenticated = () => {
  const token = getToken();
  return !!token;
};

// Fungsi login
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
    
    // Simpan token ke localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', data.token);
    }
    
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('adminToken');
    window.location.href = '/auth/login';
  }
};

export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
};