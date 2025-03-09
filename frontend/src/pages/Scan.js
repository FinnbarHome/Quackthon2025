import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaWifi } from "react-icons/fa"; // Using wifi icon to represent NFC/contactless

const Scan = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [hasNFCSupport, setHasNFCSupport] = useState(false);

  useEffect(() => {
    // Check if Web NFC is supported
    if ("NDEFReader" in window) {
      setHasNFCSupport(true);
    }
  }, []);

  const startNFCScan = async () => {
    try {
      setIsScanning(true);
      setError(null);

      if (!window.NDEFReader) {
        throw new Error("NFC not supported");
      }

      const ndef = new window.NDEFReader();
      await ndef.scan();

      ndef.addEventListener("reading", ({ message, serialNumber }) => {
        console.log(`> Serial Number: ${serialNumber}`);
        setIsScanning(false);
        setIsSuccess(true);
        setTimeout(() => {
          navigate("/atm");
        }, 2000);
      });
    } catch (error) {
      setError("Error scanning NFC: " + error.message);
      setIsScanning(false);
    }
  };

  // Keep the simulate function for testing on unsupported devices
  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsSuccess(true);
      setTimeout(() => {
        navigate("/atm");
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md text-center">
          {error && <div className="mb-4 text-red-500 text-sm">{error}</div>}

          {!hasNFCSupport && (
            <div className="mb-4 text-yellow-500 text-sm">
              NFC not supported in this browser. Using simulation mode.
            </div>
          )}

          {!isSuccess ? (
            <div className="space-y-8 content-hidden animate-reveal">
              <div
                className={`w-48 h-48 mx-auto rounded-2xl border-4 
                ${
                  isScanning
                    ? "border-red-500 shadow-lg shadow-red-500/20"
                    : "border-zinc-800"
                }
                flex items-center justify-center transition-all duration-300`}
              >
                <div
                  className={`w-32 h-32 rounded-xl 
                  ${isScanning ? "bg-red-500/10" : "bg-zinc-900/50"}
                  flex items-center justify-center backdrop-blur-sm transition-all duration-300`}
                >
                  <FaWifi
                    className={`w-16 h-16 ${
                      isScanning ? "text-red-500" : "text-zinc-700"
                    } transition-colors duration-300`}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-white">
                  {isScanning ? "Scanning..." : "Hold Phone Near RFD Tag"}
                </h2>
                <p className="text-zinc-600 text-xl">
                  {isScanning
                    ? "Keep your phone steady"
                    : "Position your phone close to the RFD tag to scan"}
                </p>
              </div>

              <button
                onClick={hasNFCSupport ? startNFCScan : simulateScan}
                className="w-full bg-red-500 h-16 text-lg font-semibold text-white
                         relative overflow-hidden rounded-2xl group
                         transition-transform duration-300 hover:scale-[1.02]"
              >
                <span className="relative z-10">
                  {hasNFCSupport ? "Scan NFC Tag" : "Simulate Successful Scan"}
                </span>
              </button>
            </div>
          ) : (
            <div className="space-y-6 animate-reveal">
              <div className="relative w-48 h-48 mx-auto">
                {/* Outer expanding rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full rounded-2xl border-4 border-red-500/30 animate-success-pulse"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-full h-full rounded-2xl border-4 border-red-500/30 animate-success-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>

                {/* Main success circle */}
                <div
                  className="relative w-full h-full rounded-2xl border-4 border-red-500 
                              flex items-center justify-center bg-black
                              shadow-lg shadow-red-500/30 animate-success-ring"
                >
                  {/* Success checkmark */}
                  <svg
                    className="w-24 h-24 text-red-500 animate-success-check"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2
                className="text-3xl font-bold text-white animate-reveal"
                style={{ animationDelay: "0.6s" }}
              >
                Scan Successful!
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scan;
