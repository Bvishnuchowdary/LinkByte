import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Link2, Network} from "lucide-react";

import About from "./About";

// Importing the updated laptop image
import LaptopImage from "@/assets/new-lap.png";
import {  useNavigate } from "react-router-dom";

const HomePage = () => {
 const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-x-hidden">
     

      {/* Hero Section */}
      <main className="relative flex flex-col md:flex-row items-center justify-center text-center p-6 md:p-12 gap-4 md:gap-8  transition-transform transform md:translate-x-0 mb-0">
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 md:gap-4 h-full z-10 md:-translate-y-20 sm:translatey-30 pb-0 md:translate-x-10">
          <h2 className="text-3xl md:text-5xl font-bold">Shorten Your Long URLs</h2>
          <p className="text-gray-400 max-w-xl">
            Paste your long URL below to shorten it.
          </p>
          <div className="flex w-full max-w-xl gap-2 flex-col sm:flex-row">
            <Input
              placeholder="https://www.example.com/long..."
              className="flex-1 bg-gray-900 text-white border border-gray-700"
            />
            <Button className=" bg-purple-800 hover:bg-purple-300 text-white" onClick={()=> navigate("/login")}>Shorten</Button>
          </div>
        </div>

        <div className="flex-1 md:-translate-x-20 z-0 transition-transform duration-300 transform ">
          <img
            src={LaptopImage}
            alt="Laptop illustration"
            className="w-full max-w-lg mx-auto"
          />
        </div>
      </main>

      {/* Features Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 px-6 mt-0 bg-black text-white">
        <Card className="bg-black border border-black">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Link2 className="w-16 h-16 text-purple-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-white">Easy Link Shortening</h3>
            <p className="text-gray-400">
              Quickly shorten long URLs with our easy-to-use tool.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-black border border-black">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <Network className="w-16 h-16 text-white mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-white">Link Management</h3>
            <p className="text-gray-400">
              Keep track of all your shortened URLs in one place.
            </p>
          </CardContent>
        </Card>
        <Card className="bg-black border border-black">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <BarChart3 className="w-16 h-16 text-purple-500 mb-4" />
            <h3 className="font-semibold text-lg mb-2 text-white">Analytics</h3>
            <p className="text-gray-400">
              Gain insights into your links' performance and clicks.
            </p>
          </CardContent>
        </Card>
      </section>


      <div id="about">
      <About />
      </div>

 
    </div>
  );
};

export default HomePage;
