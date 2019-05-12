
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Anonymous"}, 
      messages: [],
      onlineUsers: 0,
    };
    this.socket = new WebSocket('ws://localhost:3001')}


  //helper function that stringifys & sends message to server
  sendMessageToServer = (message) => {
    this.socket.send(JSON.stringify(message));
    console.log('message sent to server');
  }

  //helper function determines username of message sender and passes message to onNewPost
  handleSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      var username = this.state.currentUser.name;
      this.onNewPost(event.target.value, username);
      this.setState({content:""})
    }
  }

  //sends username and mesasge and posts it to the server
  onNewPost = (content, username) => {
    this.sendMessageToServer({
      type: "postMessage",
      username: username,
      content: content
    });
  }
 
  //handles userame change notification. Also posts notification to the server.
  handleUsernameChange = (event) => {
    if (event.key === "Enter") {
      if(this.state.currentUser.name !== event.target.value) {
        const oldUserName = this.state.currentUser.name;
        const newUserName = event.target.value;
        const nameChangeNotification = {
          type: "postNotification",
          content: `${oldUserName} has changed their name to ${newUserName}`
        }
        this.sendMessageToServer(nameChangeNotification);
        this.setState({currentUser: {name: event.target.value}})
      }
    }
  }


  componentDidMount() {
    //console.log("componentDidMount <App />");
    //console.log("Simulating incoming message");
    this.socket.onopen = () => {
      console.log('OPEN CONNECTION')
    }
    //when message is received from server, handle different cases based on type of event
    this.socket.onmessage = (event) => {
      let incomingMessage = JSON.parse(event.data)
      switch(incomingMessage.type) {
        case "onlineUsers": 
          this.setState({onlineUsers:incomingMessage.counter})
          break;
        case "incomingMessage":
          {let messages = this.state.messages.concat(incomingMessage)
          this.setState({messages: messages})}
          break;
        case "incomingNotification":
         {let messages = this.state.messages.concat(incomingMessage)
         this.setState({messages: messages})}
          break;
        default:
          // show an error in the console if the message type is unknown
        throw new Error("Unknown event type " + event.type);
      }
    }
  }

  render() {
    //renders the nav bar, user online count and pass props to other components
    if (this.state.loading) {
      return <h1> loading ...</h1>
    } else {
      return (
      <div>
        <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <div className = "usercount">
          <p>{this.state.onlineUsers} user(s) online</p>
        </div>
        </nav>
        <MessageList chatMessages = {this.state.messages} />
        <ChatBar currentUser = {this.state.currentUser}
                 handleSubmitOnEnter = {this.handleSubmitOnEnter}
                 onNewPost = {this.onNewPost}
                 handleUsernameChange = {this.handleUsernameChange}/>
       </div>
       );
      }
    }

}
export default App;
