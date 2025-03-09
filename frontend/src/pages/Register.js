import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import ApiClient from "../utils/apiClient";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [customerNumber, setCustomerNumber] = useState(null);
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      // Generate random number between 1 and 999999
      const generatedCustomerNumber = Math.floor(Math.random() * 999999) + 1;
      // Pad with leading zeros to ensure 6 digits
      const paddedCustomerNumber = generatedCustomerNumber
        .toString()
        .padStart(6, "0");

      const response = await ApiClient.post("/api/auth/register", {
        customerNumber: paddedCustomerNumber,
        password: formData.password,
      });

      setCustomerNumber(paddedCustomerNumber);
      setRegistrationComplete(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Password validation regex
  const passwordRequirements = {
    length: formData.password.length >= 12,
    number: /\d/.test(formData.password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password),
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-black flex font-viga">
        <div className="w-full flex items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="mb-8 relative content-hidden animate-reveal">
              <div className="relative">
                <h1 className="text-7xl font-black tracking-tighter leading-none font-alatsi">
                  <div className="relative inline-block">
                    <span className="text-white relative z-10">BANK</span>
                    <div className="absolute -right-3 top-0 w-6 h-6 bg-red-500 rounded-sm -rotate-12"></div>
                  </div>
                  <div className="relative">
                    <span className="text-white relative z-10">TUAH</span>
                    <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-500"></div>
                  </div>
                </h1>
              </div>
              <p className="text-zinc-600 text-xl mt-2">
                Registration Complete
              </p>
            </div>

            <div
              className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-6 mb-6 content-hidden animate-reveal"
              style={{ animationDelay: "200ms" }}
            >
              <h2 className="text-white text-xl mb-4 text-center">
                Your Customer Number
              </h2>
              <div className="bg-zinc-800/50 rounded-xl p-4 mb-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500">
                    {customerNumber}
                  </div>
                </div>
              </div>
              <p className="text-zinc-400 text-sm text-center">
                Please save this number - you'll need it to log in!
              </p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-red-500 text-white font-medium py-4 rounded-xl
                       transition-transform hover:scale-[1.02] text-lg content-hidden animate-reveal"
              style={{ animationDelay: "400ms" }}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 relative content-hidden animate-reveal">
            <div className="relative">
              <h1 className="text-7xl font-black tracking-tighter leading-none font-alatsi">
                <div className="relative inline-block">
                  <span className="text-white relative z-10">BANK</span>
                  <div className="absolute -right-3 top-0 w-6 h-6 bg-red-500 rounded-sm -rotate-12"></div>
                </div>
                <div className="relative">
                  <span className="text-white relative z-10">TUAH</span>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-12 bg-red-500"></div>
                </div>
              </h1>
            </div>
            <p className="text-zinc-600 text-xl mt-2">Create Account</p>
          </div>

          {/* After the header, before the error message */}
          <div
            className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 mb-6 content-hidden animate-reveal"
            style={{ animationDelay: "100ms" }}
          >
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <p className="text-zinc-400 text-sm">
                  A unique 6-digit customer number will be generated for you
                  after registration. You'll need this number to log in to your
                  account.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 animate-reveal">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Password Input */}
            <div
              className="content-hidden animate-reveal"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative">
                <div className="flex items-center bg-zinc-900/50 border border-zinc-700 h-16 px-6 rounded-xl">
                  <FaLock className="text-red-500 text-lg" />
                  <input
                    type={showPasswords.password ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                    maxLength="16"
                    className="bg-transparent text-white text-lg w-full ml-4 
                             placeholder-zinc-600 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("password")}
                    className="text-zinc-400 hover:text-zinc-300 transition-colors"
                  >
                    {showPasswords.password ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div
              className="content-hidden animate-reveal"
              style={{ animationDelay: "300ms" }}
            >
              <div className="relative">
                <div className="flex items-center bg-zinc-900/50 border border-zinc-700 h-16 px-6 rounded-xl">
                  <FaLock className="text-red-500 text-lg" />
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    placeholder="Confirm Password"
                    maxLength="16"
                    className="bg-transparent text-white text-lg w-full ml-4 
                             placeholder-zinc-600 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility("confirmPassword")}
                    className="text-zinc-400 hover:text-zinc-300 transition-colors"
                  >
                    {showPasswords.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div
              className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-4 content-hidden animate-reveal"
              style={{ animationDelay: "400ms" }}
            >
              <div className="space-y-2 text-sm">
                <p
                  className={
                    passwordRequirements.length
                      ? "text-green-500"
                      : "text-zinc-400"
                  }
                >
                  • Must have 12 characters or more
                </p>
                <p
                  className={
                    passwordRequirements.number
                      ? "text-green-500"
                      : "text-zinc-400"
                  }
                >
                  • Must have a number
                </p>
                <p
                  className={
                    passwordRequirements.specialChar
                      ? "text-green-500"
                      : "text-zinc-400"
                  }
                >
                  • Must have a special character
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="grid grid-cols-2 gap-3 content-hidden animate-reveal"
              style={{ animationDelay: "500ms" }}
            >
              <button
                type="button"
                onClick={() => navigate("/")}
                className="bg-transparent text-white border-2 border-red-500 font-medium py-4 rounded-xl
                         transition-all hover:bg-red-500 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-500 text-white font-medium py-4 rounded-xl
                         transition-transform hover:scale-[1.02]"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2">Processing</span>
                    <span className="flex space-x-1">
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0s" }}
                      >
                        .
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      >
                        .
                      </span>
                      <span
                        className="animate-bounce"
                        style={{ animationDelay: "0.4s" }}
                      >
                        .
                      </span>
                    </span>
                  </span>
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
