import React, { Component } from "react";
import "./Header.css";
import logo from "./logo.svg";

class Header extends Component {
  render() {
    return (
      <header>
        <img src={logo} alt="logo" />
        k-music
      </header>
    );
  }
}

export default Header;
