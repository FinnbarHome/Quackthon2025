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
      setIsLoading(true);
      log("Starting biometric check...");

      // Check secure context
      log(`Secure context: ${window.isSecureContext}`);
      log(`Current protocol: ${window.location.protocol}`);
      log(`Current hostname: ${window.location.hostname}`);
      log(`User Agent: ${navigator.userAgent}`);

      // Check WebAuthn support
      const webAuthnSupported = browserSupportsWebAuthn();
      log(`WebAuthn supported: ${webAuthnSupported}`);
      log(`PublicKeyCredential available: ${!!window.PublicKeyCredential}`);

      if (!webAuthnSupported) {
        log("WebAuthn is not supported");
        setDebugMessage(
          "WebAuthn is not supported. This could be because:\n" +
            "1. Not using HTTPS/localhost\n" +
            "2. Chrome permissions not granted\n" +
            "3. Chrome version too old"
        );
        navigate("/");
        return;
      }

      // Check if platform authenticator is available (biometric sensors)
      try {
        const platformAuthAvailable = await platformAuthenticatorIsAvailable();
        log(`Platform authenticator details:`);
        log(`- Available: ${platformAuthAvailable}`);
        if (window.PublicKeyCredential) {
          const isUserVerifyingPlatformAuthenticatorAvailable =
            await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
          log(
            `- User verifying platform authenticator: ${isUserVerifyingPlatformAuthenticatorAvailable}`
          );
        }

        if (!platformAuthAvailable) {
          log("Platform authenticator is not available");
          setDebugMessage(
            "Biometric authentication is not available on this device"
          );
          navigate("/");
          return;
        }
      } catch (error) {
        log(`Error checking platform authenticator: ${error.message}`);
        setDebugMessage(
          `Error checking biometric availability: ${error.message}`
        );
        navigate("/");
        return;
      }

      // Add debug logging for credentials
      const storedCredentials = localStorage.getItem("userCredentials");
      log(`Stored credentials: ${storedCredentials}`);

      if (!storedCredentials) {
        log("No stored credentials");
        navigate("/");
        return;
      }

      const { id, username } = JSON.parse(storedCredentials);
      log(`Parsed ID: ${id}, Username: ${username}`);

      // Create the credential options
      const publicKeyCredentialCreationOptions = {
        challenge: window.crypto.getRandomValues(new Uint8Array(32)),
        rp: {
          name: "Bank Tuah",
        },
        user: {
          id: new TextEncoder().encode(id),
          name: username,
          displayName: username,
        },
        pubKeyCredParams: [
          {
            type: "public-key",
            alg: -7, // ES256
          },
          {
            type: "public-key",
            alg: -257, // RS256
          },
        ],
        authenticatorSelection: {
          authenticatorAttachment: "platform",
          userVerification: "required",
        },
        timeout: 60000,
      };

      log("Starting registration...");
      try {
        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions,
        });

        if (credential) {
          log("Registration successful!");
          console.log("Credential:", credential);

          // Store the credential ID
          localStorage.setItem("credentialId", credential.id);

          navigate("/scan-rfd");
        } else {
          throw new Error("No credential returned");
        }
      } catch (error) {
        log(`Registration error: ${error.message}`);
        console.error("Registration failed:", error);
        setDebugMessage(`Registration failed: ${error.message}`);
      }
    } catch (error) {
      log(`Process error: ${error.message}`);
      console.error("Process failed:", error);
      setDebugMessage(`Process failed: ${error.message}`);
      navigate("/");
    } finally {
      setIsLoading(false);
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
