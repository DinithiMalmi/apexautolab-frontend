import React, { useState } from "react";
import axios from "axios";

export default function OtpForm({
  phoneLabel = "Phone (07XXXXXXXX)",
  sendOtpUrl,
  verifyOtpUrl,
  onSuccess,
  additionalFields = [],
  submitLabel = "Submit",
}) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [additionalValues, setAdditionalValues] = useState(
    additionalFields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  // Step 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(sendOtpUrl, { phone });
      setMessage("OTP sent to your phone.");
      setStep(2);
    } catch (err) {
      setMessage("Failed to send OTP: " + (err.response?.data || "Error"));
    }
  };

  // Step 2: Verify OTP + submit
  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const payload = { phone, otp, ...additionalValues };
      await axios.post(verifyOtpUrl, payload);
      setMessage("Operation successful!");
      setStep(3);
      if (onSuccess) onSuccess();
    } catch (err) {
      setMessage("Failed: " + (err.response?.data || "Error"));
    }
  };

  const handleChangeAdditional = (e) => {
    setAdditionalValues({ ...additionalValues, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={step === 1 ? handleSendOtp : handleVerify}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-md w-full max-w-md mx-auto flex flex-col items-center"
    >
      {step === 1 && (
        <>
          <h2 className="text-2xl font-bold text-center mb-6 text-red-600">Enter Phone</h2>
          <input
            type="text"
            placeholder={phoneLabel}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition mb-3"
          >
            Send OTP
          </button>
        </>
      )}

      {step === 2 && (
        <>
          {additionalFields.map((field) => (
            <input
              key={field.name}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              value={additionalValues[field.name]}
              onChange={handleChangeAdditional}
              className="w-full p-3 mb-3 border rounded-lg"
              required
            />
          ))}
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 mb-3 border rounded-lg"
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition mb-3"
          >
            {submitLabel}
          </button>
        </>
      )}

      {step === 3 && (
        <p className="text-green-600 font-semibold text-center">
          Operation successful!
        </p>
      )}

      {message && <p className="mt-4 text-center text-gray-700">{message}</p>}
    </form>
  );
}
