import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:5100' });

export const userChats = (id) => API.get(`/api/chat/${id}`);