import React, { useEffect, useRef } from "react";
import firebase from "../firebase/clientApp";
import "firebaseui/dist/firebaseui.css";
import { useRouter } from "next/router";
import "../src/app/globals.css";
import { GithubAuthProvider } from "firebase/auth";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    {
      provider: GithubAuthProvider.PROVIDER_ID,
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
  const router = useRouter();
  const uiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    (async () => {
      const firebaseui = await import("firebaseui");
      const { getAuth } = await import("firebase/auth");

      const auth = getAuth(firebase.app());
      const ui =
        firebaseui.auth.AuthUI.getInstance() ||
        new firebaseui.auth.AuthUI(auth);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-blue-100 mb-4">
              <svg
                className="w-12 h-12 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 text-lg">
              Sign in to access your account
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            {/* Auth UI Container */}
            <div className="space-y-6">
              <div ref={uiRef} className="flex justify-center" />

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Back to Home Button */}
              <div className="text-center">
                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Home
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-500">
                By signing in, you agree to our{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center text-sm text-gray-500">
            <p>
              Need help?{" "}
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
              >
                Contact Support
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
