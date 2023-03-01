import * as PostsApi from "../api/PostsRequests";
import * as types from "../Types/Type";
import {GET_ALL_POST, URI ,GET_ERR} from '../Types/Type';
import axios from 'axios';
import { DELETE_POST_SUCCESS, DELETE_POST_FAILURE } from '../Types/Type';
import { deletePost } from '../api/PostsRequests';
import {
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAILURE
} from '../Types/Type';
import { deleteComment } from '../api/PostsRequests';

import { UPDATE_POST } from '../Types/Type';
import { updatePost } from '../api/PostsRequests';
import { ADD_COMMENT } from "../Types/Type";
import { EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAIL } from '../Types/Type';
import { editComment } from '../api/PostsRequests';
import { DELETE_COMMENT } from '../Types/Type';

export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });
  try {
    const { data } = await PostsApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", data: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};

export const editCommentAction = (postId, commentId, text) => async (dispatch) => {
  try {
    const data = await editComment(postId, commentId, text);
    dispatch({ type: EDIT_COMMENT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({ type: EDIT_COMMENT_FAIL, payload: err });
  }
};

export const getPosts = () => async dispatch => {
  try {
      const res = await axios.get('http://localhost:5100/api/post/')
      const uri = res.data.path
      console.log('all', res.data);
      console.log('image',uri.data.path);

      dispatch({
          type: GET_ALL_POST,
          payload: res.data.posts,
      })
      dispatch({
          type:URI,
          payload: res.data.path
      })
  } catch (err)  {
      dispatch({
          type: GET_ERR,
      })
  }
}



export const creatPosts = () => async dispatch => {
  try {
      const res = await axios.post('http://localhost:5100/api/post/create')
      
  } catch (err)  {
      dispatch({
          type: GET_ERR,
      })
  }
}





// postActions.js



export const deletePostSuccess = (message) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: message
  };
};

export const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE,
    payload: error
  };
};

export const deletePostRequest = (postId, userId) => {
  return async (dispatch) => {
    try {
      const response = await deletePost(postId, userId);
      dispatch(deletePostSuccess(response.data));
    } catch (error) {
      dispatch(deletePostFailure(error));
    }
  };
};


export const updatePostAction = (postId, userId, data) => async (dispatch) => {
  const updatedPost = await updatePost(postId, userId, data);
  dispatch({ type: UPDATE_POST, payload: updatedPost });
};



export const updatePostRequest = () => ({
  type: types.UPDATE_POST_REQUEST,
});

export const updatePostSuccess = (data) => ({
  type: types.UPDATE_POST_SUCCESS,
  payload: data,
});

export const updatePostFailure = (error) => ({
  type: types.UPDATE_POST_FAILURE,
  payload: error,
});

export const updatePostt = (postId, userId, data) => async (dispatch) => {
  dispatch(updatePostRequest());
  try {
    const response = await PostsApi.updatePostt(postId, userId, data);
    dispatch(updatePostSuccess(response.data));
  } catch (error) {
    dispatch(updatePostFailure(error));
  }
};

export const addComment = (id, comment,commenterId) => async (dispatch) => {
  try {
    const { data } = await PostsApi.commentPost(id, comment,commenterId);
    dispatch({ type: ADD_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCommentt = (postId, commentId) => async (dispatch) => {
  try {
    const data = await PostsApi.deleteComment(postId, commentId);
    dispatch({ type: DELETE_COMMENT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
