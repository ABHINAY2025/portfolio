import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import Fotter from "../home/Fotter";

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
  e.preventDefault();
  setLoading(true);

  emailjs
    .send(
      "service_9w569cb",
      "template_ne9lmwb",
      {
        name: formRef.current.name.value,
        email: formRef.current.email.value,
        message: formRef.current.message.value,
      },
      "Q-n2ALEwD_MZMJ9m3"
    )
    .then(
      () => {
        setSuccess(true);
        setLoading(false);
        formRef.current.reset();
      },
      (error) => {
        console.error("EmailJS Error:", error);
        setLoading(false);
      }
    );
};


  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen flex items-center justify-center px-6"
      >
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8">

          <h1 className="text-3xl font-semibold mb-2 text-black">
            Let’s talk 👋
          </h1>
          <p className="text-gray-600 mb-8">
            Have an idea, question, or opportunity? Drop a message.
          </p>

<form ref={formRef} onSubmit={sendEmail} className="space-y-6">

  {/* NAME */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Your Name
    </label>
    <input
      type="text"
      name="name"   // ✅ MUST MATCH {{name}}
      required
      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  {/* EMAIL */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Email Address
    </label>
    <input
      type="email"
      name="email"  // ✅ MUST MATCH {{email}}
      required
      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  {/* MESSAGE */}
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Message
    </label>
    <textarea
      name="message" // ✅ MATCHES {{message}}
      rows="4"
      required
      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
    />
  </div>

  <button
    type="submit"
    disabled={loading}
    className="w-full py-3 rounded-full bg-black text-white font-semibold"
  >
    {loading ? "Sending..." : "Send Message"}
  </button>

  {success && (
    <p className="text-green-600 text-center text-sm">
      Message sent successfully ✨
    </p>
  )}

</form>
        </div>
      </motion.div>

      <Fotter />
    </>
  );
}
