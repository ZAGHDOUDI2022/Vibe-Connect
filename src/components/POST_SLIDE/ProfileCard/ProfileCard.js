import React from 'react'
import microsoftbuilding from "../../../img/profile2.png";
import BillGates from "../../../img/profile.png";
import "./ProfileCard.css";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function ProfileCard({location}) {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state)=>state.postReducer.posts)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
    

{user.coverPicture ? (
          <img
            src={user.coverPicture}
            alt="coverPicture"
          />
        ) : (
          <img
          src={microsoftbuilding}
          alt="coverPicture"
        />
        )}
{user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="profilePicture"
          />
        ) : (
          <img
          src={BillGates}
          alt="profilePicture"
        />
        )}
        
      </div>
      <div className="ProfileName">
        <span>{user.firstname} {user.lastname}</span>
        <span>{user.worksAt? user.worksAt : 'Write about yourself'}</span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>{
                posts.filter((post)=>post.userId === user._id).length
                }</span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link to={`/profile/${user._id}`} style={{ textDecoration: "none", color: "inherit" }}>
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
