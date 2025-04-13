import { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import SideNavDashboard from "@/components/SideNavDashboard";

const backendurl = import.meta.env.VITE_BACKEND_URL;

type UrlData = {
  id: number;
  originalUrl: string;
  shortUrl: string;
  clickCount: number;
  createdDate: string;
  username: string;
};

export default function MyUrls() {
  const [urls, setUrls] = useState<UrlData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMyUrls = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) {
      alert("Please log in.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendurl}/api/urls/myurls`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setUrls(response.data);
      } else {
        alert("Failed to fetch URLs.");
      }
    } catch (error: any) {
      console.error("Error fetching URLs:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      <SideNavDashboard />

      <main className="flex-1 p-6 space-y-6">
        <Card className="bg-zinc-900 text-white border-0">
          <CardContent className="p-6 space-y-4 border-0">
            <h2 className="text-xl font-bold mb-2">Your Shortened URLs</h2>

            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white"
              onClick={fetchMyUrls}
              disabled={loading}
            >
              {loading ? "Loading..." : "Fetch My URLs"}
            </Button>

            {urls.length > 0 && (
              <div className="overflow-x-auto mt-6">
                <table className="w-full text-left table-auto border-collapse border border-gray-700">
                <thead>
                    <tr className="bg-gray-800">
                        <th className="p-3 border border-gray-700">Original URL</th>
                        <th className="p-3 border border-gray-700">Short URL</th>
                        <th className="p-3 border border-gray-700">Click Count</th>
                        <th className="p-3 border border-gray-700">Analytics</th> {/* new column */}
                    </tr>
                    </thead>
                    <tbody>
                    {urls.map((url) => (
                        <tr key={url.id} className="hover:bg-gray-800">
                        <td className="p-3 border border-gray-700">
                            <a
                            href={url.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:underline"
                            >
                            {url.originalUrl}
                            </a>
                        </td>
                        <td className="p-3 border border-gray-700">
                            <a
                            href={`${backendurl}/${url.shortUrl}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-400 hover:underline"
                            >
                            {`${backendurl}/${url.shortUrl}`}
                            </a>
                        </td>
                        <td className="p-3 border border-gray-700">{url.clickCount}</td>
                        <td className="p-3 border border-gray-700">
                            <a
                            href={`/dashboard/analytics/${url.shortUrl}`}
                            className="text-purple-400 hover:underline"
                            >
                            View
                            </a>
                        </td>
                        </tr>
                    ))}
                    </tbody>

                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
