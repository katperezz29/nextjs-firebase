import React from "react";
import { StyledFirebaseAuth } from "react-firebaseui";
import firebase from "../firebase/clientApp"; // Correct import

const uiConfig = {
  signInFlow: "popup", // Or "redirect" if preferred
  signInOptions: [
    {
      provider: firebase.auth.GithubAuthProvider.PROVIDER_ID,
      scopes: ["user:email"],
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {
      window.location.assign("/"); // or any route you want
      return false; // Prevent automatic redirect
    },
  },
};

function Auth() {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <p>Please sign-in:</p>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </div>
  );
}

export default Auth;
