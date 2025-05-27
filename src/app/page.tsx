"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import firebase from "../../firebase/clientApp"; // Modular auth
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";

export default function Home() {
  const auth = getAuth(firebase.app());
  const [user, loading, error] = useAuthState(auth);
  const firestore = getFirestore(firebase.app());

  const [userAcceptanceCollection, collectionLoading, collectionError] =
    useCollection(collection(firestore, "user-acceptance"), {});

  if (!collectionLoading && userAcceptanceCollection) {
    userAcceptanceCollection.docs.map((doc) => {
      const data = doc.data();
      console.log("User Acceptance Data:", data);
    });
  }

  const db = firebase.firestore();
  const addUserAcceptance = async (agree: string) => {
    await db.collection("user-acceptance").doc(user?.uid).set({
      agree,
    });
  };

  console.log("User:", user);
  if (!user) return <div>Please sign in.</div>;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
      }}
    >
      <h1 style={{ color: "blue" }}>
        Welcome, {user.displayName || user.email}!
      </h1>
      <p>You are signed in.</p>

      <h2>User Details:</h2>
      <p>Email: {user.email}</p>
      <div>
        <button
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            marginTop: "20px",
            marginRight: "10px",
          }}
          className="bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => addUserAcceptance("yes")}
        >
          Yes
        </button>
        <button
          style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
          className="bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => addUserAcceptance("no")}
        >
          No
        </button>
      </div>
      <div>
        <button
          style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
          className="bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={() => auth.signOut()}
        >
          {" "}
          Logout
        </button>
      </div>
    </div>
  );
}
