import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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

      const publicKeyCredentialCreationOptions = {
        challenge: window.crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: "Bank Tuah",
        },
        user: {
          id: new TextEncoder().encode("testuser"),
          name: "testuser",
          displayName: "Test User",
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7,
          },
          {
            type: "public-key",
            alg: -257,
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      };

      const credential = await navigator.credentials.create({
        publicKey: publicKeyCredentialCreationOptions,
      });

      // If we get here, biometric check was successful
      setIsLoading(false);
      setIsSuccess(true);
      setStatusMessage("Identity verified successfully!");

      // Wait 2 seconds before navigating
      setTimeout(() => {
        navigate("/scan");
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
