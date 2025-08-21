import React, { useState } from 'react';
import '../styles/Chat.css';

// Placeholder data - we will replace this with real data from Firebase later
const conversations = [
  { id: 1, name: 'John Doe', lastMessage: 'See you then!', avatar: 'https://placehold.co/100x100' },
  { id: 2, name: 'Jane Smith', lastMessage: 'Okay, sounds good.', avatar: 'https://placehold.co/100x100' },
  { id: 3, name: 'Vendor One', lastMessage: 'Yes, the room is still available.', avatar: 'https://placehold.co/100x100' },
];

const messages = [
    { id: 1, sender: 'John Doe', text: 'Hi there! Is this still available?' },
    { id: 2, sender: 'You', text: 'Yes, it is. Are you interested?' },
    { id: 3, sender: 'John Doe', text: 'I am! Can I see it tomorrow?' },
    { id: 4, sender: 'You', text: 'Sure, what time works for you?' },
    { id: 5, sender: 'John Doe', text: 'How about 2 PM?' },
    { id: 6, sender: 'You', text: 'Perfect. See you then!' },
];

const Chat = () => {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);

  return (
    <div className="chat-container">
      <aside className="conversations-sidebar">
        <div className="sidebar-header">
          <h3>Conversations</h3>
        </div>
        <div className="conversation-list">
          {conversations.map((convo) => (
            <div
              key={convo.id}
              className={`conversation-item ${activeConversation.id === convo.id ? 'active' : ''}`}
              onClick={() => setActiveConversation(convo)}
            >
              <img src={convo.avatar} alt={convo.name} />
              <div className="conversation-details">
                <h4>{convo.name}</h4>
                <p>{convo.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="chat-window">
        <div className="chat-header">
          <h3>{activeConversation.name}</h3>
        </div>
        <div className="message-list">
          {messages.map((msg) => (
            <div key={msg.id} className={`message-item ${msg.sender === 'You' ? 'sent' : 'received'}`}>
              <div className="message-bubble">{msg.text}</div>
            </div>
          ))}
        </div>
        <div className="message-input-area">
          <input type="text" placeholder="Type a message..." />
          <button className="btn-primary">Send</button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
