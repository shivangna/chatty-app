import React, { Component } from 'react';

import Message from './Message.jsx';
import Notifications from './Notifications.jsx';

class MessageList extends Component {
    render() {
        console.log(this.props)
      return (
        <main className="messages">
        {this.props.chatMessages.map(eachMessage => {
          if (eachMessage.type === 'incomingMessage') {
            return <Message messageUsername = {eachMessage.username}
                            messageContent = {eachMessage.content} 
                            key = {eachMessage.id}
                            type = {eachMessage.type}
                            userColor = {eachMessage.color}/>
        } else {
          return <Notifications content = {eachMessage.content} key = {eachMessage.id}/>
        }
      } 
        

        )}
  
      </main>
      );
    }
  }
  export default MessageList;


