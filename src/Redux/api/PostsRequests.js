import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5100' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`api/post/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`api/post/${id}/like`, {userId: userId})