import React, { useState } from 'react'
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";

function InfoCard() {

    const [modalOpened, setModalOpened] = useState(false);
    return (
    <div className='InfoCard'>
      <div className="infoHead">
        <h4>Your Info</h4>
        <div>
          <UilPen
            width="2rem"
            height="1.2rem"
            onClick={() => setModalOpened(true)}
          />
          <ProfileModal
            modalOpened={modalOpened}
            setModalOpened={setModalOpened}
          />
        </div>
      </div>

    
    
      <div className="info">
        <span>
          <b>Status </b>
        </span>
        <span>Success usually comes after a lot of trial and error and a lot of failures</span>
      </div>

      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>Medina, Washington</span>
      </div>

      <div className="info">
        <span>
          <b>Works  </b>
        </span>
        <span>Founded the software company Microsoft Corporation</span>
      </div>

      <button className="button logout-button">Logout</button>


    </div>
  )
}

export default InfoCard
