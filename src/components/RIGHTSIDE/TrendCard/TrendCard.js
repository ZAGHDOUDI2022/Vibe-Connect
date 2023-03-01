import React from 'react'
import './TrendCard.css'
import {TrendData} from '../../../Data/TrendData.js'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../Redux/api/UserRequests';

import { deleteCurrentUser } from '../../../Redux/actions/UserAction';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TrendCard() {






   
   
  
  return (
    
    <div className="TrendCard">
     
    <h3>Trends for you</h3>
    

    <div>
    <div>

</div>
    </div>
   
    {TrendData.map((trend)=>{
        return(
            <div className="trend">
                <span>#{trend.name}</span>
                <span>{trend.shares}k shares</span>
            </div>
        )
    })}

</div>
  )
}

export default TrendCard
