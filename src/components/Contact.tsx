"use client";

import { useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { motion } from "framer-motion";
import { sendEmail } from "../app/actions";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="bg-[#D9E0A4] text-[#19485F] py-2 px-4 rounded-full hover:bg-opacity-80 transition-colors flex items-center justify-center"
      disabled={pending}
    >
      {pending ? (
        <>
          <svg
            className="animate-spin-slow -ml-1 mr-3 h-5 w-5 text-[#19485F]"
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
          Sending Message...
        </>
      ) : (
        "Send Message"
      )}
    </button>
  );
}

export default function Contact() {
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setFormStatus({ type: "success", message: result.message });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        setFormStatus({ type: "error", message: result.message });
      }
    } catch (error) {
      console.error(error);
      setFormStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    }
  }

  return (
    <section className="py-20 bg-[#19485F] text-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-8 text-center"
        >
          Contact Me
        </motion.h2>
        <motion.form
          ref={formRef}
          action={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto"
        >
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#D9E0A4]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#D9E0A4]"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-[#D9E0A4]"
              required
            ></textarea>
          </div>
          <SubmitButton />
          {formStatus && (
            <p
              className={`mt-4 text-center ${
                formStatus.type === "success"
                  ? "text-green-400"
                  : "text-red-400"
              }`}
            >
              {formStatus.message}
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}
