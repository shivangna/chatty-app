
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
          id: '1'
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good.",
          id: '2'
        }
      ]
    }
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
      this.setState({
        messages: this.state.messages.concat({
          id:this.state.messages.length+1,
          username: username,
          content: content
        })
      });
    }




  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      // Add a new message to the list of messages in the data store
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // Update the state of the app component.
      // Calling setState will trigger a call to render() in App and all child components.
      this.setState({messages: messages})
    }, 3000);
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
