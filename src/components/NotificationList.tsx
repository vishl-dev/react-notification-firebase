import { Button, Card, List, ListItem } from "@mui/material";
import { useNotification } from "../context/NotificationProvider";

const NotificationList = () => {
  const { notifications, onMarkAsRead } = useNotification();

  const sortedNotifications = notifications.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <List>
      {sortedNotifications.map((notification) => (
        <ListItem
          key={notification.id}
          onClick={() => onMarkAsRead(notification.id)}
          className="cursor-pointer"
        >
          <Card
            className={`px-4 py-2 flex items-center justify-center gap-3 w-[400px] ${
              notification.messageType === "success"
                ? "!border border-green-400"
                : notification.messageType === "info"
                ? "!border border-blue-500"
                : "!border border-red-500"
            }`}
          >
            <div>
              <h4>{notification.message}</h4>
              <span>{`Created at: ${notification.createdAt.toLocaleString()}`}</span>
            </div>
            <Button variant="contained" color={notification.read ? "success" : "error"}>
              {notification.read ? "Read" : "Unread"}
            </Button>
          </Card>
        </ListItem>
      ))}
    </List>
  );
};

export default NotificationList;