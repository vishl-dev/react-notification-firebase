import { Button } from "@mui/material";
import { useNotification } from "../context/NotificationProvider";
import { NotificationType } from "../types";

const NotificatonButtons = () => {
  const { onNotificationClick } = useNotification();

  const handleNotificationClick = (type: NotificationType) => {
    onNotificationClick(type);
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleNotificationClick("info")}
      >
        Info Notification
      </Button>
      <Button
        variant="contained"
        className="!bg-green-600"
        onClick={() => handleNotificationClick("success")}
      >
        Success Notification
      </Button>
      <Button
        variant="contained"
        className="!bg-red-600"
        onClick={() => handleNotificationClick("warning")}
      >
        Warning Notification
      </Button>
    </div>
  );
};

export default NotificatonButtons;
