import React, { useState } from 'react'
import './RightSide.css'
import home222 from "../../../img/home222.png";
import Noti from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../../ShareModal/ShareModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function RightSide() {
    const [modalOpened, setModalOpened] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to='../home'>
        <img src={home222} alt="" />
        </Link>
        <div className='welcome'><span>Welcome to the VibeConnect<br/></span> <span className='dd'> {user.firstname}_{user.lastname}</span></div>
       
        <Link to = '../chat'>
        <img src={Comment} alt="" />
        </Link>
      </div>
      
      <TrendCard/>
      <button className='button r-button' onClick={() => setModalOpened(true)}>
          Share
      </button>
      <ShareModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
    </div>
  )
}

export default RightSide
