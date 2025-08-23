import React, { useState, useEffect, useContext } from 'react';
import { getUserById } from '../api/users';
import AuthContext from '../context/AuthContext';

const ConversationItem = ({ convo, activeConversation, setActiveConversation }) => {
  const { user } = useContext(AuthContext);
  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const getOtherUserData = async () => {
      // The fix: find the participant ID that doesn't match the current user's ID
      const otherUserId = convo.participants.find(p => p.toString() !== user.id.toString());
      if (otherUserId) {
        const userData = await getUserById(otherUserId);
        setOtherUser(userData);
      }
    };

    if (user) {
      getOtherUserData();
    }
  }, [convo, user]);

  if (!otherUser) {
    return null; // Or a loading skeleton
  }

  return (
    <div
      className={`conversation-item ${activeConversation?.id === convo.id ? 'active' : ''}`}
      onClick={() => setActiveConversation({ ...convo, otherUserName: otherUser.name })}
    >
      <img src={`https://placehold.co/100x100?text=${otherUser.name.charAt(0)}`} alt="avatar" />
      <div className="conversation-details">
        <h4>{otherUser.name}</h4>
        <p>Click to view messages</p>
      </div>
    </div>
  );
};

export default ConversationItem;