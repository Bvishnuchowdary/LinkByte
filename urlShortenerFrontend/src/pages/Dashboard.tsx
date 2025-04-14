import { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SideNavDashboard from "@/components/SideNavDashboard";

const backendurl = import.meta.env.VITE_BACKEND_URL;

export default function Dashboard() {
  const [originalurl, setoriginalurl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyticsData, setAnalyticsData] = useState<{ date: string; clicks: number }[]>([]);
  const [startDate, setStartDate] = useState("2025-04-09");
  const [endDate, setEndDate] = useState("2025-04-13");

  const handleShorten = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!originalurl || !token) return;

    setLoading(true);
    try {
      const response = await axios.post(
        `${backendurl}/api/urls/shorten`,
        { originalurl },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 && response.data.shortUrl) {
        const fullShortUrl = `${backendurl}/${response.data.shortUrl}`;
        setShortUrl(fullShortUrl);
      } else {
        alert("Shortening failed. Please try again.");
      }
    } catch (error: any) {
      console.error("Error:", error);
      alert(error.response?.data?.message || "Something went wrong.");
    }
    setLoading(false);
  };

  const handleCopy = async () => {
    if (shortUrl) {
      await navigator.clipboard.writeText(shortUrl);
      alert("Shortened URL copied to clipboard!");
    }
  };

  const fetchAnalytics = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return;

    try {
      const response = await axios.get(
        `${backendurl}/api/urls/totalclicks?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const formattedData = Object.entries(response.data).map(
          ([date, clicks]) => ({
            date,
            clicks: Number(clicks), 
          })
        );
        
        setAnalyticsData(formattedData);
      }
    } catch (error: any) {
      console.error("Analytics fetch failed", error);
      alert("Failed to fetch analytics.");
    }
  };


  useEffect(()=>{
    fetchAnalytics();
  },[startDate,endDate])

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      <SideNavDashboard />

      <main className="flex-1 p-6 space-y-6">
        {/* URL Shortener */}
        <Card className="bg-zinc-900 text-white border-0">
          <CardContent className="p-6 space-y-4 border-0">
            <p className="text-white text-xl">Shorten URL</p>

            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                placeholder="Enter a long URL"
                className="bg-black text-white"
                value={originalurl}
                onChange={(e) => setoriginalurl(e.target.value)}
              />
              <Button
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={handleShorten}
                disabled={loading}
              >
                {loading ? "Shortening..." : "Shorten"}
              </Button>
            </div>

            {shortUrl && (
              <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
                <Input
                  className="bg-black text-white"
                  value={shortUrl}
                  readOnly
                />
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleCopy}
                >
                  Copy
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analytics Section */}
        <h2 className="text-3xl font-bold">Analytics</h2>

        <Card className="bg-black text-white">
          <CardContent className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-4">
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="bg-zinc-800 text-white"
              />
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="bg-zinc-800 text-white"
              />
              <Button
                onClick={fetchAnalytics}
                className="bg-green-600 hover:bg-green-700"
              >
                Load Data
              </Button>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={analyticsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis
                  dataKey="date"
                  stroke="#ccc"
                  tick={{ fontSize: 12 }}
                  interval={0}
                />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="clicks"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
