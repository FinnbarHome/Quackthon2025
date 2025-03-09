import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Registration attempted with:", formData);
      navigate("/"); // Navigate to a different page after successful registration
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Password validation regex
  const passwordRequirements = {
    length: formData.password.length >= 12, // At least 12 characters or more.
    number: /\d/.test(formData.password), // At least 1 number.
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), // At least one special character from the list.
  };

  return (
    <div className="min-h-screen bg-black flex justify-center items-center font-viga"> 
      <div className="w-full flex p-8">
        <div className="w-full max-w-md">
          <div className="mb-20 relative content-hidden animate-reveal">
            <h1 className="text-8xl sm:text-6xl font-black tracking-tighter leading-none font-alatsi"> {/* Modify the Register Text to fit smaller screens.*/}
              <span className="text-white relative z-10">REGISTER</span>
            </h1>
            <p className="text-zinc-600 text-xl mt-2">Create your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            <div className="space-y-2">
              <div
                className="group content-hidden animate-reveal"
                style={{ animationDelay: "200ms" }}
              >
                <div className="animate-reveal animate-reveal-delay-1">
                  <div className="group">
                    <div
                      className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                                backdrop-blur-sm transition-all duration-300
                                group-hover:bg-zinc-800/50"
                    >
                      <FaUserAlt className="text-red-500 text-lg" />
                      <input
                        type="text"
                        name="userEmail"
                        value={formData.userEmail}
                        onChange={handleChange}
                        required
                        placeholder="Email"
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
                  passwordRequirements.length ? "text-green-500" : "text-red-500"
                }`}
              >
                - Must have 12 characters or more
              </p>
              <p
                className={`${
                  passwordRequirements.number ? "text-green-500" : "text-red-500"
                }`}
              >
                - Must have a number
              </p>
              <p
                className={`${
                  passwordRequirements.specialChar ? "text-green-500" : "text-red-500"
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

              {/* Button to go back to the login page */}
              <button
                onClick={() => navigate("/")} //  Login is / (root) at the moment 
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
