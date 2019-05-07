import React, { Component } from 'react';

import Message from './Message.jsx';


class MessageList extends Component {
    render() {
        console.log(this.props)
      return (
        <main className="messages">
        {this.props.chatMessages.map(eachMessage => {
            return <Message messageUsername = {eachMessage.username}
                            messageContent = {eachMessage.content} 
                            key = {eachMessage.id}/>
        }
        

        )}
  
      </main>
      );
    }
  }
  export default MessageList;


