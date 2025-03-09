import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ApiClient from "../utils/apiClient";

const WithdrawScreen = () => {
  const navigate = useNavigate();

  const { user, updateUser } = useUser();
  const [amount, setAmount] = useState("£10");
  const [customAmount, setCustomAmount] = useState("");
  const [cashRequested, setCashRequested] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const accountBalance = user?.balance || 0;
  const [transactionComplete, setTransactionComplete] = useState(false);

  const [showBalance, setShowBalance] = useState(false);
  const [withdrawalConfirmation, setWithdrawalConfirmation] = useState(false);

  // Handle quick withdrawal buttons
  const handleQuickAmount = (value) => {
    setAmount(`£${value}`);
    setCustomAmount("");
  };

  // Handle custom amount input
  const handleCustomInput = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setCustomAmount(value);

    if (/^\d*\.?\d{0,2}$/.test(value) || value === "") {
      setAmount(`£${parseInt(value, 10) || 0}`);
    } else {
      setAmount(value ? `£${parseInt(value, 10) || 0}` : "£0");
    }
  };

  // Handle withdraw request
  const handleWithdraw = () => {
    const withdrawAmount = parseFloat(amount.replace("£", ""));
    if (withdrawAmount > accountBalance) {
      setError("Insufficient funds");
      return;
    }
    setCashRequested(true);
  };

  // Handle accept withdraw after amount is confirmed
  const handleAccept = async () => {
    setIsLoading(true);
    setError("");

    if (!user?.token) {
      setError("Session expired. Please login again.");
      navigate("/");
      return;
    }

    try {
      const amountValue = parseFloat(amount.replace("£", ""));

      const response = await ApiClient.post(
        "/api/atm/withdraw",
        {
          atmId: "QMB-001",
          customerNumber: user.customerNumber,
          amount: amountValue,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      // Update user context with new balance
      if (response.newBalance !== undefined) {
        updateUser({
          ...user,
          balance: response.newBalance,
        });
      }

      setTransactionComplete(true);
      setTimeout(() => {
        navigate("/atm");
      }, 3000);
    } catch (error) {
      console.error("Withdrawal failed:", error);
      setError(
        error.message || "Failed to process withdrawal. Please try again."
      );
      setCashRequested(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate back to main screen
  const handleCancel = () => {
    navigate("/atm");
  };

  // Calculate the future balance
  const futureBalance =
    parseFloat(accountBalance) - parseFloat(amount.replace("£", ""));

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
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
            <p className="text-zinc-600 text-xl mt-2">Withdraw Cash</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-4 mb-6 content-hidden animate-reveal">
              <p className="text-red-500 text-sm">{error}</p>
            </div>
          )}

          {!cashRequested ? (
            <>
              {/* Quick Withdraw */}
              <div
                className="mb-6 content-hidden animate-reveal"
                style={{ animationDelay: "100ms" }}
              >
                <p className="text-zinc-400 mb-3">Quick Withdraw:</p>
                <div className="grid grid-cols-3 gap-3">
                  {[5, 10, 20, 50, 100, 200].map((value, index) => (
                    <button
                      key={value}
                      onClick={() => handleQuickAmount(value)}
                      className={`py-3 rounded-xl border transition-all
                                ${
                                  amount === `£${value}`
                                    ? "bg-red-500 text-white border-red-500"
                                    : "bg-zinc-900/50 text-zinc-300 border-zinc-700 hover:bg-zinc-800/50"
                                }`}
                      style={{ animationDelay: `${150 + index * 50}ms` }}
                    >
                      £{value}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Amount */}
              <div
                className="mb-6 content-hidden animate-reveal"
                style={{ animationDelay: "500ms" }}
              >
                <p className="text-zinc-400 mb-2">Custom Amount:</p>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                    £
                  </span>
                  <input
                    type="text"
                    value={customAmount}
                    onChange={handleCustomInput}
                    className="w-full bg-zinc-900/50 border border-zinc-700 rounded-xl 
                             text-white px-8 py-3 focus:outline-none focus:border-red-500"
                    placeholder="Enter amount"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div
                className="grid grid-cols-2 gap-3 content-hidden animate-reveal"
                style={{ animationDelay: "600ms" }}
              >
                <button
                  onClick={handleCancel}
                  className="bg-transparent text-white border-2 border-red-500 font-medium py-3 rounded-xl
                           transition-all hover:bg-red-500 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleWithdraw}
                  className="bg-red-500 text-white font-medium py-3 rounded-xl
                           transition-transform hover:scale-[1.02]"
                >
                  Withdraw
                </button>
              </div>
            </>
          ) : (
            <div className="content-hidden animate-reveal">
              <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-6">
                <h2 className="text-white text-xl mb-4 text-center">
                  Confirm Withdrawal
                </h2>
                <p className="text-zinc-400 mb-6 text-center">
                  Please confirm your withdrawal amount
                </p>

                <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <span className="text-zinc-400">Amount to withdraw:</span>
                    <div className="text-3xl font-bold text-white mt-1">
                      {amount}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleCancel}
                    disabled={isLoading}
                    className="bg-transparent text-white border-2 border-red-500 font-medium py-3 rounded-xl
                             transition-all hover:bg-red-500 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAccept}
                    disabled={isLoading}
                    className="bg-red-500 text-white font-medium py-3 rounded-xl
                             transition-transform hover:scale-[1.02]"
                  >
                    {isLoading ? "Processing..." : "Confirm"}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Success Screen */}
          {transactionComplete && (
            <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-8 content-hidden animate-reveal">
              <div className="bg-zinc-900/50 border border-zinc-700 rounded-xl p-8 max-w-md w-full">
                <h2 className="text-2xl text-white text-center mb-6">
                  Withdrawal Successful
                </h2>
                <div className="bg-zinc-800/50 rounded-xl p-4 mb-6">
                  <div className="text-center">
                    <span className="text-zinc-400">Amount withdrawn:</span>
                    <div className="text-3xl font-bold text-red-500 mt-1">
                      {amount}
                    </div>
                  </div>
                </div>
                <p className="text-zinc-400 text-center text-sm">
                  Please take your cash. Returning to main screen...
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawScreen;
