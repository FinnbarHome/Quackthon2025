import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Auth from "./pages/Auth";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth" element={<Auth />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
