import React, { Component } from "react";
import "./Header.css";
import logo from "./logo.svg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class Header extends Component {
  render() {
    return (
      <header>
        <Link to="/">
          <img src={logo} alt="logo" />
          k-music
        </Link>
      </header>
    );
  }
}

export default Header;
