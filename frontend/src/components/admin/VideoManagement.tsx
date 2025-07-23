import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Video {
  id: number;
  title: string;
  description: string;
  link: string;
  duration: string;
  order_index: number;
  created_at: string;
}

interface VideoFormData {
  title: string;
  description: string;
  link: string;
  duration: number; // will be converted to string with "Minutes"
  order_index: number;
}

const VideoManagement = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVideo, setEditingVideo] = useState<Video | null>(null);
  const [formData, setFormData] = useState<VideoFormData>({
    title: "",
    description: "",
    link: "",
    duration: 0,
    order_index: 0,
  });

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("http://localhost:8000/api/admin/videos/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setVideos(data);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingVideo
        ? `http://localhost:8000/api/admin/videos/${editingVideo.id}`
        : "http://localhost:8000/api/admin/videos/";

      const method = editingVideo ? "PUT" : "POST";

      // Convert form data to match API expectations
      const submitData = {
        title: formData.title,
        description: formData.description,
        link: formData.link,
        duration: `${formData.duration} Minutes`, // Convert number to string with "Minutes"
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (response.ok) {
        await fetchVideos();
        setShowForm(false);
        setEditingVideo(null);
        setFormData({
          title: "",
          description: "",
          link: "",
          duration: 0,
          order_index: 0,
        });
      }
    } catch (error) {
      console.error("Failed to save video:", error);
    }
  };

  const handleEdit = (video: Video) => {
    setEditingVideo(video);
    // Extract number from duration string like "15 Minutes" -> 15
    const durationNumber = parseInt(video.duration.replace(/[^\d]/g, "")) || 0;
    setFormData({
      title: video.title,
      description: video.description,
      link: video.link,
      duration: durationNumber,
      order_index: video.order_index,
    });
    setShowForm(true);
  };

  const handleDelete = async (videoId: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/videos/${videoId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchVideos();
      }
    } catch (error) {
      console.error("Failed to delete video:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading videos...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Video Management</h2>
        <Button
          onClick={() => {
            setEditingVideo(null);
            setFormData({
              title: "",
              description: "",
              link: "",
              duration: 0,
              order_index: 0,
            });
            setShowForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Video</span>
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingVideo ? "Edit Video" : "Add New Video"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      duration: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Order Index
                </label>
                <input
                  type="number"
                  value={formData.order_index}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order_index: parseInt(e.target.value),
                    })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  min="0"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Video URL
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                required
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                rows={4}
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button type="submit">
                {editingVideo ? "Update Video" : "Create Video"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingVideo(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex space-x-4 flex-1">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-white">{video.title}</h4>
                    <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                      Order: {video.order_index}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {video.duration}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm">{video.description}</p>
                  <a
                    href={video.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    {video.link}
                  </a>
                  <p className="text-gray-500 text-xs">
                    Created: {new Date(video.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex space-x-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(video)}
                  className="p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(video.id)}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No videos found</p>
        </div>
      )}
    </div>
  );
};

export default VideoManagement;
