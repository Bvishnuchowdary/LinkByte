import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import MyUrls from "./pages/MyUrls";
import AnalyticsPage from "./pages/Analytics";
import ContactPage from "./pages/Contact";
function App() {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Nested Routes */}
        <Route path="/dashboard/myurls" element={<MyUrls />} />
        <Route path="dashboard/analytics/:shortUrl" element={<AnalyticsPage />} />
        
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
