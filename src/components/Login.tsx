"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { sendSignInLinkToEmail } from "firebase/auth";
import { actionCodeSettings, auth } from "@/firebase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      // Save the email locally to complete the sign-in after user clicks the link
      window.localStorage.setItem("emailForSignIn", email);
      setEmailSent(true);
    } catch (error) {
      console.error("Error sending email link:", error);
      setError("Failed to send login link. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (emailSent) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#19485F] mb-6">
            Check Your Email
          </h2>
          <p className="text-center text-gray-600">
            We&apos;ve sent a login link to <strong>{email}</strong>. Click the
            link in the email to sign in.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 w-full max-w-md p-8 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#19485F] mb-6">
          Login
        </h2>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <motion.button
          type="submit"
          className="w-full bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors flex items-center justify-center"
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg
                className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Sending login link...
            </>
          ) : (
            "Send Login Link"
          )}
        </motion.button>
      </form>
    </div>
  );
}
