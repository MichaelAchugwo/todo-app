export default function NotificationModal({ onClose }) {
  const allowNotifications = () => {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications");
      return;
    }
    if (Notification.permission !== "granted") {
      try {
        Notification.requestPermission().then((permission) => {
          if (permission !== "granted") {
            alert("You rejected notifications");
            console.error("Permission denied by user");
          }
        });
      } catch (error) {
        console.error("Error allowing notifications: ", error);
      }
    }
    if (Notification.permission === "granted") {
      onClose();
    }
  };
  return (
    <div className="z-50 modal absolute left-0 top-0 min-w-full min-h-screen flex flex-col place-items-center justify-center bg-black/90 backdrop-opacity-60 backdrop-blur-lg">
      <h1 className="text-center text-white text-2xl mb-4 w-80 lg:w-full">
        Allow Notifications so you can receive reminders
      </h1>
      <button
        className="bg-blue-700 hover:bg-blue-600 text-white font-medium p-2 px-4 rounded-lg mr-2"
        onClick={allowNotifications}
      >
        Allow
      </button>
    </div>
  );
}
