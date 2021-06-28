import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    if (!app.apps.length) {
      try {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.firestore();
        this.storage = app.storage();
        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.facebookProvider = new app.auth.FacebookAuthProvider();
      } catch (err) {
        if (!/already exists/.test(err.message)) {
          console.error("Firebase initialization error", err.stack);
        }
      }
    }
  }

  /**
   * AUTH API
   */
  signInWithGoogle = () => {
    this.auth
      .signInWithPopup(this.googleProvider)
      .then((res) => {
        //console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  signInWithFacebook = () => {
    this.auth
      .signInWithPopup(this.facebookProvider)
      .then((res) => {
        //console.log(res.user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  doSignOut = () => this.auth.signOut();
}

export default Firebase;
