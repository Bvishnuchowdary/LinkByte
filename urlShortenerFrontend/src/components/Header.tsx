import { useState } from "react";
import { useLocation } from "react-router-dom"; // import this
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import link from "@/assets/link.svg";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation(); // get current path

  // Don't render the header if the route starts with /dashboard
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center p-4 px-6 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <img src={link} alt="LinkByte Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-white">LinkByte</h1>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-300">
          <a href="/">Home</a>
          <a href="#about">Features</a>

          <a href="/contact">Contact</a>
        </nav>

        <div className="md:hidden">
          {showMenu ? (
            <X
              className="text-white cursor-pointer w-7 h-7"
              onClick={() => setShowMenu(false)}
            />
          ) : (
            <Menu
              className="text-white cursor-pointer w-7 h-7"
              onClick={() => setShowMenu(true)}
            />
          )}
        </div>

        <a href="/login" className="hidden md:block">
          <Button className="bg-purple-800 hover:bg-purple-500 w-full">
            Login
          </Button>
        </a>
      </header>

      {/* Mobile Menu Slide-In */}
      <div
        className={`fixed top-0 left-0 h-full w-full bg-black z-50 transform transition-transform duration-300 ease-in-out ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col gap-6 items-start">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <img src={link} alt="Logo" className="w-8 h-8" />
              <h1 className="text-xl font-bold text-white">LinkByte</h1>
            </div>
            <X
              className="text-white cursor-pointer w-7 h-7"
              onClick={() => setShowMenu(false)}
            />
          </div>
          <nav className="flex flex-col gap-4 mt-4 w-full text-lg">
            <a
              href="/"
              className="text-white border-b border-gray-700 pb-2 w-full"
            >
              Home
            </a>
            <a
              href="about"
              className="text-white border-b border-gray-700 pb-2 w-full"
            >
              Features
            </a>
    
            <a
              href="/contact"
              className="text-white border-b border-gray-700 pb-2 w-full"
            >
              Contact
            </a>
            <a href="/login">
              <Button className="bg-purple-800 hover:bg-purple-500 w-full">
                Login
              </Button>
            </a>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;
