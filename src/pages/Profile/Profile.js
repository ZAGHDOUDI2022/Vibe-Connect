import React from 'react'
import PostSide from '../../components/POST_SIDE/PostSide/PostSide'
import ProfileLeft from '../../components/PROFILE/ProfileLeft/ProfileLeft'
import ProfileCard from '../../components/POST_SLIDE/ProfileCard/ProfileCard'
import RightSide from '../../components/RIGHTSIDE/RightSide/RightSide'

import './Profile.css'

function Profile() {
  return (
    <div className="Profile">
     <ProfileLeft/>
     <div className="Profile-center">
        <ProfileCard location = 'profilePage'/>
      <PostSide/>
        </div>

    <RightSide/>
    </div>
  )
}

export default Profile
