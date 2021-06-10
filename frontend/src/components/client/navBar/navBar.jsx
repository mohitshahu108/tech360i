import React from "react";
import "./navBar.css";

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { signout } from "../../../redux/actions/userActions";

export default function NavBar() {
  function sidenavHandler() {
    let sidenav = document.getElementById("sidenav");
    if (sidenav.classList.contains("open")) {
      sidenav.classList.remove("open");
    } else {
      sidenav.classList.add("open");
    }
  }

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const singoutHandler = () => {
    dispatch(signout());
  };

  return (
    <div>
      <div className="navBar">
        <div className="hamberger" onClick={sidenavHandler}>
          <div className="line1"></div>
          <div className="line2"></div>
          <div className="line3"></div>
        </div>
        <div className="nav">
          <div className="leftnav">
            <ul>
              <Link to="/">
                <li>Home</li>
              </Link>
              <Link to="/products">
                <li>Products</li>
              </Link>
            </ul>
          </div>
          <div className="rightnav">
            <ul>
              <Link to="/cart">
                <li>
                  Cart
                  {cartItems.length > 0 && (
                    <span className="badge">{cartItems.length}</span>
                  )}
                </li>
              </Link>
              {userInfo ? (
                <div>
                  <li>{userInfo.firstName}</li>
                  <Link to="#signout" onClick={singoutHandler}>
                    <li>Sign Out</li>
                  </Link>
                </div>
              ) : (
                <Link to="/signin">
                  <li>Sign In</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </div>
      <div id="sidenav" className="sidenav">
        <ul className="navlinks">
          <Link to="/" onClick={sidenavHandler}>
            <li>Home</li>
          </Link>
          <Link to="/products" onClick={sidenavHandler}>
            <li>Products</li>
          </Link>
          <Link to="/cart" onClick={sidenavHandler}>
            <li>
              <ShoppingCartIcon />
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>
              )}
            </li>
          </Link>
          <Link to="/signin" onClick={sidenavHandler}>
            <li>
              {userInfo ? (
                <div>
                  <li>{userInfo.firstName}</li>
                  <Link to="#signout" onClick={singoutHandler}>
                    <li>Sign Out</li>
                  </Link>
                </div>
              ) : (
                <Link to="/signin">
                  <li>
                    <AccountBoxIcon />
                  </li>
                </Link>
              )}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
