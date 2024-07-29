import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; // Update with your Django server URL

// Get authorization headers
const getAuthHeaders = () => ({
  headers: {
    'Authorization': `Token ${localStorage.getItem('35190f78d885ba930075b0d22cbd8002e8663d33')}`, // Use the stored token
  }
});

// Fetch categories
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/categories/`, getAuthHeaders());
  return response.data;
};

// Create a category
export const createCategory = async (name) => {
  const response = await axios.post(`${API_URL}/categories/`, { name }, getAuthHeaders());
  return response.data;
};

// Fetch incomes
export const fetchIncomes = async () => {
  const response = await axios.get(`${API_URL}/incomes/`, getAuthHeaders());
  return response.data;
};

// Create an income
export const createIncome = async (amount, description, date) => {
  const response = await axios.post(`${API_URL}/incomes/`, { amount, description, date }, getAuthHeaders());
  return response.data;
};

// Fetch expenses
export const fetchExpenses = async () => {
  const response = await axios.get(`${API_URL}/expenses/`, getAuthHeaders());
  return response.data;
};

// Create an expense
export const createExpense = async (category, amount, description, date) => {
  const response = await axios.post(`${API_URL}/expenses/`, { category, amount, description, date }, getAuthHeaders());
  return response.data;
};
export const loginUser = async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login/`, { username, password });
      return response; // Ensure this matches your response structure
    } catch (error) {
      console.error('API request failed', error);
      throw error; // Re-throw the error to handle it in the component
    }
  };
