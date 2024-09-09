"use client";
import { useState } from "react";
import { signInWithProvider } from "../../utils/auth";
import { motion } from "framer-motion";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignInWithProvider = async (provider) => {
    try {
      const token = await signInWithProvider(provider);
      localStorage.setItem("token", token); // Store token in local storage
      window.location.href = "/dashboard"; // Redirect on successful login
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Handle email/password login
      const token = await signInWithProvider("email", email, password);
      localStorage.setItem("token", token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md"
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
          >
            Login
          </button>
        </form>
        <div className="mt-6 flex flex-col gap-4">
          <button
            onClick={() => handleSignInWithProvider("google")}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => handleSignInWithProvider("github")}
            className="w-full py-3 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900"
          >
            Sign in with GitHub
          </button>
        </div>
        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      </motion.div>
    </div>
  );
}
