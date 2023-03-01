import React, { useState, useRef } from "react";
import "./PostShare.css";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadImage, uploadPost } from "../../../Redux/actions/UploadAction";
import Billgzt from "../../../img/profile.png"
import { getPosts } from "../../../Redux/actions/PostsAction";

const PostShare = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const loading = useSelector((state) => state.postReducer.uploading);
  const [image, setImage] = useState(null);
  const desc = useRef();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const [postId, setPostId] = useState(null);
  const { posts } = useSelector(state => state.postReducer) || [];
  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };
 
  const imageRef = useRef();

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();
  
    //post data
    const newPost = {
      userId: user._id,
      desc: desc.current.value,
    };
  
    // if there is an image with post
    if (image) {
      try {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'zaghdoudi');
        const response = await fetch(
          'https://api.cloudinary.com/v1_1/dcrefqy2y/image/upload',
          {
            method: 'POST',
            body: formData,
          }
        );
        const data = await response.json();
        newPost.image = data.secure_url;
        console.log(newPost.image)
        console.log(newPost)
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(uploadPost(newPost));
    console.log(newPost)
    resetShare();
  };
  

  

  // Reset Post Share
  const resetShare = () => {
    setImage(null);
    desc.current.value = "";
  };
  return (
    <div className="PostShare">
   {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt="profilePicture"
          />
        ) : (
          <img
          src={Billgzt}
          alt="profilePicture"
        />
        )}
     
     
      <div>
        <input
          type="text"
          placeholder="What's happening?"
          required
          ref={desc}
        />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photo
          </div>

         
          <button
            className="button ps-button"
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "uploading" : "Share"}
          </button>

          <div style={{ display: "none" }}>
            <input type="file" ref={imageRef} onChange={onImageChange} />
          </div>
        </div>

        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={user.image} alt="preview" />
          </div>
        )}
     
        
      </div>
    </div>
  );
};

export default PostShare;