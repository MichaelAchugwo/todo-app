import React, { useEffect } from "react";

function ReminderNotification() {
  useEffect(() => {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return;
    }

    if (Notification.permission !== "granted") {
      Notification.requestPermission().then((permission) => {
        if (permission !== "granted") {
          console.error("Permission denied by user");
        }
      });
    }

    const reminderTime = new Date("2024-04-25T15:30:00");
    const delay = reminderTime.getTime() - Date.now();

    setTimeout(() => {
      new Notification("Reminder", {
        body: "Don't forget to do something!",
      });
    }, delay);
  }, []);

  return <div>Setting up a reminder...</div>;
}

export default ReminderNotification;
