import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5100" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const getUser = (userId) => API.get(`/api/user/${userId}`);
export const updateUser = (id, formData) =>  API.put(`/api/user/${id}`, formData);
export const getAllUser = ()=> API.get('/api/user')
export const followUser = (id,data)=> API.put(`/api/user/${id}/follow`, data)
export const unfollowUser = (id, data)=> API.put(`/api/user/${id}/unfollow`, data)
export const deleteUser = (id, currentUserInfo) => API.delete(`/api/user/${id}`, { data: currentUserInfo });

const API_URL = 'http://localhost:5100/api/user';
export const deleteUserr = async (id, currentUserAdminStatus, token) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, {
      data: {
        currentUserId: id,
        currentUserAdminStatus: currentUserAdminStatus
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
