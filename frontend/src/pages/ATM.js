import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaMoneyBillWave, FaMoneyBill, FaKey, FaEllipsisH } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ATM = () => {
    const navigate = useNavigate();
// CONSTANTS SHOULD BE REPLACED BY BACKEND!!!
    const [showBalance, setShowBalance] = useState(false);
    const accountBalance = "1,234.56";
    const atmLocation = "Perth Road ATM"; 

// Navigation of the Withdrawl
    const handleWithdraw = () => {
        navigate('/withdraw');
    };

// Navigation of the Deposit
    const handleDeposit = () => {
        navigate('/deposit');
    };

  return (
    <div className="min-h-screen bg-black flex font-sans">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-10 relative animate-reveal">
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
            <p className="text-zinc-600 text-lg mt-2">Welcome to {atmLocation}</p>
          </div>

          {/* Main actions */}
          <div className="space-y-4 mb-8">
            <div className="animate-reveal" style={{ animationDelay: "200ms" }}>
              <button 
                className="w-full group"
                onClick={(handleDeposit)}>
                <div className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                          backdrop-blur-sm transition-all duration-300
                          group-hover:bg-zinc-800/50">
                  <FaMoneyBillWave className="text-red-500 text-lg" />
                  <span className="text-white text-lg ml-4">Deposit Cash</span>
                </div>
              </button>
            </div>

            <div className="animate-reveal" style={{ animationDelay: "300ms" }}>
              <button 
                className="w-full group"
                onClick={handleWithdraw}>
                <div className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                          backdrop-blur-sm transition-all duration-300
                          group-hover:bg-zinc-800/50">
                  <FaMoneyBill className="text-red-500 text-lg" />
                  <span className="text-white text-lg ml-4">Withdraw Cash</span>
                </div>
              </button>
            </div>
          </div>

          {/* Secondary actions */}
          <div className="space-y-4 mb-8">
            <div className="animate-reveal" style={{ animationDelay: "400ms" }}>
              <button className="w-full group">
                <div className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                          backdrop-blur-sm transition-all duration-300
                          group-hover:bg-zinc-800/50">
                  <FaKey className="text-red-500 text-lg" />
                  <span className="text-white text-lg ml-4">Change Pin</span>
                </div>
              </button>
            </div>

            <div className="animate-reveal" style={{ animationDelay: "500ms" }}>
              <button className="w-full group">
                <div className="flex items-center bg-zinc-900/50 h-16 px-6 rounded-2xl 
                          backdrop-blur-sm transition-all duration-300
                          group-hover:bg-zinc-800/50">
                  <FaEllipsisH className="text-red-500 text-lg" />
                  <span className="text-white text-lg ml-4">More Options</span>
                </div>
              </button>
            </div>
          </div>

          {/* Balance section */}
          <div className="animate-reveal" style={{ animationDelay: "600ms" }}>
            <div className="flex items-center justify-between bg-zinc-900/30 px-6 py-4 rounded-2xl mt-6">
              <span className="text-zinc-400">Account Balance:</span>
              <div className="flex items-center">
                {showBalance ? (
                  <span className="text-white font-medium mr-2">${accountBalance}</span>
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

export default ATM;