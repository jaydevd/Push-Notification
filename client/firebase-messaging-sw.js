import { getMessaging, getToken } from "firebase/messaging";
import './src/firebaseConfig';

// Get registration token. Initially this makes a network call, once retrieved
// subsequent calls to getToken will return from cache.
const messaging = getMessaging();

export default function sendNotification() {

    // Send the token to your server and update the UI if necessary
    getToken(messaging, { vapidKey: "BK10DcC3gnh2lzJMrWiZL8OcjVC9ph754GPRSakfGYanLp76pJHlW8Xq2Pb1rtlQU8NwV-XLmbsYx35vhNyIqA0" }).then((currentToken) => {
        if (currentToken) {
            // Send the token to your server and update the UI if necessary
            console.log(currentToken);
            fetch("/api/send-notification", {

                // Adding method type
                method: "POST",

                // Adding body or contents to send
                body: JSON.stringify({
                    token: currentToken,
                }),

                // Adding headers to the request
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            console.log("post request made using front-end");
            // ...
        } else {
            // Show permission request UI
            console.log('No registration token available. Request permission to generate one.');
            // ...
        }
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    });
}