import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const WithdrawScreen = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("£10");
  const [customAmount, setCustomAmount] = useState("");
  const [showBalance, setShowBalance] = useState(true);
  const accountBalance = "12,345.00";
  
  // Handle quick withdrawal buttons
  const handleQuickAmount = (value) => {
    setAmount(`£${value}`);
    setCustomAmount("");
  };
  
  // Handle custom amount input
  const handleCustomInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setCustomAmount(value);
  
    // Check if the input is valid using re.
    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(`£${parseInt(value, 10) || 0}`); // Set the amount to the int
    } else {
      setAmount(value ? `£${parseInt(value, 10) || 0}` : "£0"); // if the amount is empty, set it to £0 rather than NaN.
    }
  };
  
  // HANDLE WITHDRAWL OF FUNDS HERE!!!
  const handleWithdraw = () => {
    alert(`Withdrawing ${amount}`); // Implementation would handle the actual withdrawal
  };
  
  // Navigate back to main screen
  const handleCancel = () => {
    navigate("/atm");
  };

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
          </div>
          
          {/* Quick Withdrawal */}
          <div className="mb-6 animate-reveal" style={{ animationDelay: "100ms" }}>
            <p className="text-zinc-400 mb-3">Quick Withdrawal:</p>
            <div className="grid grid-cols-3 gap-3">
              {[5, 10, 20, 50, 100, 200].map((value, index) => (
                <button 
                  key={value}
                  onClick={() => handleQuickAmount(value)}
                  className={`py-3 rounded-xl border border-zinc-700 transition-all
                            ${amount === `£${value}` 
                              ? 'bg-zinc-800 text-white border-red-500' 
                              : 'bg-zinc-900/30 text-zinc-300 hover:bg-zinc-800/50'}`}
                  style={{ animationDelay: `${150 + (index * 50)}ms` }}
                >
                  £{value}
                </button>
              ))}
            </div>
          </div>
          
          {/* Custom Amount */}
          <div className="mb-6 animate-reveal" style={{ animationDelay: "500ms" }}>
            <p className="text-zinc-400 mb-2">Custom:</p>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">£</span>
              <input 
                type="text"
                value={customAmount}
                onChange={handleCustomInput}
                className="w-full bg-zinc-900/30 border border-zinc-700 rounded-xl 
                         text-white px-8 py-3 focus:outline-none focus:border-red-500"
                placeholder="0"
              />
            </div>
          </div>
          
          {/* Amount Display */}
          <div className="mb-6 animate-reveal" style={{ animationDelay: "600ms" }}>
            <p className="text-zinc-400 mb-2">Amount:</p>
            <div className="text-right text-white text-xl font-medium pr-2">
              {amount}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6 animate-reveal" style={{ animationDelay: "700ms" }}>
            <button 
              onClick={handleCancel}
              className="bg-yellow-500 text-black font-medium py-3 rounded-xl
                       transition-transform hover:scale-[1.02]"
            >
              Cancel
            </button>
            <button 
              onClick={handleWithdraw}
              className="bg-green-500 text-black font-medium py-3 rounded-xl
                       transition-transform hover:scale-[1.02]"
            >
              Withdraw
            </button>
          </div>
          
          {/* Balance */}
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
                  {showBalance ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithdrawScreen;