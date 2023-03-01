import React, { useEffect, useState } from 'react';
import './LogoSearch.css';
import { UilSearch } from '@iconscout/react-unicons';
import logo234 from "../../../img/logo234.png";
import welcome from "../../../img/welcome.webp"
import { useSelector } from 'react-redux';
import { getAllUser } from '../../../Redux/api/UserRequests';

function LogoSearch() {
  
  return (
    <div className='LogoSearch'>
     <img src={logo234} alt=""/>
     
    </div>
  )
}

export default LogoSearch;
