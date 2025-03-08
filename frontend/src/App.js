import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Add other routes here */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
