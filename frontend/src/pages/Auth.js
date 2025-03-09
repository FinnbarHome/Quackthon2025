import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { startAuthentication } from "@simplewebauthn/browser";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      setIsLoading(true);

      // Create authentication options
      const authenticationOptions = {
        challenge: window.crypto.getRandomValues(new Uint8Array(32)),
        timeout: 60000,
        userVerification: "required",
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
      };

      // Start authentication using SimpleWebAuthn
      await startAuthentication(authenticationOptions);

      // If we get here, biometric check was successful
      setIsLoading(false);
      setIsSuccess(true);
      setStatusMessage("Identity verified successfully!");

      // Wait 2 seconds before navigating
      setTimeout(() => {
        navigate("/scan-rfd");
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      setStatusMessage("Biometric verification failed");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-md text-center content-hidden animate-reveal">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">
              Verifying Identity
            </h2>
            <p
              className={`text-lg ${
                isSuccess ? "text-green-500" : "text-zinc-400"
              }`}
            >
              {isLoading
                ? "Please verify your identity using biometrics"
                : statusMessage || "Opening authentication prompt..."}
            </p>
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
