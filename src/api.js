import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000"; // Backend URL

// Upload Document API
export const uploadDocument = async (formData) => {
  const response = await axios.post(`${BASE_URL}/documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Query Documents API
export const queryDocuments = async (question) => {
  const response = await axios.post(`${BASE_URL}/queries/query`, { question });
  return response.data;
};

// Search Documents API
export const searchDocuments = async (query) => {
  const response = await axios.get(`${BASE_URL}/queries/search`, {
    params: { query },
  });
  return response.data;
};