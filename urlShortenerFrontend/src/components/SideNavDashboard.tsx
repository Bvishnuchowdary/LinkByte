import {  useState } from "react";
import { Home, Link, LogOutIcon, Menu, User2, X } from "lucide-react";
import link from "@/assets/link.svg";
import { Button } from "./ui/button";
import { useLocation } from "react-router-dom";


const SideNavDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  function handleLogout(event: React.MouseEvent): void {
    event.preventDefault();
    localStorage.removeItem("jwtToken");
    window.location.href = "/";
  }

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Home size={18} /> },
    { href: "/dashboard/myurls", label: "MyLinks", icon: <Link size={18} /> },
    { href: "/settings", label: "profile", icon: <User2 size={18} /> },
  ];

  return (
    <>
      {/* Topbar for Mobile */}
      <div className="md:hidden p-4 bg-black flex justify-between items-center shadow">
        <div className="flex items-center gap-2">
          <img src={link} alt="LinkByte Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-white">LinkByte</h1>
        </div>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <Menu className="text-white" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:static top-0 left-0 h-full bg-black w-64 p-6 z-50 transition-transform duration-300 ease-in-out shadow-lg`}
      >
        {/* Mobile Close Button */}
        <div className="flex justify-between items-center md:hidden mb-6">
          <div className="flex items-center gap-2">
            <img src={link} alt="LinkByte Logo" className="w-8 h-8" />
            <h1 className="text-xl font-bold text-white">LinkByte</h1>
          </div>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="text-white" />
          </Button>
        </div>

        {/* Nav Links */}
        <nav className="space-y-4">
          {navLinks.map((item) => (
            <a key={item.href} href={item.href}>
              <div
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                  location.pathname === item.href
                    ? "bg-purple-700 text-white"
                    : "text-white hover:bg-gray-800"
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            </a>
          ))}

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            className="flex w-full items-center justify-start gap-2  text-white mt-6 px-3 py-2"
          >
            <LogOutIcon size={20} />
            <span>Logout</span>
          </Button>
        </nav>
      </aside>

      {/* Backdrop for Mobile Menu */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideNavDashboard;
