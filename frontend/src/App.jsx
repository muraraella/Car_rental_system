import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/pages/Home';
import AdminLogin from "./components/pages/AdminLogin";
import AdminDashboard from "./components/pages/AdminDashboard";
import BookCar from "./components/pages/BookCar";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/book/:id" element={<BookCar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;