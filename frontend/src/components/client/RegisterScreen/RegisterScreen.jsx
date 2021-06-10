import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../../redux/actions/userActions";

import LoadingBox from "../Effects/LoadingBox";
import MessageBox from "../Effects/MessageBox";

export default function RegisterScreen(props) {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");

  const redirect = props.location.search
    ? props.location.search.split("=")[1]
    : "/";

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== repassword){
      alert('Password and Repassword are not match...')
    }
    else{
      dispatch(register(firstName, lastName, email, password, repassword));
    }
  };
  useEffect(() => {
    if (userInfo) {
      props.history.push(redirect);
    }
  }, [userInfo, props.history, redirect]);

  return (
    <div>
      <div className="register">
        <div className="card">
          <form className="form" onSubmit={submitHandler}>
            <div>
              <label htmlFor="firstName">FirstName:</label>
              <div>
                <input
                  type="firstName"
                  id="firstName"
                  placeholder="Enter FirstName..."
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="lastName">LastName:</label>
              <div>
                <input
                  type="lastName"
                  id="lastName"
                  placeholder="Enter LastName..."
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

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
              <label htmlFor="RePassword">RePassword:</label>
              <div>
                <input
                  type="repassword"
                  id="repassword"
                  placeholder="ReEnter your password..."
                  onChange={(e) => setRepassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
            {loading && <LoadingBox></LoadingBox>}
            {error && <MessageBox varient="danger">{error}</MessageBox>}
            <div>
              Already have Account? <Link to={`/signin?redirect=${redirect}`}>SignIn</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
