import { signInAnonymously } from "firebase/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../config/firebase";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsRead,
} from "../services/notificationService";
import { Notification, NotificationType } from "../types";

interface NotificationContextValue {
  signInUser: () => Promise<void>;
  onNotificationClick: (type: NotificationType) => Promise<void>;
  onMarkAsRead: (notificationId: string) => Promise<void>;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextValue | null>(
  null
);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const signInUser = async () => {
    try {
     const userCredential =  await signInAnonymously(auth);
     setUserId(userCredential.user.uid);
    } catch (error) {
      console.error("Error signing in anonymously:", error);
    }
  };

  const fetchNotifications = async () => {
    try {
      if (userId) {
        const userNotifications = await getUserNotifications(userId);
        console.log({userNotifications});
        setNotifications(userNotifications);
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  const onNotificationClick = async (type: NotificationType) => {
    try {
      if (userId) {
        await createNotification(userId, type);
        await fetchNotifications();
      }
    } catch (error) {
      console.error("Error creating notification:", error);
    }
  };

  const onMarkAsRead = async (notificationId: string) => {
    try {
      await markNotificationAsRead(notificationId);
      await fetchNotifications();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return (
    <NotificationContext.Provider
      value={{
        signInUser,
        onNotificationClick,
        onMarkAsRead,
        notifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }

  return context;
};

export default NotificationProvider;
