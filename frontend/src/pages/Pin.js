import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PinChangeScreen = () => {
  const navigate = useNavigate();
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [showBalance, setShowBalance] = useState(false);
  const accountBalance = "12,345.00";
  
  // Handle PIN input with 4 character limit
  const handlePinInput = (value, setter) => {
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setter(value);
    }
  };
    
  // Handle accept button press
  const handleAccept = () => {
    if (newPin !== confirmPin) {
      alert("New PINs do not match!");
      return;
    }
    if (newPin.length !== 4) {
      alert("PIN must be 4 digits!");
      return;
    }
    alert("PIN changed successfully!");
    navigate('/atm');
  };
  
  // Handle cancel button press
  const handleCancel = () => {
    navigate('/atm');
  };
  
  // Custom Eye icons to replace react-icons
  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
      <circle cx="12" cy="12" r="3"></circle>
    </svg>
  );
  
  const EyeSlashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
      <line x1="1" y1="1" x2="23" y2="23"></line>
    </svg>
  );
  
  return (
    <div className="min-h-screen bg-black flex font-sans">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 relative animate-reveal">
            <div className="relative">
              <h1 className="text-6xl font-black tracking-tighter leading-none">
                <div className="relative inline-block">
                  <span className="text-white relative z-10">BANK</span>
                  <div className="absolute -right-2 top-0 w-4 h-4 bg-red-500 rounded-sm -rotate-12"></div>
                </div>
                <div className="relative">
                  <span className="text-white relative z-10">TUAH</span>
                  <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-red-500"></div>
                </div>
              </h1>
            </div>
            <p className="text-zinc-600 text-lg mt-2">Mobile ATM</p>
          </div>
          
          {/* Change PIN Title */}
          <div className="mb-6 animate-reveal" style={{ animationDelay: "100ms" }}>
            <h2 className="text-white text-xl">Change Pin</h2>
          </div>
          
          {/* PIN inputs */}
          <div className="space-y-3 mb-6">
            <div className="animate-reveal" style={{ animationDelay: "200ms" }}>
              <input 
                type="password" 
                value={currentPin}
                onChange={(e) => handlePinInput(e.target.value, setCurrentPin)}
                maxLength={4}
                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl 
                          text-white px-4 py-3 focus:outline-none focus:border-red-500"
                placeholder="Current Pin" 
              />
            </div>
            
            <div className="animate-reveal" style={{ animationDelay: "300ms" }}>
              <input 
                type="password" 
                value={newPin}
                onChange={(e) => handlePinInput(e.target.value, setNewPin)}
                maxLength={4}
                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl 
                          text-white px-4 py-3 focus:outline-none focus:border-red-500"
                placeholder="New Pin" 
              />
            </div>
            
            <div className="animate-reveal" style={{ animationDelay: "400ms" }}>
              <input 
                type="password" 
                value={confirmPin}
                onChange={(e) => handlePinInput(e.target.value, setConfirmPin)}
                maxLength={4}
                className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl 
                          text-white px-4 py-3 focus:outline-none focus:border-red-500"
                placeholder="Confirm New Pin"
              />
            </div>
          </div>    
          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6 animate-reveal" style={{ animationDelay: "700ms" }}>
            <button 
              onClick={handleCancel}
              className="bg-yellow-500 text-black font-medium py-3 rounded-xl
                       transition-transform hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button 
              onClick={handleAccept}
              className="bg-green-500 text-black font-medium py-3 rounded-xl
                       transition-transform hover:scale-[1.02]"
            >
              Accept
            </button>
          </div>
          
          {/* Balance section */}
          <div className="animate-reveal" style={{ animationDelay: "800ms" }}>
            <div className="flex items-center justify-between bg-zinc-900/30 px-4 py-3 rounded-xl">
              <span className="text-zinc-400">Account Balance:</span>
              <div className="flex items-center">
                {showBalance ? (
                  <span className="text-white font-medium mr-2">£{accountBalance}</span>
                ) : (
                  <span className="text-white font-medium mr-2">******</span>
                )}
                <button 
                  onClick={() => setShowBalance(!showBalance)}
                  className="text-zinc-500 hover:text-white transition-colors"
                >
                  {showBalance ? <EyeSlashIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinChangeScreen;