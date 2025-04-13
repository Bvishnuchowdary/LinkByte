import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import SideNavDashboard from "@/components/SideNavDashboard";

type ClickAnalytics = {
  clickDate: string;
  count: number;
};

const backendurl = import.meta.env.VITE_BACKEND_URL;

export default function AnalyticsPage() {
  const { shortUrl } = useParams<{ shortUrl: string }>();
  const [data, setData] = useState<ClickAnalytics[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("2025-04-06");
  const [endDate, setEndDate] = useState("2025-04-13");

  const fetchAnalytics = async () => {
    if (!shortUrl) return;

    setLoading(true);
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        alert("Please log in.");
        return;
      }

      const res = await axios.get(
        `${backendurl}/api/urls/analytics/${shortUrl}?startDate=${startDate}T00:00:00&endDate=${endDate}T23:59:59`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const sortedData = res.data.sort(
        (a: ClickAnalytics, b: ClickAnalytics) =>
          new Date(a.clickDate).getTime() - new Date(b.clickDate).getTime()
      );

      setData(sortedData);
    } catch (error: any) {
      console.error("Failed to fetch analytics:", error);
      alert(error.response?.data?.message || "Error fetching analytics");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalytics();
  }, [shortUrl, startDate, endDate]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col md:flex-row">
      <SideNavDashboard />
      <div className="flex-1 p-4 sm:p-6 space-y-6">
        <Card className="bg-zinc-900 text-white border border-zinc-800 shadow-md">
          <CardContent className="p-4 sm:p-6 space-y-6">
            <h2 className="text-xl sm:text-2xl font-semibold">
              Analytics for:{" "}
              <span className="text-purple-500 break-words">{shortUrl}</span>
            </h2>

            {/* Date Range Picker */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <div className="flex flex-col w-full sm:w-auto">
                <label htmlFor="start-date" className="text-sm mb-1">
                  Start Date
                </label>
                <input
                  type="date"
                  id="start-date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex flex-col w-full sm:w-auto">
                <label htmlFor="end-date" className="text-sm mb-1">
                  End Date
                </label>
                <input
                  type="date"
                  id="end-date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-zinc-800 text-white border border-zinc-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Conditional Output */}
            {loading ? (
              <p className="text-center text-gray-400">Loading...</p>
            ) : data.length === 0 ? (
              <p className="text-center text-gray-500">
                No analytics data found for the selected date range.
              </p>
            ) : (
              <>
                {/* Chart */}
                <div className="w-full h-72 sm:h-80 bg-zinc-950 rounded-md p-2 sm:p-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="clickDate" stroke="#ccc">
                        <Label
                          value="Date"
                          offset={-5}
                          position="insideBottom"
                          fill="#ccc"
                        />
                      </XAxis>
                      <YAxis stroke="#ccc">
                        <Label
                          value="Click Count"
                          angle={-90}
                          position="insideLeft"
                          offset={-5}
                          fill="#ccc"
                        />
                      </YAxis>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#333",
                          border: "none",
                        }}
                        labelStyle={{ color: "#fff" }}
                      />
                      <Line
                        type="monotone"
                        dataKey="count"
                        stroke="#38bdf8"
                        strokeWidth={2}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full text-left border-collapse border border-gray-700 mt-6">
                    <thead>
                      <tr className="bg-zinc-800 text-gray-200">
                        <th className="p-3 border border-gray-700">Date</th>
                        <th className="p-3 border border-gray-700">Click Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((entry, idx) => (
                        <tr key={idx} className="hover:bg-zinc-800">
                          <td className="p-3 border border-gray-700 break-all">
                            {entry.clickDate}
                          </td>
                          <td className="p-3 border border-gray-700">
                            {entry.count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
