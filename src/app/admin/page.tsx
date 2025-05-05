"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  isSignInWithEmailLink,
  signInWithEmailLink,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/firebase";
import VerifyEmail from "@/components/verify-email";
import Login from "@/components/Login";

export default function Home() {
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("User Logged In");
      if (user) {
        router.push("/admin/dashboard"); 
      }
    });

    // Check if the URL contains a valid email sign-in link
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem("emailForSignIn");

      if (!email) {
        // If no email is stored, prompt the user to enter their email
        email = window.prompt("Please enter your email for confirmation:");
      }

      if (email) {
        signInWithEmailLink(auth, email, window.location.href)
          .then(() => {
            window.localStorage.removeItem("emailForSignIn");
            router.push("/admin/dashboard");
          })
          .catch((error) => {
            console.error("Error signing in:", error);
          });
      }
    } else {
      setIsVerifying(false);
    }

    return () => unsubscribe();
  }, [router]);

  if (isVerifying) {
    return <VerifyEmail />;
  }

  console.log("We are goin back to Login!");

  return <Login />;
}
