import axios from 'axios'


const API = axios.create({ baseURL: 'http://localhost:5100' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

export const getTimelinePosts= (id)=> API.get(`/api/post/${id}/timeline`);
export const likePost=(id, userId)=>API.put(`/api/post/${id}/like`, {userId: userId})
export const commentPost = (id, comment) =>API.post(`/api/post/${id}/comment`, comment);

const API_URL = 'http://localhost:5100/api/post';

export const deletePost = async (postId, userId) => {
  const response = await axios.delete(`${API_URL}/${postId}`, { data: { userId } });
  return response;
};
export const updatePost = async (postId, userId, data) => {
  const response = await axios.put(`${API_URL}/${postId}`, { userId, ...data });
  return response.data;
};

export const updatePostt = async (postId, userId, data) => {
  const response = await axios.put(`${API_URL}/${postId}`, {
    userId,
    ...data,
  });
  return response;
};
export const editComment = async (postId, commentId, text) => {
  try {
    const res = await axios.put(`${API_URL}/${postId}/comment`, { commentId, text });
    return res.data;
  } catch (err) {
    throw err.response.data;
  }
};


export const deleteComment = async (postId, commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${postId}/comment`, {
      data: { commentId },
    });
    console.log(response.data); // 'Comment deleted'
    // vous pouvez également mettre à jour l'état ici si nécessaire
  } catch (error) {
    console.error(error);
    // gérer les erreurs ici
  }
};
