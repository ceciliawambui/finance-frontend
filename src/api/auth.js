import axios from 'axios';

export const login = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      username,
      password,
    });
    localStorage.setItem('e09e0903b1812358fcc71d26b52ad70ed0867ed7', response.data.token);
    return response.data.token;
  } catch (error) {
    console.error('Error logging in:', error);
    return null;
  }
};

export const register = async (username, password) => {
  try {
    const response = await axios.post('http://localhost:8000/api/register/', {
      username,
      password,
    });
    return response.data.token;
  } catch (error) {
    console.error('Error registering:', error);
    return null;
  }
};
