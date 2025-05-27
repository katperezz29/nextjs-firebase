import React, { useEffect, useRef } from "react";
import firebase from "../firebase/clientApp";
import "firebaseui/dist/firebaseui.css";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: "github.com", // use provider ID string directly here
      scopes: ["user:email"],
    },
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => {
      if (typeof window !== "undefined") {
        window.location.assign("/");
      }
      return false;
    },
  },
};

function Auth() {
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return; // ensure client only

    // dynamically import firebaseui and firebase/auth to avoid SSR issues
    (async () => {
      const firebaseui = await import("firebaseui");
      const { getAuth, GithubAuthProvider } = await import("firebase/auth");

      const auth = getAuth(firebase.app());
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(auth);

      // Update the uiConfig to use the actual provider id from the class:
      uiConfig.signInOptions = [
        {
          provider: GithubAuthProvider.PROVIDER_ID,
          scopes: ["user:email"],
        },
      ];

      if (uiRef.current) {
        ui.start(uiRef.current, uiConfig);
      }

      return () => {
        ui.reset();
      };
    })();
  }, []);

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ textAlign: "center" }}>Sign In</h1>
      <p>Please sign-in:</p>
      <div ref={uiRef} />
    </div>
  );
}

export default Auth;
