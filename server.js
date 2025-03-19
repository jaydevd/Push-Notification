import bodyParser from "body-parser";
import cors from "cors";
import express from 'express';
import admin from "firebase-admin";
import fs from 'fs';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.write("Hello");
    res.end();
});

const data = fs.readFileSync('serviceAccountKey.json');
const serviceAccount = JSON.parse(data);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

app.post("/api/send-notification", async (req, res) => {
    console.log("POST request made with node server.");
    const { token } = req.body;
    console.log("back-end:", token);

    if (!token) {
        return res.status(400).json({ message: "Token is required" });
    }

    const message = {
        tokens: [token],  // Ensure this is correctly passed
        notification: {
            title: "Testing",
            body: "This is a test notification",
        },
    };

    try {
        const sendmessage = await admin.messaging().sendEachForMulticast(message);
        console.log('sendmessage: ', sendmessage);

        res.status(200).json({ message: "Notification sent successfully" });
    } catch (error) {
        console.log("Error sending notification:", error);
        res.status(500).json({ message: "Error sending notification", error });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});