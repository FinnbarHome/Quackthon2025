import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt, FaEye, FaEyeSlash } from "react-icons/fa";
import ApiClient from "../utils/apiClient";
import { useUser } from "../contexts/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    customerNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const savedCredentials = localStorage.getItem("userCredentials");
    if (savedCredentials) {
      const credentials = JSON.parse(savedCredentials);
      if (credentials.token) {
        updateUser(credentials);
        navigate("/auth");
      }
    }
  }, [navigate, updateUser]);

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
    try {
      const data = await ApiClient.post("/api/auth/login", {
        customerNumber: formData.customerNumber,
        password: formData.password,
      });

      // First store the token
      localStorage.setItem("token", data.token);

      // Create a user object with all the data we want to store
      const userCredentials = {
        customerNumber: formData.customerNumber,
        token: data.token,
        balance: data.balance || 0,
      };

      // Update both localStorage and context
      localStorage.setItem("userCredentials", JSON.stringify(userCredentials));
      updateUser(userCredentials);

      navigate("/auth");
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Invalid customer number or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-20 relative content-hidden animate-reveal">
            <div className="relative">
              <h1 className="text-8xl font-black tracking-tighter leading-none font-alatsi">
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
            <p className="text-zinc-600 text-xl mt-2">Withdraw that thang</p>
          </div>

          {error && (
            <div
              className="bg-red-500/10 border border-red-500/50 rounded-xl p-4
                        animate-reveal content-hidden"
              style={{ animationDelay: "100ms" }}
            >
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

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
                        name="customerNumber"
                        value={formData.customerNumber}
                        onChange={handleChange}
                        required
                        placeholder="Customer Number"
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        placeholder="Password"
                        className="bg-transparent text-white text-lg w-full ml-4 
                                 placeholder-zinc-600 focus:outline-none rounded-xl
                                 relative z-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="text-zinc-400 hover:text-zinc-300 transition-colors"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-500 h-16 text-lg font-semibold text-white
                         relative overflow-hidden rounded-2xl group
                         transition-transform duration-300 hover:scale-[1.02]
                         content-hidden animate-reveal "
                style={{ animationDelay: "600ms" }}
              >
                <span className="relative z-10 inline-flex items-center">
                  {isLoading ? (
                    <>
                      Verifying
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
                    "LOGIN"
                  )}
                </span>
              </button>

              <div
                className="flex items-center justify-between text-base content-hidden animate-reveal"
                style={{ animationDelay: "800ms" }}
              >
                <button
                  type="button"
                  className="text-zinc-500 hover:text-white transition-colors 
                           relative group rounded-lg px-2 py-1 overflow-hidden"
                >
                  Forgot Password
                  <div
                    className="absolute -bottom-0.5 left-2 right-2 h-px bg-gradient-to-r 
                                 from-red-500 via-red-400 to-red-500 opacity-0 
                                 group-hover:opacity-100 transition-all duration-300
                                 rounded-full animate-shimmer"
                  ></div>
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="text-zinc-500 hover:text-white transition-colors 
                           relative group rounded-lg px-2 py-1 overflow-hidden"
                >
                  Register
                  <div
                    className="absolute -bottom-0.5 left-2 right-2 h-px bg-gradient-to-r 
                                 from-red-500 via-red-400 to-red-500 opacity-0 
                                 group-hover:opacity-100 transition-all duration-300
                                 rounded-full animate-shimmer"
                  ></div>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
