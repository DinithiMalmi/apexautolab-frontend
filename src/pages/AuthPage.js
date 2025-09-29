import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import ResetPassword from "./ResetPassword";

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState("login"); // "login" | "signup" | "reset"

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Branding */}
      <div className="hidden md:flex md:flex-1 flex-col justify-center items-start px-8 lg:px-16 bg-black text-white min-h-screen">
        <h1 className="text-red-600 text-5xl lg:text-6xl font-extrabold">ApexAutoLab</h1>
        <p className="mt-4 text-lg max-w-md">
          Connect with services and manage your account seamlessly.
        </p>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center bg-black min-h-screen px-4 sm:px-6">
        <div className="w-full max-w-md">
          {activeForm === "login" && (
            <Login
              onForgotPassword={() => setActiveForm("reset")}
              onCreateAccount={() => setActiveForm("signup")}
            />
          )}

          {activeForm === "signup" && (
            <Signup onBackToLogin={() => setActiveForm("login")} />
          )}

          {activeForm === "reset" && (
            <ResetPassword onBackToLogin={() => setActiveForm("login")} />
          )}
        </div>
      </div>
    </div>
  );
}
