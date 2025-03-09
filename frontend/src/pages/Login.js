import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUserAlt } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userEmail: "",
    password: "",
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
    try {
      console.log("Login attempted with:", formData);
      // Store credentials for future biometric login
      localStorage.setItem(
        "userCredentials",
        JSON.stringify({
          id: formData.customerNumber, // Store the user ID
          username: formData.customerNumber,
        })
      );
      navigate("/auth");
    } catch (error) {
      console.error("Login failed:", error);
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
            <p className="text-zinc-600 text-xl mt-2">Your ATM, Your Way</p>
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
                        placeholder="PIN"
                        maxLength="6"
                        className="bg-transparent text-white text-lg w-full ml-4 
                                 placeholder-zinc-600 focus:outline-none rounded-xl
                                 relative z-10"
                      />
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
                         content-hidden animate-reveal"
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
                  Forgot PIN
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
                  Don't have an account register!
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
