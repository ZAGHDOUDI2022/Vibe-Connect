import React from 'react'
import LogoSearch from '../../POST_SLIDE/LogoSearch/LogoSearch'
import FollowersCard from '../../POST_SLIDE/FollowersCard/FollowersCard'
import InfoCard from '../InfoCard/InfoCard'
import './ProfileLeft.css'

function ProfileLeft() {
  return (
    <div className='ProfileSide'>
      <LogoSearch/>
      <InfoCard/>
      <FollowersCard/>
    </div>
  )
}

export default ProfileLeft
