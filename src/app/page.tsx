"use client";
import firebase from "../../firebase/clientApp"; // Modular auth
import { useCollection } from "react-firebase-hooks/firestore";
import { getFirestore, collection } from "firebase/firestore";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [submit, setSubmit] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
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
    await db.collection("user-acceptance").doc(name).set({
      agree,
    });
    setShowDialog(true);
  };

  if (!submit) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome</h1>
          <p className="text-gray-600 mb-8">Please Input Name</p>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium shadow-sm mb-4"
          />
          <button
            onClick={() => setSubmit(true)}
            className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
          >
            Submit
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-md w-full mx-auto p-8 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Welcome, {name}!
          </h1>

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
          </div>

          <button
            onClick={() => setSubmit(false)}
            className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 font-medium shadow-sm mt-4"
          >
            Back
          </button>

          {/* Thank You Dialog */}
          {showDialog && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-sm mx-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Thank You!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your selection has been recorded.
                </p>
                <button
                  onClick={() => setShowDialog(false)}
                  className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
