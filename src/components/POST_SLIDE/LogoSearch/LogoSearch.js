import React from 'react'

import './LogoSearch.css'
import { UilSearch } from '@iconscout/react-unicons'
import logo234 from "../../../img/logo234.png";

function LogoSearch() {
  return (
    <div className='LogoSearch'>
     <img src={logo234} alt="" className='imglogo'/>
      <div className="Search">
          <input type="text" placeholder="#Explore"/>
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div>
      </div>
    
  )
}

export default LogoSearch
