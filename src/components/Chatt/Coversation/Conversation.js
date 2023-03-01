import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../../../Redux/api/UserRequests'
import aaa from '../../../img/profile.png'

function Conversation({ data, currentUser,online}) {
    const [userData, setUserData] = useState(null)
    const dispatch = useDispatch()

    useEffect(()=> {

        const userId = data.members.find((id)=>id!==currentUser)
        console.log(userId)
        const getUserData = async ()=> {
          try
          {
              const {data} =await getUser(userId)
             setUserData(data)
             
          }
          catch(error)
          {
            console.log(error)
          }
        }
    
        getUserData();
      }, [])
  return (
    <>
      <div className="follower conversation">
        <div>
        {online && <div className="online-dot"></div>}
          
        <img
                  src={
                    userData?.profilePicture
                      ? userData.profilePicture
                      : aaa
                  }
                  alt={userData?.firstname}
                  className="followerImage"
                  style={{ width: "50px", height: "50px" }}
                />
          <div className="name" style={{fontSize: '0.8rem'}}>
            <span>{userData?.firstname} {userData?.lastname}</span>
            <span style={{color: online?"#51e200":""}}>{online? "Online" : "Offline"}</span>
          </div>
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  )
}

export default Conversation