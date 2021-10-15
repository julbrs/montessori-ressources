import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "../firebase/clientApp";

// Configure FirebaseUI.
const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: (authResult) => {
      // this is a new user, add them to the firestore users collection!
      if (authResult.additionalUserInfo.isNewUser) {
        firebase
          .firestore()
          .collection("users")
          .doc(authResult.user.uid)
          .set({
            admin: false,
            displayName: authResult.user.displayName,
            photoURL: authResult.user.photoURL,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          })
          .then(() => {
            console.log("User document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing user document: ", error);
          });
      }
      return false;
    },
  },
  signInSuccessUrl: "#/",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  ],
};

function Auth(props) {
  return (
    <div className="container px-5 mx-auto">
      <p>Merci de vous connecter avant d&apos;accéder à ce contenu:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Auth;
