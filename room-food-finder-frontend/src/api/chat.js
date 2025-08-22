import { db } from '../Firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

/**
 * Starts a new chat or finds an existing one between two users.
 * @param {string} currentUserId - The ID of the logged-in user.
 * @param {string} vendorId - The ID of the vendor to chat with.
 * @returns {string} The ID of the chat document.
 */
export const startChat = async (currentUserId, vendorId) => {
  if (currentUserId === vendorId) {
    throw new Error("You cannot start a chat with yourself.");
  }

  const participants = [currentUserId, vendorId];
  const chatsRef = collection(db, 'chatts');

  // Check if a chat between these two users already exists
  const q = query(chatsRef, where('participants', 'array-contains', currentUserId));
  const querySnapshot = await getDocs(q);
  
  let existingChat = null;
  querySnapshot.forEach(doc => {
    const data = doc.data();
    // Check if the other participant is also in this chat
    if (data.participants.includes(vendorId)) {
      existingChat = { id: doc.id, ...data };
    }
  });

  if (existingChat) {
    return existingChat.id; // Return existing chat ID
  } else {
    // If no chat exists, create a new one
    const newChatRef = await addDoc(chatsRef, {
      participants: participants,
      createdAt: new Date()
    });
    return newChatRef.id; // Return new chat ID
  }
};