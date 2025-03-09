import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import Register from "./pages/Register";
import ATM from "./pages/ATM";
import Withdraw from "./pages/Withdraw";
import Scan from "./pages/Scan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/atm" element={<ATM />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/scan" element={<Scan />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
