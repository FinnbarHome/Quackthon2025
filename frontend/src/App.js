import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import ATM from "./pages/ATM";
import Withdraw from "./pages/Withdraw";
import Scan from "./pages/Scan";
import Deposit from "./pages/Deposit";
import { UserProvider } from "./contexts/UserContext";
import Settings from "./pages/Settings";
import TransactionHistory from "./pages/TransactionHistory";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/atm" element={<ATM />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
