import { initializeApp } from "firebase-admin/app";
import { getMessaging } from "firebase-admin/messaging";
import { credential } from "firebase-admin";

const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
};

const app = initializeApp({
  credential: credential.cert(serviceAccount),
});
const messaging = getMessaging(app);
export default messaging;
