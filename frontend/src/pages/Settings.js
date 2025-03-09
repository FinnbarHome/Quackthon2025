import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import { FaChevronLeft } from "react-icons/fa";

const Settings = () => {
  const navigate = useNavigate();
  const { clearUser } = useUser();

  const handleLogout = () => {
    clearUser(); // This will clear both context and localStorage
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="mb-4 content-hidden animate-reveal">
            <button
              onClick={() => navigate("/atm")}
              className="flex items-center text-zinc-500 hover:text-white transition-colors group"
            >
              <FaChevronLeft className="mr-2" />
              <span className="relative">
                Back
                <div
                  className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r 
                             from-red-500 via-red-400 to-red-500 opacity-0 
                             group-hover:opacity-100 transition-all duration-300
                             rounded-full animate-shimmer"
                ></div>
              </span>
            </button>
          </div>

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
            <p className="text-zinc-600 text-xl mt-2">Settings</p>
          </div>

          {/* Logout Button */}
          <div
            className="content-hidden animate-reveal"
            style={{ animationDelay: "200ms" }}
          >
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white font-medium py-4 rounded-xl
                       transition-transform hover:scale-[1.02] text-lg"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
