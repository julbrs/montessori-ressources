import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
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
