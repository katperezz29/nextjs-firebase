"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import firebase from "../../firebase/clientApp"; // Modular auth
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const auth = getAuth(firebase.app());
  const [user] = useAuthState(auth);
  const firestore = getFirestore(firebase.app());

  const [userAcceptanceCollection, collectionLoading] = useCollection(
    collection(firestore, "user-acceptance"),
    {}
  );

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

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
          <p className="text-gray-600 mb-8">
            Please sign in to access your account
          </p>
          <button
            onClick={() => router.push("/auth")}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, {user.displayName || user.email}!
            </h1>
            <p className="text-gray-600">You are successfully signed in.</p>
          </div>

          {/* User Details Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              User Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-700">
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>
          </div>

          {/* Action Buttons Section */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                Make Your Choice
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => addUserAcceptance("yes")}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 font-medium shadow-sm"
                >
                  Yes
                </button>
                <button
                  onClick={() => addUserAcceptance("no")}
                  className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium shadow-sm"
                >
                  No
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => auth.signOut()}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
