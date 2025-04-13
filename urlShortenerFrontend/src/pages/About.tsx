import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    BarChart3,
    Sparkles,
    QrCode,
    ShieldCheck,
    ArrowRight,
    ArrowDown,
    User,
  } from "lucide-react";
  


  const features = [
    {
      title: "Real-Time Analytics",
      desc: "Optimics analytics, end-to-end",
      icon: <BarChart3 className="h-12 w-12 text-purple-500 mb-2 mx-auto" />,
    },
    {
      title: "Custom Branded",
      desc: "Optimize analytics, end-to-end",
      icon: <Sparkles className="h-12 w-12 text-purple-500 mb-2 mx-auto" />,
    },
    {
      title: "QR Code Generation",
      desc: "Security & Expiry Control",
      icon: <QrCode className="h-12 w-12 text-purple-500 mb-2 mx-auto" />,
    },
    {
      title: "Security & Expiry Control",
      desc: "Security & Expiry Control",
      icon: <ShieldCheck className="h-12 w-12 text-purple-500 mb-2 mx-auto" />,
    },
  ];

const About = () => {
  return (
    <div className="bg-black text-white px-6 md:px-16 py-5 space-y-16">
     

      {/* Hero Content */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 ext-center md:text-left">
        <div className="space-y-6 max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Simplify Your Links. Amplify Your Impact
          </h1>
          <p className="text-gray-400">
            Shorten URLs, track clicks, and share smarter—instantly.
          </p>
          <div className="space-x-4">
            <Button>Shorten Your First Link</Button>
            <Button >See Features</Button>
          </div>
        </div>

        {/* Shorten box */}
        <div className="bg-gray-900 p-6 rounded-lg w-full md:max-w-sm space-y-4">
          <Input placeholder="https://www.example.com/long-url" className="text-black" />
          <div className="flex items-center gap-2">
            <Input  value="short.ly/abc123" className="text-white" />
            <Button>Shorten</Button>
          </div>
          <div className="flex justify-between text-sm text-gray-400">
            <span>✔️ 2.1k</span>
            <span>📊</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="space-y-6 text-center md:text-left">
      <h2 className="text-4xl font-bold mb-6 text-white  md:text-start sm:text-center">Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((item) => (
          <div
            key={item.title}
            className="bg-black p-6 rounded-xl text-center shadow-md hover:shadow-lg transition"
          >
            {item.icon}
            <h3 className="font-semibold text-white text-xl mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>

      {/* How it works */}
      <section className="space-y-6 text-center md:text-left">
  <h2 className="text-4xl font-bold">How It Works</h2>

  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="flex items-center justify-center gap-2">
      <span className="rounded-full text-purple-500 px-3 py-1 text-3xl">1</span>
      <span className="text-3xl">Paste your long URL</span>
    </div>

    <div className="flex justify-center hover:text-blue-800 transition-colors cursor-pointer">
      <ArrowDown className="w-10 h-10 block md:hidden" />
      <ArrowRight className="w-10 h-10 hidden md:block" />
    </div>

    <div className="flex items-center justify-center gap-2">
    <span className="rounded-full text-purple-500 px-3 py-1 text-3xl">2</span>
      <span className="text-3xl">Customize or shorten instantly</span>
    </div>

    <div className="flex justify-center hover:text-blue-800 transition-colors cursor-pointer">
      <ArrowDown className="w-10 h-10 block md:hidden" />
      <ArrowRight className="w-10 h-10 hidden md:block" />
    </div>

    <div className="flex items-center justify-center gap-2">
    <span className="rounded-full text-purple-500 px-3 py-1 text-3xl">3</span>
      <span className="text-3xl">Track clicks and share anywhere</span>
    </div>
  </div>

  {/* Testimonial */}
  <div className="bg-black p-6 rounded-lg flex flex-col md:flex-row items-center gap-4 text-center md:text-left">
  <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center">
    <User className="text-white w-8 h-8" />
  </div>
    <div className="flex-1">
      <p>"Clean, fast, and reliable. This is my go-to link shortener!"</p>
      <div className="text-sm text-gray-400">Sarah W. &nbsp; | &nbsp; Company Name</div>
    </div>
    <div className="mt-4 md:mt-0 md:ml-auto">
      <Button variant="secondary">Sarah W.</Button>
    </div>
  </div>
</section>



    </div>
  );
};

export default About;
