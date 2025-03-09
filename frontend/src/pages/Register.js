import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
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

  if (registrationComplete) {
    return (
      <div className="min-h-screen bg-black flex justify-center items-center font-viga">
        <div className="w-full max-w-md p-8 text-center">
          <div className="mb-8 animate-reveal">
            <h2 className="text-4xl font-bold text-white mb-4">
              Registration Successful!
            </h2>
            <div className="bg-zinc-900/50 p-8 rounded-2xl backdrop-blur-sm mb-8">
              <p className="text-zinc-400 mb-4">Your Customer Number is:</p>
              <p className="text-5xl font-bold text-red-500 mb-4">
                {customerNumber}
              </p>
              <p className="text-zinc-400">
                Please save this number - you'll need it to log in!
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate("/")}
            className="w-full bg-red-500 h-16 text-lg font-semibold text-white
                     rounded-2xl hover:scale-[1.02] transition-transform duration-300"
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex justify-center items-center font-viga">
      <div className="w-full flex p-8">
        <div className="w-full max-w-md">
          <div className="mb-8 relative content-hidden animate-reveal">
            <h1 className="text-8xl sm:text-6xl font-black tracking-tighter leading-none font-alatsi">
              <span className="text-white relative z-10">REGISTER</span>
            </h1>
            <p className="text-zinc-600 text-xl mt-2">Create your account</p>
            <div className="mt-4 text-zinc-400 text-sm bg-zinc-900/50 p-4 rounded-xl backdrop-blur-sm">
              <p>Set your password below.</p>
              <p>
                A unique customer number will be generated for you after
                registration.
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 animate-reveal">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-2">
              <div
                className="group content-hidden animate-reveal"
                style={{ animationDelay: "400ms" }}
              >
                <div className="animate-reveal animate-reveal-delay-2">
                  <div className="group">
                    <div
                      className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                                backdrop-blur-sm transition-all duration-300
                                group-hover:bg-zinc-800/50"
                    >
                      <FaLock className="text-red-500 text-lg" />
                      <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        maxLength="16"
                        className="bg-transparent text-white text-lg w-full ml-4 
                                 placeholder-zinc-600 focus:outline-none rounded-xl
                                 relative z-10"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="group content-hidden animate-reveal"
                style={{ animationDelay: "600ms" }}
              >
                <div className="animate-reveal animate-reveal-delay-3">
                  <div className="group">
                    <div
                      className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                                backdrop-blur-sm transition-all duration-300
                                group-hover:bg-zinc-800/50"
                    >
                      <FaLock className="text-red-500 text-lg" />
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm Password"
                        maxLength="16"
                        className="bg-transparent text-white text-lg w-full ml-4 
                                 placeholder-zinc-600 focus:outline-none rounded-xl
                                 relative z-10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="text-white space-y-2">
              <p
                className={`${
                  passwordRequirements.length
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                - Must have 12 characters or more
              </p>
              <p
                className={`${
                  passwordRequirements.number
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                - Must have a number
              </p>
              <p
                className={`${
                  passwordRequirements.specialChar
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                - Must have a special character
              </p>
            </div>

            <div className="space-y-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 h-16 text-lg font-semibold text-white
                         relative overflow-hidden rounded-2xl group
                         transition-transform duration-300 hover:scale-[1.02]
                         content-hidden animate-reveal"
                style={{ animationDelay: "800ms" }}
              >
                <span className="relative z-10 inline-flex items-center">
                  {isLoading ? (
                    <>
                      Registering
                      <span className="inline-flex ml-2">
                        <span
                          className="animate-float"
                          style={{ animationDuration: "1s" }}
                        >
                          .
                        </span>
                        <span
                          className="animate-float"
                          style={{
                            animationDuration: "1s",
                            animationDelay: "0.2s",
                          }}
                        >
                          .
                        </span>
                        <span
                          className="animate-float"
                          style={{
                            animationDuration: "1s",
                            animationDelay: "0.4s",
                          }}
                        >
                          .
                        </span>
                      </span>
                    </>
                  ) : (
                    "REGISTER"
                  )}
                </span>
              </button>

              <button
                onClick={() => navigate("/")}
                className="w-full bg-transparent text-lg font-semibold text-white border-2 border-red-500 h-16 rounded-2xl hover:bg-red-500 hover:text-white transition-all duration-300"
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
