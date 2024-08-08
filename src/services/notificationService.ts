
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';

import { Notification, NotificationType } from '../types';
import { db } from '../config/firebase';



const COLLECTION_NAME = 'notifications';

export const createNotification = async (userId: string, type: NotificationType): Promise<void> => {
  const message = getNotificationMessage(type);
  const newNotification: Omit<Notification, 'id'> = {
    message,
    read: false,
    createdAt: new Date().toLocaleString(),
    messageType: type
  };

  await addDoc(collection(db, COLLECTION_NAME), { ...newNotification, userId });
};

export const markNotificationAsRead = async (notificationId: string): Promise<void> => {
  const notificationRef = doc(db, COLLECTION_NAME, notificationId);
  await updateDoc(notificationRef, { read: true });
};

export const getUserNotifications = async (userId: string): Promise<Notification[]> => {
  const q = query(collection(db, COLLECTION_NAME), where('userId', '==', userId));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
};

const getNotificationMessage = (type: NotificationType): string => {
  switch (type) {
    case 'info':
      return 'This is an informational notification.';
    case 'success':
      return 'This is a success notification.';
    case 'warning':
      return 'This is a warning notification.';
  }
};