import { REACT_APP_API_URL } from '@env';

const BASE_URL = REACT_APP_API_URL;
const handleResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.detail || response.statusText);
  }
  return response.json();
};

export const register = (data) =>
  fetch(`${BASE_URL}/auth/users/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(handleResponse);

// export const login = (credentials) =>
//   fetch(`${BASE_URL}/auth/jwt/create/`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(credentials),
//   }).then(handleResponse);

export const login = async (email, password) => {
    try{
        const response = await fetch(`${BASE_URL}/auth/jwt/create/`, {
            method: 'POST',
            headers: { 
                Accept: 'application/json',
                'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        if (!response.ok) {
            throw new Error('Login failed: ' + response.statusText);
        }
        
        return await response.json();
        } catch (error) {
        console.error('Login error:', error);
        throw error;
        }

    }

export const getCurrentUser = (token) =>
  fetch(`${BASE_URL}/auth/users/me/`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then(handleResponse);

export const updateCurrentUser = (token, data) =>
  fetch(`${BASE_URL}/auth/users/me/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).then(handleResponse);
