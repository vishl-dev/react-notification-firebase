import { Typography } from "@mui/material";
import { useEffect } from "react";
import NotificationList from "./components/NotificationList";
import NotificatonButtons from "./components/NotificatonButtons";
import { useNotification } from "./context/NotificationProvider";

function App() {
  const { signInUser } = useNotification();
  useEffect(() => {
    signInUser();
  }, []);

  return (
    <div className="w-full h-screen items-center flex flex-col ">
      <Typography marginTop="100px" variant="h4" component="h1" gutterBottom>
        Notification App
      </Typography>
      <NotificatonButtons />
      <NotificationList />
    </div>
  );
}

export default App;
