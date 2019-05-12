import React, { Component } from 'react';


class Message extends Component {
    render() {
      const divStyle = {
        color: `rgb(${this.props.userColor})`
      };
      return (
        <div className="message">
        <span className="message-username" style={divStyle}> {this.props.messageUsername} </span>
        <span className="message-content"> {this.props.messageContent} </span>
      </div>

      );
    }
  }
  export default Message;



