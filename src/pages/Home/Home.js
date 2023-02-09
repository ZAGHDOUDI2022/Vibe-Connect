import React from 'react'
import './Home.css'
import ProfileSide from '../../components/POST_SLIDE/ProfileSide/ProfileSide';
import PostSide from '../../components/POST_SIDE/PostSide/PostSide';
import RightSide from '../../components/RIGHTSIDE/RightSide/RightSide';

function Home() {
  return (
    <div className='Home'>
      <ProfileSide/>
     <PostSide/>
      <RightSide/>
    </div>
  )
}

export default Home
