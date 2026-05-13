const API_URL = 'http://localhost:3000/api';

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

const handleResponse = async (res) => {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Erreur réseau' }));
    throw err;
  }
  return res.json();
};

export const api = {
  get: (path) =>
    fetch(`${API_URL}${path}`, { headers: getHeaders() }).then(handleResponse),

  post: (path, body) =>
    fetch(`${API_URL}${path}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),

  put: (path, body) =>
    fetch(`${API_URL}${path}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body),
    }).then(handleResponse),

  delete: (path) =>
    fetch(`${API_URL}${path}`, {
      method: 'DELETE',
      headers: getHeaders(),
    }).then(handleResponse),
};
