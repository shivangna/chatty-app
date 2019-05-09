
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: []
    };
    this.socket = new WebSocket('ws://localhost:3001')
  }
  sendMessageToServer = (message) => {
    this.socket.send(JSON.stringify(message));
    console.log('message sent to server');
  }

  handleSubmitOnEnter = (event) => {
    if (event.key === "Enter") {
      var username = this.state.currentUser.name;
      this.onNewPost(event.target.value, username);
      this.setState({content:""})

    }
  }

  handleUsernameChange = (event) => {
      this.setState({currentUser: {name: event.target.value}})
  }
  
  onNewPost = (content, username) => {
    this.sendMessageToServer({
      username: username,
      content: content
  });
}


  componentDidMount() {
    console.log("componentDidMount <App />");

      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
   
      //
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      //this.setState({messages: messages})
    this.socket.onopen = () => {
      console.log('OPEN CONNECTION')
    }
    this.socket.onmessage = (event) => {
      const messages = this.state.messages.concat(JSON.parse(event.data))
      this.setState({messages: messages})
    }
  }

  render() {
    if (this.state.loading) {
      return <h1> loading ...</h1>
    } else {
    return (

      <div>
      <nav className="navbar">
       <a href="/" className="navbar-brand">Chatty</a>
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
