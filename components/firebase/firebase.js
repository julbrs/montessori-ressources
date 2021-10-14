import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const config = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    console.log(config);
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.storage = app.storage();
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
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
