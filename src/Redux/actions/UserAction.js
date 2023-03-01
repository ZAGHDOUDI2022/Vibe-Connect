import * as UserApi from "../api/UserRequests";
import { DELETE_USER } from "../Types/Type";
import { deleteUserr } from '../api/UserRequests';
import { DELETE_CURRENT_USER_SUCCESS } from "../Types/Type";
export {DELETE_CURRENT_USER_FAILED} from "../Types/Type"

export const updateUser=(id, formData)=> async(dispatch)=> {
    dispatch({type: "UPDATING_START"})
    try{
        const {data} = await UserApi.updateUser(id, formData);
        console.log("Action ko receive hoa hy ye : ",data)
        dispatch({type: "UPDATING_SUCCESS", data: data})
    }   
    catch(error){
        dispatch({type: "UPDATING_FAIL"})
    }
}


export const followUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "FOLLOW_USER", data: id})
    UserApi.followUser(id, data)
}

export const unfollowUser = (id, data)=> async(dispatch)=> {
    dispatch({type: "UNFOLLOW_USER", data: id})
    UserApi.unfollowUser(id, data)
}

export const deleteUser = (id, currentUserId, currentUserAdminStatus) => async (dispatch) => {
    try {
      // appel API pour supprimer l'utilisateur
      await UserApi.deleteUser(id, { currentUserId, currentUserAdminStatus });
      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteCurrentUser = (id, currentUserAdminStatus, token) => async (dispatch) => {
    try {
      const message = await deleteUser(id, currentUserAdminStatus, token);
      dispatch({ type: DELETE_CURRENT_USER_SUCCESS, payload: message });
    } catch (error) {
      dispatch({ type: 'DELETE_CURRENT_USER_FAILED', payload: error });
    }
  };