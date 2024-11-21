import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:8000";

// Upload Document API
export const uploadDocument = async (formData) => {
  const response = await axios.post(`${BASE_URL}/documents/upload`, formData, {
    headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${Cookies.get('access_token')}`,}
  });
  return response.data;
};

// Query Documents API
export const queryDocuments = async (question) => {
  const response = await axios.post(`${BASE_URL}/queries/query`, { question },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
      },
    }
  );
  return response.data;
};

// Search Documents API
export const searchDocuments = async (query) => {
  const response = await axios.get(`${BASE_URL}/queries/search`, {
    params: { query },
    headers: {
      Authorization: `Bearer ${Cookies.get('access_token')}`,
    },
  });
  return response.data;
};