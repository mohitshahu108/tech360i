import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import logo from "./logo.png";

class Header extends Component {
  render() {
    return (
      <div>
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="Tech360.com" />
          </div>
        </Link>
      </div>
    );
  }
}

export default Header;
