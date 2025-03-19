import { initializeApp } from "firebase/app";
import { getMessaging, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyBtTZxVIg3DoLTF1eqWpzeLNhYun8dQrG8",
    authDomain: "push-notification-1874a.firebaseapp.com",
    projectId: "push-notification-1874a",
    storageBucket: "push-notification-1874a.firebasestorage.app",
    messagingSenderId: "914824646317",
    appId: "1:914824646317:web:39d402ce3d81a67e2e8024"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    new Notification(payload.notification.title, {
        body: payload.notification.body
    });
});

// export default function requestNotificationPermission() {
//     console.log("requestNotificationPermission has been called!");
//     Notification.requestPermission().then(permission => {
//         console.log("Permission:", permission);
//         if (permission === "granted") {
//         }
//     });
// }