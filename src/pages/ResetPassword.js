import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function ResetPassword({ onBackToLogin }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/send-otp", { phone });
      setMessage("OTP sent to your phone number.");
      setStep(2);
    } catch (err) {
      setMessage(
        "Failed to send OTP: " + (err.response?.data || err.message || "Error")
      );
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/auth/reset-password", {
        phone,
        otp,
        newPassword,
      });
      setMessage("Password reset successful! You can now login.");
      setStep(3);
    } catch (err) {
      setMessage(
        "Failed to reset password: " + (err.response?.data || err.message || "Error")
      );
    }
  };

  return (
    <form
      onSubmit={step === 1 ? handleSendOtp : handleResetPassword}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md mx-auto flex flex-col items-center"
    >
      <h2 className="text-2xl font-bold text-center mb-6 text-red-600">
        Reset Password
      </h2>

      {step === 1 && (
        <input
          type="text"
          placeholder="Phone (07XXXXXXXX)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg"
          required
        />
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
            required
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
            required
          />
        </>
      )}

      {step !== 3 && (
        <button
          type="submit"
          className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition mb-3"
        >
          {step === 1 ? "Send OTP" : "Reset Password"}
        </button>
      )}

      <div className="mt-3 w-full flex justify-center text-sm">
        <button
          type="button"
          onClick={onBackToLogin}
          className="flex items-center text-red-600 hover:underline"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Login
        </button>
      </div>

      {message && (
        <p
          className={`mt-4 text-center font-semibold ${
            message.includes("successful") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
