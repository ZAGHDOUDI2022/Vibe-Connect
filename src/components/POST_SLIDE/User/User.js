import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { followUser, unfollowUser } from '../../../Redux/actions/UserAction';
import Audrey from '../../../img/profile.png'
function User({ person }) {
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData);
    const dispatch = useDispatch()
    
    const [following, setFollowing] = useState(
      person.followers.includes(user._id)
    );
    const handleFollow = () => {
      following
        ? dispatch(unfollowUser(person._id, user))
        : dispatch(followUser(person._id, user));
      setFollowing((prev) => !prev);
    };
    return (
      <div className="follower">
        <div>
          
 
           {person.profilePicture ? (
          <img
            src={person.profilePicture}
            alt="profilePicture"
            className="followerImage"
          />
        ) : (
          <img
          src={Audrey}
          alt="profilePicture"
          className="followerImage"
        />
        )}
          <div className="name">
            <span>{person.firstname} </span>
            <span>{person.username}</span>
          </div>
        </div>
        <button
          className={
            following ? "button fc-button UnfollowButton" : "button fc-button"
          }
          onClick={handleFollow}
        >
          {following ? "Unfollow" : "Follow"}
        </button>
      </div>
    );
  };
  
  export default User;