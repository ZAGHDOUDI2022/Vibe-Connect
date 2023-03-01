import { Modal, useMantineTheme } from "@mantine/core";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateUser } from "../../../Redux/actions/UserAction";
import { Image } from 'cloudinary-react';
import axios from "axios";
function ProfileModal({ modalOpened, setModalOpened,data }) {
  const theme = useMantineTheme();
  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();
  const [file,setFile] = useState([])


  const { user } = useSelector((state) => state.authReducer.authData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // function to upload images to Cloudinary
   // function to upload images to Cloudinary
   const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "zaghdoudi"); // replace with your upload preset name
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/dcrefqy2y/image/upload`,
      formData
    );
    return res.data.url;
  };

  // function to handle file uploads
  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    const imageUrl = await uploadImage(uploadedFile);
    setFormData({ ...formData, [e.target.name]: imageUrl });
  };

   // form submission
   const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <div>
        <h3>Your Info</h3>
        <form onSubmit={handleSubmit} className="infoForm">
        <div>
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInput"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.livesIn}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesIn"
            className="infoInput"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInput"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInput"
            placeholder="Relationship status"
            name="relationship"
          />
        </div>

        <div>
        Profile image
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileUpload}
            />
            {formData.profilePicture && (
              <Image
                cloudName="dcrefqy2y"
                publicId={formData.profilePicture}
                width="50"
                crop="scale"
              />
            )}
          </div>
          <div>
            Cover image
            <input
              type="file"
              name="coverPicture"
              onChange={handleFileUpload}
            />
            {formData.coverPicture && (
              <Image
                cloudName="dcrefqy2y"
                publicId={formData.coverPicture}
                width="50"
                crop="scale"
              />
            )}
          </div>
          <button className="button infoButton" type="submit">
            Update
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default ProfileModal
