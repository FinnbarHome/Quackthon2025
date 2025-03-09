import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  startAuthentication,
  startRegistration,
  browserSupportsWebAuthn,
  platformAuthenticatorIsAvailable,
} from "@simplewebauthn/browser";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [debugMessage, setDebugMessage] = useState("");
  const [logs, setLogs] = useState([]);

  const log = (message) => {
    console.log(message);
    setLogs((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  useEffect(() => {
    handleBiometricAuth();
  }, []);

  const handleBiometricAuth = async () => {
    try {
      const publicKeyCredentialRequestOptions = {
        challenge: window.crypto.getRandomValues(new Uint8Array(32)),
        timeout: 60000,
        userVerification: "required",
      };

      log("Starting biometric check...");
      try {
        // Just try to get credentials - this will trigger biometric prompt
        const assertion = await navigator.credentials.get({
          publicKey: publicKeyCredentialRequestOptions,
        });

        // If we get here, biometric check was successful
        log("Biometric verification successful!");
        navigate("/scan-rfd"); // Navigate to next screen on success
      } catch (error) {
        log(`Biometric verification failed: ${error.message}`);
        setDebugMessage("Biometric verification failed");
        navigate("/"); // Navigate back on failure
      }
    } catch (error) {
      log(`Process error: ${error.message}`);
      setDebugMessage(`Process failed: ${error.message}`);
      navigate("/");
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
            <p className="text-zinc-400">
              {isLoading
                ? "Please verify your identity using biometrics"
                : "Opening authentication prompt..."}
            </p>
            {/* Debug message display */}
            {debugMessage && (
              <p className="text-sm text-red-500 mt-2">{debugMessage}</p>
            )}
          </div>

          <button
            onClick={() => navigate("/")}
            className="text-zinc-500 hover:text-white transition-colors"
          >
            Cancel
          </button>
        </div>

        <div className="w-full max-w-md mt-8 p-4 bg-zinc-900 rounded-lg">
          <h3 className="text-white text-sm font-mono mb-2">Debug Console:</h3>
          <div className="h-48 overflow-y-auto">
            {logs.map((log, index) => (
              <p key={index} className="text-xs font-mono text-zinc-400 mb-1">
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
