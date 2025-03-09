import React, { useState, useEffect } from "react";
import {
  FaMoneyBillWave,
  FaMoneyBill,
  FaKey,
  FaEllipsisH,
  FaCog,
  FaHistory,
  FaListAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ApiClient from "../utils/apiClient";

const ATM = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [balance, setBalance] = useState(null);
  const atmLocation = "ATM - QMB";

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await ApiClient.get(
          `/api/atm/balance/${user.customerNumber}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(response.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
        // Handle error - maybe show an error message or redirect to login
      }
    };

    if (user?.customerNumber) {
      fetchBalance();
    }
  }, [user?.customerNumber]);

  const handleDeposit = () => {
    navigate("/deposit");
  };

  // Navigation of the list items
  const handleWithdraw = () => {
    navigate("/withdraw");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-6 relative content-hidden animate-reveal">
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
            <p className="text-zinc-600 text-xl mt-2">
              Welcome to {atmLocation}
            </p>
          </div>

          {/* Balance section */}
          <div
            className="mb-8 content-hidden animate-reveal"
            style={{ animationDelay: "200ms" }}
          >
            <div className="bg-zinc-900/80 px-8 py-6 rounded-2xl">
              <p className="text-zinc-400 text-lg mb-1">Available Balance</p>
              <p className="text-white text-4xl font-semibold">
                {balance ? `£${balance.toFixed(2)}` : "Loading..."}
              </p>
            </div>
          </div>

          {/* Main actions */}
          <div className="space-y-4 content-hidden animate-reveal">
            <div
              className="group content-hidden animate-reveal"
              style={{ animationDelay: "300ms" }}
            >
              <button className="w-full" onClick={handleDeposit}>
                <div
                  className="flex items-center justify-between bg-zinc-900/80 h-16 px-6 rounded-2xl 
                            backdrop-blur-sm transition-all duration-300
                            group-hover:bg-zinc-800 group-hover:scale-[1.02]"
                >
                  <div className="flex items-center">
                    <FaMoneyBillWave className="text-red-500 text-xl" />
                    <span className="text-white text-lg font-medium ml-4">
                      Deposit Cash
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div
              className="group content-hidden animate-reveal"
              style={{ animationDelay: "400ms" }}
            >
              <button className="w-full" onClick={handleWithdraw}>
                <div
                  className="flex items-center justify-between bg-zinc-900/80 h-16 px-6 rounded-2xl 
                            backdrop-blur-sm transition-all duration-300
                            group-hover:bg-zinc-800 group-hover:scale-[1.02]"
                >
                  <div className="flex items-center">
                    <FaMoneyBill className="text-red-500 text-xl" />
                    <span className="text-white text-lg font-medium ml-4">
                      Withdraw Cash
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div
              className="group content-hidden animate-reveal"
              style={{ animationDelay: "500ms" }}
            >
              <button
                className="w-full"
                onClick={() => navigate("/transactions")}
              >
                <div
                  className="flex items-center justify-between bg-zinc-900/80 h-16 px-6 rounded-2xl 
                            backdrop-blur-sm transition-all duration-300
                            group-hover:bg-zinc-800 group-hover:scale-[1.02]"
                >
                  <div className="flex items-center">
                    <FaListAlt className="text-red-500 text-xl" />
                    <span className="text-white text-lg font-medium ml-4">
                      Transaction History
                    </span>
                  </div>
                </div>
              </button>
            </div>

            <div
              className="group content-hidden animate-reveal"
              style={{ animationDelay: "600ms" }}
            >
              <button className="w-full" onClick={handleSettings}>
                <div
                  className="flex items-center justify-between bg-zinc-900/80 h-16 px-6 rounded-2xl 
                            backdrop-blur-sm transition-all duration-300
                            group-hover:bg-zinc-800 group-hover:scale-[1.02]"
                >
                  <div className="flex items-center">
                    <FaCog className="text-red-500 text-xl" />
                    <span className="text-white text-lg font-medium ml-4">
                      Settings
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ATM;
