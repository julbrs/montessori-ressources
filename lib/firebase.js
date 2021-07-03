import * as admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: process.env.FIREBASE_SERVICE_PRIVATE_KEY.replace(
        /\\n/g,
        "\n"
      ),
      clientEmail: process.env.FIREBASE_SERVICE_CLIENT_EMAIL,
      projectId: process.env.FIREBASE_SERVICE_PROJECT_ID,
    }),
    databaseURL: process.env.FIREBASE_SERVICE_DATABASE_URL,
  });
}

export default admin.firestore();
