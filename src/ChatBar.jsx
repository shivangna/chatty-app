    
import React, { Component } from 'react';


class ChatBar extends Component {
    render() {

      return (
        <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" onKeyDown = {this.props.handleUsernameChange} defaultValue ={this.props.currentUser.name}/>
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyDown = {this.props.handleSubmitOnEnter} />
      </footer>
      );
    }
  }
  export default ChatBar;


