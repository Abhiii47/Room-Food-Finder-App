import React from 'react';
import '../styles/Chat.css';

const ChatPage = () => {
  return (
    <div className="chat-container">
      <div className="chat-sidebar">
        <h3>Chats</h3>
        <ul className="chat-list">
          <li>Vendor A</li>
          <li>Vendor B</li>
        </ul>
      </div>
      <div className="chat-main">
        <div className="chat-header">
          <h4>Chat with Vendor A</h4>
        </div>
        <div className="message-area">
          <div className="message received">Hi there! Is the room still available?</div>
          <div className="message sent">Yes, it is. When would you like to view it?</div>
        </div>
        <div className="message-input-area">
          <input type="text" placeholder="Type a message..." />
          <button>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;