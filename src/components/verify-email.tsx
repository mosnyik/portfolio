"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, signInWithEmailLink } from "firebase/auth";
import { auth } from "@/firebase";

export default function VerifyEmail() {
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function verifyAndSignIn() {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem("emailForSignIn");

        if (!email) {
          // If email is not found in localStorage, prompt user
          email = window.prompt("Please provide your email for confirmation");
        }

        if (email) {
          try {
            await signInWithEmailLink(auth, email, window.location.href);
            window.localStorage.removeItem("emailForSignIn");
            // Redirect to admin dashboard after successful verification
            router.push("/admin/dashboard");
          } catch (error) {
            console.error("Error signing in with email link:", error);
            setError("Failed to verify email link. Please try again.");
          }
        }
      }
      setIsVerifying(false);
    }

    verifyAndSignIn();
  }, [router]);

  if (isVerifying) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-[#19485F] mb-4">
            Verifying...
          </h2>
          <div className="flex justify-center">
            <svg
              className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#19485F]"
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
            <p className="text-gray-600">
              Please wait while we verify your login.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-[#19485F] mb-4">Error</h2>
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => router.push("/login")}
            className="text-[#19485F] underline hover:text-opacity-80"
          >
            Return to login
          </button>
        </div>
      </div>
    );
  }

  return null;
}

// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import {
//   isSignInWithEmailLink,
//   signInWithEmailLink,
//   onAuthStateChanged,
// } from "firebase/auth";
// import { auth } from "@/firebase";

// export default function VerifyEmail() {
//   const [error, setError] = useState<string | null>(null);
//   const [isVerifying, setIsVerifying] = useState(true);
//   const router = useRouter();

//   useEffect(() => {
//     async function verifyAndSignIn() {
//       if (isSignInWithEmailLink(auth, window.location.href)) {
//         let email = window.localStorage.getItem("emailForSignIn");

//         if (!email) {
//           email = window.prompt("Please provide your email for confirmation");
//         }

//         if (email) {
//           try {
//             await signInWithEmailLink(auth, email, window.location.href);
//             window.localStorage.removeItem("emailForSignIn");

//             // Wait for auth state to update
//             const unsubscribe = onAuthStateChanged(auth, (user) => {
//               if (user) {
//                 // User is signed in, redirect to admin dashboard
//                 router.push("/admin/dashboard");
//               }
//               unsubscribe();
//             });
//           } catch (error) {
//             console.error("Error signing in with email link:", error);
//             setError("Failed to verify email link. Please try again.");
//           }
//         }
//       }
//       setIsVerifying(false);
//     }

//     verifyAndSignIn();
//   }, [router]);

//   if (isVerifying) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold text-[#19485F] mb-4">
//             Verifying...
//           </h2>
//           <div className="flex justify-center">
//             <svg
//               className="animate-spin -ml-1 mr-3 h-8 w-8 text-[#19485F]"
//               xmlns="http://www.w3.org/2000/svg"
//               fill="none"
//               viewBox="0 0 24 24"
//             >
//               <circle
//                 className="opacity-25"
//                 cx="12"
//                 cy="12"
//                 r="10"
//                 stroke="currentColor"
//                 strokeWidth="4"
//               ></circle>
//               <path
//                 className="opacity-75"
//                 fill="currentColor"
//                 d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//               ></path>
//             </svg>
//             <p className="text-gray-600">
//               Please wait while we verify your login.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
//           <h2 className="text-2xl font-bold text-[#19485F] mb-4">Error</h2>
//           <p className="text-red-500 mb-4">{error}</p>
//           <button
//             onClick={() => router.push("/login")}
//             className="text-[#19485F] underline hover:text-opacity-80"
//           >
//             Return to login
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return null;
// }
