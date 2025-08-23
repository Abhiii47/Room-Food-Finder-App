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

  // To ensure the same query for both users, sort the IDs.
  // This creates a unique, deterministic combination of the two IDs.
  const sortedParticipants = [currentUserId, vendorId].sort();
  const chatsRef = collection(db, 'chatts');

  // Perform a direct query for a chat with these two specific participants.
  // This is significantly more efficient than iterating through all conversations.
  const q = query(chatsRef, where('participants', '==', sortedParticipants));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    // If a chat exists, get its ID and return it.
    const existingChat = querySnapshot.docs[0];
    return existingChat.id;
  } else {
    // If no chat exists, create a new one.
    const newChatRef = await addDoc(chatsRef, {
      participants: sortedParticipants,
      createdAt: new Date()
    });
    return newChatRef.id;
  }
};