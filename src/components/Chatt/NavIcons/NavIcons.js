import React from 'react'
import Home from "../../../img/home.png";
import Noti from "../../../img/noti.png";
import Comment from "../../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

function NavIcons() {
  return (
    <div>
       <div className="navIcons">
      <Link to="../home">
        <img src={Home} alt="" style={{ width: "24px",height:"24px", alignSelf: "flex-end" }}/>
      </Link>
      <UilSetting />
      <img src={Noti} alt="" />
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
    </div>
  )
}

export default NavIcons
