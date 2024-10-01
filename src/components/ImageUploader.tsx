// "use client";

// import { useState, useRef } from "react";
// import { motion } from "framer-motion";

// export default function ImageUploader() {
//   const [file, setFile] = useState<File | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [copySuccess, setCopySuccess] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//       setError(null);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;

//     setUploading(true);
//     setError(null);

//     const filename = encodeURIComponent(file.name);
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(`/api/upload?filename=${filename}`, {
//         method: "POST",
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();
//       setUploadedUrl(data.url);

//       // Clear the file input
//       if (fileInputRef.current) {
//         fileInputRef.current.value = "";
//       }
//       setFile(null);
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       setError("Failed to upload image. Please try again.");
//     } finally {
//       setUploading(false);
//     }
//   };

//   const copyToClipboard = async () => {
//     if (uploadedUrl) {
//       try {
//         await navigator.clipboard.writeText(uploadedUrl);
//         setCopySuccess("Copied to clipboard!");
//         setTimeout(() => setCopySuccess(null), 3000);
//       } catch (err) {
//         setCopySuccess("Failed to copy");
//         setTimeout(() => setCopySuccess(null), 3000);
//       }
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-6 text-center text-[#19485F]">
//           Upload Image
//         </h2>
//         <div className="mb-4">
//           <label
//             htmlFor="file-upload"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Choose File
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             onChange={handleFileChange}
//             className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
//             ref={fileInputRef}
//           />
//         </div>
//         <motion.button
//           onClick={handleUpload}
//           disabled={!file || uploading}
//           className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
//             !file || uploading
//               ? "bg-gray-300 cursor-not-allowed"
//               : "bg-[#19485F] text-white hover:bg-opacity-90"
//           }`}
//           whileTap={{ scale: 0.95 }}
//         >
//           {uploading ? (
//             <>
//               <svg
//                 className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-white"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                 ></path>
//               </svg>
//               Uploading...
//             </>
//           ) : (
//             "Upload"
//           )}
//         </motion.button>
//         {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
//         {uploadedUrl && (
//           <div className="mt-4">
//             <p className="text-green-600 mb-2">Image uploaded successfully!</p>
//             <div className="flex items-center mb-2">
//               <input
//                 type="text"
//                 value={uploadedUrl}
//                 readOnly
//                 className="flex-grow px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
//               />
//               <motion.button
//                 onClick={copyToClipboard}
//                 className="ml-2 bg-[#19485F] text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors"
//                 whileTap={{ scale: 0.95 }}
//               >
//                 Copy
//               </motion.button>
//             </div>
//             {copySuccess && (
//               <p className="text-green-600 text-sm">{copySuccess}</p>
//             )}
//             <img src={uploadedUrl} alt="Uploaded" className="w-full rounded" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setError(null);

    const filename = encodeURIComponent(file.name);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(`/api/upload?filename=${filename}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      setUploadedUrl(data.url);

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setFile(null);
    } catch (error) {
      console.error("Error uploading file:", error);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const copyToClipboard = async () => {
    if (uploadedUrl) {
      try {
        await navigator.clipboard.writeText(uploadedUrl);
        setCopySuccess(true);

        if (copyTimeoutRef.current) {
          clearTimeout(copyTimeoutRef.current);
        }

        copyTimeoutRef.current = setTimeout(() => {
          setCopySuccess(false);
        }, 20000);
      } catch (err) {
        console.error("Failed to copy: ", err);
        setError("Failed to copy to clipboard");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#19485F]">
          Upload Image
        </h2>
        <div className="mb-4">
          <label
            htmlFor="file-upload"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Choose File
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleFileChange}
            className="block w-full px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
            ref={fileInputRef}
          />
        </div>
        <motion.button
          onClick={handleUpload}
          disabled={!file || uploading}
          className={`w-full py-2 px-4 rounded-md flex items-center justify-center ${
            !file || uploading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-[#19485F] text-white hover:bg-opacity-90"
          }`}
          whileTap={{ scale: 0.95 }}
        >
          {uploading ? (
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
              Uploading...
            </>
          ) : (
            "Upload"
          )}
        </motion.button>
        {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
        {uploadedUrl && (
          <div className="mt-4">
            <p className="text-green-600 mb-2">Image uploaded successfully!</p>
            <div className="flex items-center mb-2">
              <input
                type="text"
                value={uploadedUrl}
                readOnly
                className="flex-grow px-3 py-2 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-[#19485F] transition-colors"
              />
              <motion.button
                onClick={copyToClipboard}
                className={`ml-2 py-2 px-4 rounded-md text-white transition-colors ${
                  copySuccess
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-[#19485F] hover:bg-opacity-90"
                }`}
                whileTap={{ scale: 0.95 }}
              >
                {copySuccess ? "Copied!" : "Copy"}
              </motion.button>
            </div>
            <img src={uploadedUrl} alt="Uploaded" className="w-full rounded" />
          </div>
        )}
      </div>
    </div>
  );
}
