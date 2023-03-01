import React, { useState, useEffect } from 'react';
import './Post.css';
import Comment from '../../../img/comment.png';
import Share from '../../../img/share.png';
import Heart from '../../../img/like.png';
import NotLike from '../../../img/notlike.png';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, getLikes } from '../../../Redux/api/PostsRequests';
import { getUser } from '../../../Redux/api/UserRequests';
import { addCommentt, deleteCommentt, deletePostRequest } from '../../../Redux/actions/PostsAction';
import Audrey from '../../../img/profile.png'
import axios from 'axios';
import { deleteComment } from '../../../Redux/actions/PostsAction';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [userInfo, setUserInfo] = useState(null);
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  console.log(data.comments)
 const [comments, setComments] = useState(data.comments);
 
 const handleDeleteComment = async (postId, commentId) => {
  try {
    await dispatch(deleteCommentt(postId, commentId));
    // La suppression du commentaire a réussi
  } catch (error) {
    // La suppression du commentaire a échoué
    console.log(error);
  }
};

 
 
 const handleSubmit3 = async (e) => {
  e.preventDefault();
  const commenterId = user._id;
  const commenterPseudo = user.username;
  const text = comment;
  const postId = data._id;


  
  try {
    const res = await submitComment({ postId, commenterId, commenterPseudo, text });
    const newComment = res.data;
    setComment("");
    setComments([...comments, newComment]); // add new comment to local state
  } catch (error) {
    console.log(error);
  }
};
 const submitComment = async (postId, commenterId, commenterPseudo, text) => {
  try {
    const response = await axios.post(`/api/post/${postId}/comment`, {
      commenterId,
      commenterPseudo,
      text,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};
const handleSubmit2 = (event) => {
  event.preventDefault(); // empêche le rafraîchissement de la page
  dispatch(submitComment(data._id, user._id, user.firstname, comment)); // appel à la fonction submitComment avec les données nécessaires
  setComment(""); // réinitialisation de l'état de comment
  window.location.reload();
};
  const [comment, setComment] = useState("");

  

  

  const { posts } = useSelector(state => state.postReducer) || [];
  const postImage = posts.length > 0 ? posts[0].image : '';
  console.log(postImage);
  useEffect(() => {
    const fetchUser = async () => {
      const res = await getUser(data.userId);
      setUserInfo(res.data);
    };
    fetchUser();
  }, [data.userId]);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDelete = () => {
    if (data.userId === user._id) {
      dispatch(deletePostRequest(data._id, user._id));
      window.location.reload()
    }
  };

  return (
    <div className='Post'>
      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
        alt=''
      />
  
      <div>
        <span>

        {userInfo ? (
            <img
              src={userInfo.profilePicture}

              className="followerImage"
            />
          ) : <img
         
          className="followerImage"
        />}
          <b>
            {userInfo ? userInfo.firstname + ' ' + userInfo.lastname : null}
          </b>
        </span>
        <span style={{ color: 'var(--gray)', fontSize: '12px', marginLeft: '8px' }}>
          {new Date(data.createdAt).toLocaleString()}
        </span>
      </div>
      <div className='detail'>
        <span>{/*<b>{data.userId === user._id ? user.username : null}</b>*/}</span>
        <span>{data.desc}</span> <br/><br/>
        {data.image && (
          <img
            src={data.image}
            alt='preview'
            style={{ width: '670px', height: '300px' }}
          />
        )}
       {data.userId === user._id && (
  <button className='supp' onClick={() => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      handleDelete();
    }
  }}>X</button>
)}
        <br />
        <br />
      </div>
      <div className='postReact'>
        <img
          src={liked ? Heart : NotLike}
          alt=''
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />

<form onSubmit={handleSubmit2}>
          <input
          style={{width:"470px",height:"15px"}}
          placeholder='Comment...'
            type="text"
            value={comment} // lier la valeur de l'input à l'état comment
            onChange={(event) => setComment(event.target.value)} 
            className='in'// mettre à jour l'état comment lorsqu'il y a un changement dans l'input
          />
          <button className='comm' type="submit">Add Comment</button><br/>
          {/* afficher les commentaires existants */}
          {data.comments && data.comments.map((comment) => (
            <div key={comment._id}>
              {comment.commenterPseudo}: {comment.text}
            </div>
          ))}
        </form>
        
        
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>{likes} likes</span>
      
         
         
       
    
    </div>
  );
};

export default Post;
