import React, { useEffect, useState } from 'react'
import "./InfoCard.css";
import { UilPen } from "@iconscout/react-unicons";
import ProfileModal from "../ProfileModal/ProfileModal";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserApi from "../../../Redux/api/UserRequests";
import { logout } from '../../../Redux/actions/AuthActions';
import { deleteCurrentUser } from '../../../Redux/actions/UserAction';
import axios from 'axios';

function InfoCard() {

  const dispatch = useDispatch()
  const params = useParams();
  const [modalOpened, setModalOpened] = useState(false);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);
  const { token } = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const [isDeleted, setIsDeleted] = useState(false);


  const handleDeletee = async () => {
    const confirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?');
    if (confirmed) {
      try {
        const response = await axios.delete(`/api/user/${user._id}`, {
          data: { currentUserId: user._id, currentUserAdminStatus: user.isAdmin },
        });
        console.log(response.data); // Affiche "User deleted successfully"
        setIsDeleted(true);
        // TODO: Mettre à jour l'état du composant ou rediriger vers une autre page
       /* localStorage.removeItem(token);
        navigate('/auth');*/
      } catch (error) {
        console.error(error.response.data);
        // TODO: Gérer les erreurs
      }
    }
  };

  const handleLogOut = ()=> {
    dispatch(logout())
  }


  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching")
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div className="infoHead">
        <h4>Profile Info</h4>
        {user._id === profileUserId ? (
          <div>
            <UilPen
              width="2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <ProfileModal
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data = {user}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="info">
        {/* */}
        <span>
          <b>Status </b>
        </span>
        <span>{profileUser.relationship}</span>
      </div>
      <div className="info">
        <span>
          <b>Lives in </b>
        </span>
        <span>{profileUser.livesIn}</span>
      </div>
      <div className="info">
        <span>
          <b>Works at </b>
        </span>
        <span>{profileUser.worksAt}</span>
      </div>
      
      <button className="button logout-buttonn" onClick={handleLogOut}>Log Out</button>
      <button className="button logout-button" onClick={handleDeletee}>Delete Account</button>
      {isDeleted && <p className='dele'>your account is deleted please click you log out</p>}
    </div>
  );
};

export default InfoCard;

