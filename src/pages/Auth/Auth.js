import React, { useState } from 'react'
import './Auth.css'
import logo234 from "../../img/logo234.png";
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../Redux/actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import { getAllUser } from '../../Redux/api/UserRequests';

function Auth() {

  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };
  const loading = useSelector((state) => state.authReducer.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);

  const [data, setData] = useState(initialState);

  const [confirmPass, setConfirmPass] = useState(true);

  const [errorMessage, setErrorMessage] = useState('');

  
  // const dispatch = useDispatch()

  // Reset Form
  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
  };

  // handle Change in input
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // Form Submission
  const handleSubmit = (e) => {
    setConfirmPass(true);
    setErrorMessage('');
  
    e.preventDefault();
    
    if (isSignUp) {
      if (data.password.length < 6) {
        setErrorMessage('Password should be at least 6 characters long.');
        return;
      }
      if (!/\S+@\S+\.\S+/.test(data.username)) {
        setErrorMessage('Please enter a valid email address.');
        return;
      }
  
      data.password === data.confirmpass
        ? dispatch(signUp(data, navigate))
        : setConfirmPass(false);
          // Check if the user already exists
  getAllUser()
  .then((response) => {
    if (response.data.find((user) => user.username === data.username)) {
      setErrorMessage('User already exists');
    } else {
      // If the email is not already registered, sign up the user
      dispatch(signUp(data, navigate));
    }
  })
  .catch((error) => {
    console.log(error);
  });
     
        
    } else {
     
      getAllUser()
      .then((response) => {
        if (!response.data.find((user) => user.username === data.username)) {
          setErrorMessage('User does not exist');
        } else if (!response.data.find((user) => user.password !== data.password)) {
          setErrorMessage('Wrong password');
        } else {
          // If the user exists and the password is correct, log in the user
          dispatch(logIn(data)).then(() => navigate('/'));
        }
      })
      .catch((error) => {
        console.log(error);
      });
    }
  };
  

  return (
    <div className="Auth">
      {/* left side */}

      <div className="a-left">
        <img src={logo234} alt="" />

        <div className="Webname">
          <h1>Vibe Connect</h1>
          <h6>Explore the ideas throughout the world</h6>
        </div>
      </div>

      {/* right form side */}

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            *Confirm password is not same
          </span>
          {errorMessage && (
  <span style={{ color: 'red', fontSize: '12px' }}>{errorMessage}</span>
)}
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              {isSignUp
                ? "Already have an account Login"
                : "Don't have an account Sign up"}
            </span>
            <button
              className="button infoButton"
              type="Submit"
              disabled={loading}
            >
              {loading ? "Loading..." : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
