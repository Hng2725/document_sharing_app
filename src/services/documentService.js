import axios from 'axios';

const API_URL = 'https://api.example.com/documents';

export const getDocuments = () => axios.get(`${API_URL}`);

export const uploadDocument = (data) => axios.post(`${API_URL}/upload`, data);