import { Card, CardContent } from "@/components/ui/card";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl bg-zinc-900 border border-zinc-800 shadow-md">
        <CardContent className="p-6 space-y-6">
          <h2 className="text-3xl font-semibold text-center text-purple-500">
            Contact Us
          </h2>
          <p className="text-gray-400 text-center">
            We'd love to hear from you! Fill out the form below and we'll get back to you as soon as we can.
          </p>

          <form className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="name" className="text-sm mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your name"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-sm mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="message" className="text-sm mb-1">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Your message..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
            >
              Send Message
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
