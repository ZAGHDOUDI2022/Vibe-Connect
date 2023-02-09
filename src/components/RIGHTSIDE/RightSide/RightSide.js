import React, { useState } from 'react'
import './RightSide.css'
import home222 from "../../../img/home222.png";
import Noti from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import TrendCard from '../TrendCard/TrendCard';
import ShareModal from '../../ShareModal/ShareModal';
import { Link } from 'react-router-dom';


function RightSide() {
    const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link to='../home'>
        <img src={home222} alt="" />
        </Link>
        <UilSetting />
        <img src={Noti} alt="" />
        <img src={Comment} alt="" />
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
