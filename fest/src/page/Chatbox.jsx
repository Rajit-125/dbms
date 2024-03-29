
import React, { Component } from 'react';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
    };
    this.socket = new WebSocket('ws://localhost:8000'); 
  }

  componentDidMount() {
    this.socket.addEventListener('open', () => {
      console.log('WebSocket connection established!');
    });

    this.socket.addEventListener('message', (event) => {
      const receivedMessage = event.data;
      console.log("Received message:", receivedMessage);
      const newMessage = { content: receivedMessage, type: 'received' };
      this.setState((prevState) => ({
        messages: [...prevState.messages, newMessage],
      }));
    });
    this.socket.addEventListener('error', (error) => {
      console.error('WebSocket encountered an error:', error);
    });
  }
  
  componentWillUnmount() {
    this.socket.close();
  }
  

  handleChange = (e) => {
    this.setState({ newMessage: e.target.value });
  };

  handleSend = () => {
    if (this.socket.readyState === WebSocket.OPEN && this.state.newMessage.trim() !== '') {
      const newMessage = { content: this.state.newMessage, type: 'sent' };

      this.socket.send(this.state.newMessage);
      this.setState((prevState) => ({
        messages: [...prevState.messages, newMessage],
        newMessage: '',
      }));
    }
  };

  render() {
    return (
      <div className=" mx-96 my-96 text-xl text-black font-semibold flex flex-col h-100vh">
        <div className="">
          {this.state.messages.map((message, index) => (
            <div
              key={index}
              className={` max-w-7xl mb-10 p-1 border-r-8 rounded-2xl ${message.type === 'sent' ? ' justify-end bg-white' : ' justify-start  bg-white'}`}
            >
              {message.content}
            </div>
          ))}
        </div>
        <div className=' flex justify-center p-10'>
          <input
            className=" flex-1 p-2 border-r-8 border-1 border-solid mr-10 rounded-2xl"
            type="text"
            value={this.state.newMessage}
            onChange={this.handleChange}
            //placeholder="Type a message..."
          />
          <button onClick={this.handleSend} className=" my-1 text-white bg-blue-400 rounded-2xl w-32 hover:text-black">Send</button>
        </div>
        
      </div>
    );
  }
}

export default Chat;
