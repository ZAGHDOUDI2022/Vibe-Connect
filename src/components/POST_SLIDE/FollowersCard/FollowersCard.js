import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { useSelector } from "react-redux";
import { getAllUser } from "../../../Redux/api/UserRequests";
import User from "../User/User";
import FollowersModal from "../FollowersModal/FollowersModal";
import logo234 from "../../../img/logo234.png";
import { UilSearch } from '@iconscout/react-unicons';

function FollowersCard({ location }) {
  const [modalOpened, setModalOpened] = useState(false);
  const [persons, setPersons] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.firstname.toLowerCase().includes(searchTerm.toLowerCase())+
    person.lastname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="FollowersCard">
      <h3>People you may know</h3>
      
      <div className="LogoSearch">
      
      <div className="Search">
      <input
          type="text"
          placeholder="Search by username"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <div className="s-icon">
                <UilSearch/>
          </div>
      </div>
    </div>

      {filteredPersons.map((person, id) => {
        if (person._id !== user._id) return <User person={person} key={id} />;
      })}
      {!location ? (
        <span onClick={() => setModalOpened(true)}>Show more</span>
      ) : (
        ""
      )}

      <FollowersModal
        modalOpened={modalOpened}
        setModalOpened={setModalOpened}
      />
    </div>
  );
}

export default FollowersCard;
