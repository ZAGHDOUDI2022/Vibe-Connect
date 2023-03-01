import { DELETE_POST_SUCCESS, DELETE_POST_FAILURE } from '../Types/Type';
import { EDIT_COMMENT_SUCCESS, EDIT_COMMENT_FAIL } from '../Types/Type';
import { DELETE_COMMENT } from '../Types/Type';
import {
  POST_UPDATE_REQUEST,
  POST_UPDATE_SUCCESS,
  POST_UPDATE_FAILURE
} from '../Types/Type';
import { UPDATE_POST } from '../Types/Type';
import * as types from "../Types/Type";
import { ADD_COMMENT } from "../Types/Type";
const postReducer = (
  state = { posts: null, loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    // belongs to PostShare.jsx
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true };
    case "UPLOAD_SUCCESS":
      return { ...state, posts: [action.data, ...state.posts], uploading: false, error: false };
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true };
    // belongs to Posts.jsx
    case "RETREIVING_START":
      return { ...state, loading: true, error: false };
    case "RETREIVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false };
    case "RETREIVING_FAIL":
      return { ...state, loading: false, error: true };
      case DELETE_POST_SUCCESS:
        return {
          ...state,
          message: action.payload,
          error: null
        };
      case DELETE_POST_FAILURE:
        return {
          ...state,
          message: '',
          error: action.payload
        };
        case POST_UPDATE_REQUEST:
      return { loading: true };
    case POST_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case POST_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
      case UPDATE_POST:
      const updatedPost = action.payload;
      const updatedPosts = state.posts.map((post) =>
        post.id === updatedPost.id ? updatedPost : post
      );
      return {
        ...state,
        posts: updatedPosts,
      };
      case types.UPDATE_POST_REQUEST:
        return { loading: true };
      case types.UPDATE_POST_SUCCESS:
        return { loading: false, post: action.payload };
      case types.UPDATE_POST_FAILURE:
        return { loading: false, error: action.payload };
        case ADD_COMMENT:
          return {
          ...state,
          posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
          ),
          };
          case EDIT_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        error: null,
      };
    case EDIT_COMMENT_FAIL:
      return {
        ...state,
        comment: null,
        error: action.payload,
      };
      case DELETE_COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.postId
            ? { ...post, comments: post.comments.filter((comment) => comment._id !== action.payload.commentId) }
            : post
        ),
      };
      default:
      return state;
  }
};

export default postReducer;
