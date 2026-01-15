"use client";

import { useState } from "react";
import Toast from "../components/Toast";
import Link from "next/link";

function ContactPage() {
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setShowToast(true);
        e.target.reset();
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col px-4 py-8">
      <Link href="/" className="mb-6 inline-block text-h3">
        ← Retour
      </Link>
      {showToast && (
        <Toast message="Message sent successfully" type="success" />
      )}

      <h1 className="text-h1 leading-none">Contact</h1>
      <h3 className="text-h3">
        You can contact me through{" "}
        <a
          className="md:opacity-100 opacity-70 md:hover:opacity-70 md:transition-opacity"
          href="https://www.instagram.com/thomas.obj/"
        >
          Instagram
        </a>
        ,{" "}
        <a
          className="md:opacity-100 opacity-70 md:hover:opacity-70 md:transition-opacity"
          href="https://www.linkedin.com/in/thomas-gaudin-ch/"
        >
          LinkedIn
        </a>{" "}
        or by filling out the form below.
      </h3>

      <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
        <div>
          {/* <label className="text-sm font-medium">Nom</label> */}
          <input
            name="name"
            required
            className=" w-full rounded-xl border px-4 py-3 outline-none focus:ring"
            placeholder="Name"
          />
        </div>

        <div>
          {/* <label className="text-sm font-medium">Email</label> */}
          <input
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring"
            placeholder="Your@email.com"
          />
        </div>

        <div>
          {/* <label className="text-sm font-medium">Message</label> */}
          <textarea
            name="message"
            required
            rows={6}
            className="mt-1 w-full rounded-xl border px-4 py-3 outline-none focus:ring"
            placeholder="Your message..."
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-xl bg-black px-4 py-3 text-white hover:opacity-90 disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
}

export default ContactPage;
