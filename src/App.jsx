
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {loading:true};
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(
     
        
        {
        currentUser: {name: "Bob"},
        loading:false,
        messages: [
          {
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
          }
        ]
      });
    }, 500)
  
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

      <Message/>
      <ChatBar currentUser = {this.state.currentUser} />

      </div>
    );
    }
  }
}
export default App;
