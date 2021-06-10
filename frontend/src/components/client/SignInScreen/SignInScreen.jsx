import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signin } from "../../../redux/actions/userActions";
import "./SignInScreen.css";

import LoadingBox from '../Effects/LoadingBox'
import MessageBox from '../Effects/MessageBox'

export default function SignInScreen(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;



  const dispatch = useDispatch();
  const submitHandler = (e) => { 
    e.preventDefault();
    dispatch(signin(email, password));
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect ]);

  return (
    <div>
      <div className="signin-page">
        <div className="card">
          <form className="form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="Email">Email:</label>
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your Email..."
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="Password">Password:</label>
              <div>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password..."
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit">Sign In</button>
            </div>
            {loading && <LoadingBox></LoadingBox> }
            { error && <MessageBox varient="danger">{error}</MessageBox> }
            <div>
              New user? <Link to={`/register?redirect=${redirect}`} > Create Account</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
