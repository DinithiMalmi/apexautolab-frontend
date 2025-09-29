import React, { useState } from "react";
import axios from "axios";

export default function Login({ onForgotPassword, onCreateAccount }) {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/auth/login", {
        phone,
        password,
      });
      setMessage(`Welcome, ${res.data.fullName}`);
    } catch (err) {
      setMessage(
        "Login failed: " + (err.response?.data || err.message || "Something went wrong")
      );
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md mx-auto flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        ApexAutoLab Login
      </h2>

      <input
        type="text"
        placeholder="Phone (07XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-3 mb-3 border rounded-lg"
        required
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-3 mb-3 border rounded-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
      >
        Login
      </button>

      <div className="mt-3 w-full flex justify-center text-sm">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-red-600 hover:underline"
        >
          Forgot Password?
        </button>
      </div>

      <div className="w-full border-t border-gray-300 my-3" />

      <button
        type="button"
        onClick={onCreateAccount}
        className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
      >
        Create New Account
      </button>

      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.startsWith("Welcome") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
