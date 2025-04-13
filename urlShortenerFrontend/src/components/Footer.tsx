import link from "@/assets/link.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10 px-6 md:px-20 mt-12">
      <div className="grid md:grid-cols-4 gap-8">
        
        {/* Logo */}
        <div className="flex flex-row gap-2">
        <img src={link} alt="LinkByte Logo" className="w-8 h-8" />
        <h1 className="text-2xl font-bold text-white ">LinkByte</h1>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">About</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        {/* Address / Help */}
        <div>
          <h3 className="font-semibold mb-3">Address</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="#">Blog</a></li>
            <li><a href="#">Help Center</a></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="font-semibold mb-3">Subscribe to our newsletter</h3>
          <form className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-sm text-white px-4 py-2 rounded-md focus:outline-none w-full sm:w-auto"
            />
            <button
              type="submit"
              className="bg-purple-500 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
