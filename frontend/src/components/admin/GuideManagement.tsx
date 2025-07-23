import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Plus, Edit, Trash2 } from "lucide-react";

interface Guide {
  id: number;
  title: string;
  description: string;
  type: string;
  link: string;
  order_index: number;
  created_at: string;
}

interface GuideFormData {
  title: string;
  description: string;
  type: string;
  link: string;
  order_index: number;
}

const GuideManagement = () => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingGuide, setEditingGuide] = useState<Guide | null>(null);
  const [formData, setFormData] = useState<GuideFormData>({
    title: "",
    description: "",
    type: "",
    link: "",
    order_index: 1,
  });

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("http://localhost:8000/api/admin/guides/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setGuides(data);
      }
    } catch (error) {
      console.error("Failed to fetch guides:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingGuide
        ? `http://localhost:8000/api/admin/guides/${editingGuide.id}`
        : "http://localhost:8000/api/admin/guides/";

      const method = editingGuide ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchGuides();
        setShowForm(false);
        setEditingGuide(null);
        setFormData({
          title: "",
          description: "",
          type: "",
          link: "",
          order_index: 1,
        });
      }
    } catch (error) {
      console.error("Failed to save guide:", error);
    }
  };

  const handleEdit = (guide: Guide) => {
    setEditingGuide(guide);
    setFormData({
      title: guide.title,
      description: guide.description,
      type: guide.type,
      link: guide.link,
      order_index: guide.order_index,
    });
    setShowForm(true);
  };

  const handleDelete = async (guideId: number) => {
    if (!confirm("Are you sure you want to delete this guide?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/guides/${guideId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchGuides();
      }
    } catch (error) {
      console.error("Failed to delete guide:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading guides...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Guide Management</h2>
        <Button
          onClick={() => {
            setEditingGuide(null);
            setFormData({
              title: "",
              description: "",
              type: "",
              link: "",
              order_index: 1,
            });
            setShowForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Guide</span>
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingGuide ? "Edit Guide" : "Add New Guide"}
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
                  Type
                </label>
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  placeholder="e.g., tutorial, documentation, reference"
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
                  min="1"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Link
              </label>
              <input
                type="url"
                value={formData.link}
                onChange={(e) =>
                  setFormData({ ...formData, link: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                placeholder="https://example.com/guide"
                required
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
                rows={3}
                required
              />
            </div>

            <div className="flex space-x-3">
              <Button type="submit">
                {editingGuide ? "Update Guide" : "Create Guide"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingGuide(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {guides.map((guide) => (
          <Card key={guide.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-2 flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-white">{guide.title}</h4>
                  <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    {guide.type}
                  </span>
                  <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                    Order: {guide.order_index}
                  </span>
                  <a
                    href={guide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 text-xs underline"
                  >
                    View Guide
                  </a>
                </div>
                <p className="text-gray-400 text-sm">{guide.description}</p>
                <p className="text-gray-500 text-xs">
                  Link:{" "}
                  <a
                    href={guide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline"
                  >
                    {guide.link}
                  </a>
                </p>
                <p className="text-gray-500 text-xs">
                  Created: {new Date(guide.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(guide)}
                  className="p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(guide.id)}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {guides.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No guides found</p>
        </div>
      )}
    </div>
  );
};

export default GuideManagement;
