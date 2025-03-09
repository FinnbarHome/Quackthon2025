import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useUser } from "../contexts/UserContext";
import ApiClient from "../utils/apiClient";

const TransactionHistory = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const transactions = await ApiClient.get(
          `/api/atm/transactions/${user.customerNumber}`
        );
        setTransactions(transactions || []);
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.customerNumber) {
      fetchTransactions();
    }
  }, [user?.customerNumber]);

  console.log("Transactions:", transactions);

  return (
    <div className="min-h-screen bg-black flex font-viga">
      <div className="w-full flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <div className="mb-4 content-hidden animate-reveal">
            <button
              onClick={() => navigate("/atm")}
              className="flex items-center text-zinc-500 hover:text-white transition-colors group"
            >
              <FaChevronLeft className="mr-2" />
              <span className="relative">
                Back
                <div className="absolute -bottom-0.5 left-0 right-0 h-px bg-gradient-to-r from-red-500 via-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-full animate-shimmer"></div>
              </span>
            </button>
          </div>

          {/* Header */}
          <div className="mb-8 content-hidden animate-reveal">
            <h1 className="text-4xl font-bold text-white mb-2">Transactions</h1>
            <p className="text-zinc-600">Your recent activity</p>
          </div>

          {/* Transactions List */}
          <div className="space-y-4 content-hidden animate-reveal">
            {loading ? (
              <div className="text-zinc-500 text-center py-8">Loading...</div>
            ) : transactions.length === 0 ? (
              <div className="text-zinc-500 text-center py-8">
                No transactions found
              </div>
            ) : (
              transactions.map((transaction, index) => (
                <div
                  key={transaction._id}
                  className="bg-zinc-900 p-4 rounded-xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-white font-medium">
                        {transaction.type === "DEPOSIT"
                          ? "Deposit"
                          : "Withdrawal"}
                      </p>
                      <p className="text-zinc-500 text-sm">
                        {new Date(transaction.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <p
                      className={`text-lg font-medium ${
                        transaction.type === "DEPOSIT"
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {transaction.type === "DEPOSIT" ? "+" : "-"}$
                      {Number(transaction.amount).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionHistory;
