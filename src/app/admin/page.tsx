"use client";

// import { useState } from "react";
// import AdminDashboard from "../../components/AdminDashboard";
// import Login from "@/components/Login";

// export default function AdminPage() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-8 text-center text-[#19485F]">
//         Admin Dashboard
//       </h1>
//       {isLoggedIn ? (
//         <AdminDashboard />
//       ) : (
//         <Login onLogin={() => setIsLoggedIn(true)} />
//       )}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isSignInWithEmailLink, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import VerifyEmail from "@/components/verify-email";
import Login from "@/components/Login";

export default function Home() {
  const [isVerifying, setIsVerifying] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If user is authenticated, redirect to admin dashboard
        router.push("/admin/dashboard");
      }
    });

    // Check if the URL contains an email link
    const isEmailLink = isSignInWithEmailLink(auth, window.location.href);
    setIsVerifying(isEmailLink);

    return () => unsubscribe();
  }, [router]);

  if (isVerifying) {
    return <VerifyEmail />;
  }

  return <Login />;
}


