## Chatty App

A single page insant-messaging application built on ReactJS


### Features

* Handles multiple user connections 
* Users can change their displayed name 
* Displays real-time messages and number of users connected
* Every user is automatically assigned a unique color

### Technical Specifications

* Webpack with Babel, JSX, ES6, webpack dev server 
* WebSockets using Node package ws on the server-side, and native WebSocket on client side
* ReactJS

### Getting Started

* Fork this repository, then clone your fork of this repository.
* Install dependencies using the npm install command.
* Start the web server (cd into chatty_server) using the npm start command. Server will run at http://localhost:3001/.
* Start the client using the npm start command (in chatty_app) using the npm start command. The app will be run on http://localhost:3000/
* Go to http://localhost:3000/ in your browser

### Dependencies 

Express
Websockets
Webpack
Babel

### Screenshots

!["One user connected + change username functionality "] (https://github.com/shivangna/chatty-app/blob/master/docs/One%20user%20chatting.png)

!["Another user connected, chatting with first user + users online functionality"] (https://github.com/shivangna/chatty-app/blob/master/docs/Two%20users%20chatting.png)