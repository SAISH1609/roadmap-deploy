import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { User, Book, Video, Users, LogOut, Map } from "lucide-react";
import UserManagement from "../components/admin/UserManagement";
import GuideManagement from "../components/admin/GuideManagement";
import VideoManagement from "../components/admin/VideoManagement";
import RoadmapManagement from "../components/admin/RoadmapManagement";

interface DashboardStats {
  total_users: number;
  total_guides: number;
  total_videos: number;
  total_roadmaps: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      navigate("/admin/login");
      return;
    }
    fetchStats();
  }, [navigate]);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("http://localhost:8000/api/admin/stats", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-black flex items-center justify-center">
        <div className="text-white">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-950 via-black to-black">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 min-h-screen p-6">
          <div className="text-white text-xl font-bold mb-8">Admin Panel</div>

          <nav className="space-y-2">
            <button
              onClick={() => setActiveSection("overview")}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeSection === "overview"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Overview</span>
            </button>

            <button
              onClick={() => setActiveSection("users")}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeSection === "users"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </button>

            <button
              onClick={() => setActiveSection("guides")}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeSection === "guides"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Book className="w-4 h-4" />
              <span>Manage Guides</span>
            </button>

            <button
              onClick={() => setActiveSection("videos")}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeSection === "videos"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Video className="w-4 h-4" />
              <span>Manage Videos</span>
            </button>

            <button
              onClick={() => setActiveSection("roadmaps")}
              className={`w-full text-left px-4 py-2 rounded-md flex items-center space-x-2 ${
                activeSection === "roadmaps"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <Map className="w-4 h-4" />
              <span>Manage Roadmaps</span>
            </button>
          </nav>

          <div className="mt-auto pt-8">
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full flex items-center space-x-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="text-white">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {activeSection === "overview" && (
              <div>
                <h2 className="text-xl font-semibold mb-6">System Overview</h2>

                {stats && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Users</p>
                          <p className="text-2xl font-bold text-white">
                            {stats.total_users}
                          </p>
                        </div>
                        <Users className="w-8 h-8 text-blue-500" />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Guides</p>
                          <p className="text-2xl font-bold text-white">
                            {stats.total_guides}
                          </p>
                        </div>
                        <Book className="w-8 h-8 text-green-500" />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">Total Videos</p>
                          <p className="text-2xl font-bold text-white">
                            {stats.total_videos}
                          </p>
                        </div>
                        <Video className="w-8 h-8 text-purple-500" />
                      </div>
                    </Card>

                    <Card className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-400 text-sm">
                            Total Roadmaps
                          </p>
                          <p className="text-2xl font-bold text-white">
                            {stats.total_roadmaps}
                          </p>
                        </div>
                        <User className="w-8 h-8 text-yellow-500" />
                      </div>
                    </Card>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      Quick Actions
                    </h3>
                    <div className="space-y-3">
                      <Button
                        onClick={() => setActiveSection("users")}
                        className="w-full justify-start"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Manage Users
                      </Button>
                      <Button
                        onClick={() => setActiveSection("guides")}
                        className="w-full justify-start"
                      >
                        <Book className="w-4 h-4 mr-2" />
                        Add New Guide
                      </Button>
                      <Button
                        onClick={() => setActiveSection("videos")}
                        className="w-full justify-start"
                      >
                        <Video className="w-4 h-4 mr-2" />
                        Add New Video
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                      System Status
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Database</span>
                        <span className="text-green-400">Connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">API Status</span>
                        <span className="text-green-400">Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Last Updated</span>
                        <span className="text-gray-300">Just now</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}

            {activeSection === "users" && <UserManagement />}

            {activeSection === "guides" && <GuideManagement />}

            {activeSection === "videos" && <VideoManagement />}

            {activeSection === "roadmaps" && <RoadmapManagement />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
