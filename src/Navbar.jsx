import React, { Component } from 'react';


class Navbar extends Component {
    render() {
      return (
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className = "usercount">
          <p>{this.props.onlineUsers} user(s) online</p>
        </div>
        </nav>
      )
    }
  }
  export default Navbar;

