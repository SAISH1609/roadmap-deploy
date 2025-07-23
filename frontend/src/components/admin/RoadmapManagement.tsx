import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Map,
  BookOpen,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";

interface Roadmap {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  is_public: boolean;
  total_topics: number;
  created_at: string;
  updated_at?: string;
}

interface RoadmapFormData {
  title: string;
  slug: string;
  description: string;
  category: string;
  is_public: boolean;
}

interface Topic {
  id: number;
  title: string;
  description: string;
  order_index: number;
  roadmap_id: number;
  is_required: boolean;
  created_at: string;
}

interface TopicFormData {
  title: string;
  description: string;
  order_index: number;
  is_required: boolean;
}

interface Resource {
  id: number;
  title: string;
  url: string;
  resource_type: string;
  description: string;
  is_free: boolean;
  order_index: number;
  topic_id: number;
  created_at: string;
}

interface ResourceFormData {
  title: string;
  url: string;
  resource_type: string;
  description: string;
  is_free: boolean;
  order_index: number;
}

const RoadmapManagement = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [showRoadmapForm, setShowRoadmapForm] = useState(false);
  const [showTopicForm, setShowTopicForm] = useState(false);
  const [showResourceForm, setShowResourceForm] = useState(false);

  // Edit states
  const [editingRoadmap, setEditingRoadmap] = useState<Roadmap | null>(null);
  const [editingTopic, setEditingTopic] = useState<Topic | null>(null);
  const [editingResource, setEditingResource] = useState<Resource | null>(null);

  // Selected states for hierarchical management
  const [selectedRoadmap, setSelectedRoadmap] = useState<Roadmap | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  // Form data states
  const [roadmapFormData, setRoadmapFormData] = useState<RoadmapFormData>({
    title: "",
    slug: "",
    description: "",
    category: "",
    is_public: true,
  });

  const [topicFormData, setTopicFormData] = useState<TopicFormData>({
    title: "",
    description: "",
    order_index: 1,
    is_required: true,
  });

  const [resourceFormData, setResourceFormData] = useState<ResourceFormData>({
    title: "",
    url: "",
    resource_type: "article",
    description: "",
    is_free: true,
    order_index: 1,
  });

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  useEffect(() => {
    if (selectedRoadmap) {
      fetchTopics(selectedRoadmap.id);
    } else {
      setTopics([]);
      setSelectedTopic(null);
      setResources([]);
    }
  }, [selectedRoadmap]);

  useEffect(() => {
    if (selectedTopic) {
      fetchResources(selectedTopic.id);
    } else {
      setResources([]);
    }
  }, [selectedTopic]);

  const fetchRoadmaps = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        "http://localhost:8000/api/admin/roadmaps/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setRoadmaps(data);
      }
    } catch (error) {
      console.error("Failed to fetch roadmaps:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopics = async (roadmapId: number) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/roadmaps/${roadmapId}/topics/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      }
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
  };

  const fetchResources = async (topicId: number) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/topics/${topicId}/resources/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setResources(data);
      }
    } catch (error) {
      console.error("Failed to fetch resources:", error);
    }
  };

  // Auto-generate slug from title
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Roadmap CRUD operations
  const handleRoadmapSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingRoadmap
        ? `http://localhost:8000/api/admin/roadmaps/${editingRoadmap.id}`
        : "http://localhost:8000/api/admin/roadmaps/";

      const method = editingRoadmap ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(roadmapFormData),
      });

      if (response.ok) {
        await fetchRoadmaps();
        setShowRoadmapForm(false);
        setEditingRoadmap(null);
        setRoadmapFormData({
          title: "",
          slug: "",
          description: "",
          category: "",
          is_public: true,
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to save roadmap:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to save roadmap:", error);
    }
  };

  const handleEditRoadmap = (roadmap: Roadmap) => {
    setEditingRoadmap(roadmap);
    setRoadmapFormData({
      title: roadmap.title,
      slug: roadmap.slug,
      description: roadmap.description,
      category: roadmap.category,
      is_public: roadmap.is_public,
    });
    setShowRoadmapForm(true);
  };

  const handleDeleteRoadmap = async (roadmapId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this roadmap? This will also delete all its topics and resources."
      )
    )
      return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/roadmaps/${roadmapId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        await fetchRoadmaps();
        if (selectedRoadmap?.id === roadmapId) {
          setSelectedRoadmap(null);
        }
      } else {
        const errorData = await response.text();
        console.error("Failed to delete roadmap:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to delete roadmap:", error);
    }
  };

  // Topic CRUD operations
  const handleTopicSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoadmap) return;

    try {
      const token = localStorage.getItem("admin_token");
      const url = editingTopic
        ? `http://localhost:8000/api/admin/topics/${editingTopic.id}`
        : `http://localhost:8000/api/admin/roadmaps/${selectedRoadmap.id}/topics/`;

      const method = editingTopic ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(topicFormData),
      });

      if (response.ok) {
        await fetchTopics(selectedRoadmap.id);
        setShowTopicForm(false);
        setEditingTopic(null);
        setTopicFormData({
          title: "",
          description: "",
          order_index: 1,
          is_required: true,
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to save topic:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to save topic:", error);
    }
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setTopicFormData({
      title: topic.title,
      description: topic.description,
      order_index: topic.order_index,
      is_required: topic.is_required,
    });
    setShowTopicForm(true);
  };

  const handleDeleteTopic = async (topicId: number) => {
    if (
      !confirm(
        "Are you sure you want to delete this topic? This will also delete all its resources."
      )
    )
      return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/topics/${topicId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        if (selectedRoadmap) {
          await fetchTopics(selectedRoadmap.id);
        }
        if (selectedTopic?.id === topicId) {
          setSelectedTopic(null);
        }
      } else {
        const errorData = await response.text();
        console.error("Failed to delete topic:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to delete topic:", error);
    }
  };

  // Resource CRUD operations
  const handleResourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic) return;

    try {
      const token = localStorage.getItem("admin_token");
      const url = editingResource
        ? `http://localhost:8000/api/admin/resources/${editingResource.id}`
        : `http://localhost:8000/api/admin/topics/${selectedTopic.id}/resources/`;

      const method = editingResource ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(resourceFormData),
      });

      if (response.ok) {
        await fetchResources(selectedTopic.id);
        setShowResourceForm(false);
        setEditingResource(null);
        setResourceFormData({
          title: "",
          url: "",
          resource_type: "article",
          description: "",
          is_free: true,
          order_index: 1,
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to save resource:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to save resource:", error);
    }
  };

  const handleEditResource = (resource: Resource) => {
    setEditingResource(resource);
    setResourceFormData({
      title: resource.title,
      url: resource.url,
      resource_type: resource.resource_type,
      description: resource.description,
      is_free: resource.is_free,
      order_index: resource.order_index,
    });
    setShowResourceForm(true);
  };

  const handleDeleteResource = async (resourceId: number) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(
        `http://localhost:8000/api/admin/resources/${resourceId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("Resource deleted successfully");
        if (selectedTopic) {
          await fetchResources(selectedTopic.id);
        }
      } else {
        const errorData = await response.text();
        console.error("Failed to delete resource:", response.status, errorData);
        alert(`Failed to delete resource: ${response.status} - ${errorData}`);
      }
    } catch (error) {
      console.error("Failed to delete resource:", error);
      alert("Failed to delete resource. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-white">Loading roadmaps...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <button
            onClick={() => {
              setSelectedRoadmap(null);
              setSelectedTopic(null);
            }}
            className="hover:text-white"
          >
            Roadmaps
          </button>
          {selectedRoadmap && (
            <>
              <span>/</span>
              <button
                onClick={() => setSelectedTopic(null)}
                className="hover:text-white"
              >
                {selectedRoadmap.title} Topics
              </button>
            </>
          )}
          {selectedTopic && (
            <>
              <span>/</span>
              <span className="text-white">
                {selectedTopic.title} Resources
              </span>
            </>
          )}
        </div>

        {/* Back to Admin Dashboard button - only show on main roadmaps view */}
        {!selectedRoadmap && !selectedTopic && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => (window.location.href = "/admin/dashboard")}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Admin Dashboard</span>
          </Button>
        )}
      </div>

      {/* Roadmap Level */}
      {!selectedRoadmap && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-white">
              Roadmap Management
            </h2>
            <Button
              onClick={() => {
                setEditingRoadmap(null);
                setRoadmapFormData({
                  title: "",
                  slug: "",
                  description: "",
                  category: "",
                  is_public: true,
                });
                setShowRoadmapForm(true);
              }}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Roadmap</span>
            </Button>
          </div>

          {/* Roadmap Form */}
          {showRoadmapForm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingRoadmap ? "Edit Roadmap" : "Add New Roadmap"}
              </h3>
              <form onSubmit={handleRoadmapSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Title
                    </label>
                    <input
                      type="text"
                      value={roadmapFormData.title}
                      onChange={(e) => {
                        const title = e.target.value;
                        setRoadmapFormData({
                          ...roadmapFormData,
                          title,
                          slug: generateSlug(title),
                        });
                      }}
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={roadmapFormData.slug}
                      onChange={(e) =>
                        setRoadmapFormData({
                          ...roadmapFormData,
                          slug: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={roadmapFormData.category}
                      onChange={(e) =>
                        setRoadmapFormData({
                          ...roadmapFormData,
                          category: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      placeholder="e.g., Frontend, Backend, DevOps"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-3 pt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={roadmapFormData.is_public}
                        onChange={(e) =>
                          setRoadmapFormData({
                            ...roadmapFormData,
                            is_public: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-gray-300">Public</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={roadmapFormData.description}
                    onChange={(e) =>
                      setRoadmapFormData({
                        ...roadmapFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit">
                    {editingRoadmap ? "Update Roadmap" : "Create Roadmap"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowRoadmapForm(false);
                      setEditingRoadmap(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Roadmaps List */}
          <div className="grid gap-4">
            {roadmaps.map((roadmap) => (
              <Card key={roadmap.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">
                        {roadmap.title}
                      </h4>
                      <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                        {roadmap.category}
                      </span>
                      <span className="flex items-center text-gray-400 text-xs">
                        {roadmap.is_public ? (
                          <>
                            <Eye className="w-3 h-3 mr-1" />
                            Public
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-3 h-3 mr-1" />
                            Private
                          </>
                        )}
                      </span>
                      <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                        {roadmap.total_topics} Topics
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm">
                      {roadmap.description}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Slug: {roadmap.slug}
                    </p>
                    <p className="text-gray-500 text-xs">
                      Created:{" "}
                      {new Date(roadmap.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedRoadmap(roadmap)}
                      className="p-2"
                      title="Manage Topics"
                    >
                      <Map className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditRoadmap(roadmap)}
                      className="p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteRoadmap(roadmap.id)}
                      className="p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {roadmaps.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No roadmaps found</p>
            </div>
          )}
        </div>
      )}

      {/* Topic Level */}
      {selectedRoadmap && !selectedTopic && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRoadmap(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Roadmaps</span>
              </Button>
              <h2 className="text-2xl font-bold text-white">
                Topics for "{selectedRoadmap.title}"
              </h2>
            </div>
            <Button
              onClick={() => {
                setEditingTopic(null);
                setTopicFormData({
                  title: "",
                  description: "",
                  order_index: topics.length + 1,
                  is_required: true,
                });
                setShowTopicForm(true);
              }}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Topic</span>
            </Button>
          </div>

          {/* Topic Form */}
          {showTopicForm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingTopic ? "Edit Topic" : "Add New Topic"}
              </h3>
              <form onSubmit={handleTopicSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={topicFormData.title}
                    onChange={(e) =>
                      setTopicFormData({
                        ...topicFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Order Index
                    </label>
                    <input
                      type="number"
                      value={topicFormData.order_index}
                      onChange={(e) =>
                        setTopicFormData({
                          ...topicFormData,
                          order_index: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      min="1"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-3 pt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={topicFormData.is_required}
                        onChange={(e) =>
                          setTopicFormData({
                            ...topicFormData,
                            is_required: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-gray-300">Required</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={topicFormData.description}
                    onChange={(e) =>
                      setTopicFormData({
                        ...topicFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit">
                    {editingTopic ? "Update Topic" : "Create Topic"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowTopicForm(false);
                      setEditingTopic(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Topics List */}
          <div className="grid gap-4">
            {topics.map((topic) => (
              <Card key={topic.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">
                        {topic.title}
                      </h4>
                      <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                        Order: {topic.order_index}
                      </span>
                      {topic.is_required && (
                        <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">{topic.description}</p>
                    <p className="text-gray-500 text-xs">
                      Created: {new Date(topic.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedTopic(topic)}
                      className="p-2"
                      title="Manage Resources"
                    >
                      <BookOpen className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTopic(topic)}
                      className="p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteTopic(topic.id)}
                      className="p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {topics.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No topics found for this roadmap</p>
            </div>
          )}
        </div>
      )}

      {/* Resource Level */}
      {selectedTopic && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedTopic(null)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Topics</span>
              </Button>
              <h2 className="text-2xl font-bold text-white">
                Resources for "{selectedTopic.title}"
              </h2>
            </div>
            <Button
              onClick={() => {
                setEditingResource(null);
                setResourceFormData({
                  title: "",
                  url: "",
                  resource_type: "article",
                  description: "",
                  is_free: true,
                  order_index: resources.length + 1,
                });
                setShowResourceForm(true);
              }}
              className="flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Resource</span>
            </Button>
          </div>

          {/* Resource Form */}
          {showResourceForm && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">
                {editingResource ? "Edit Resource" : "Add New Resource"}
              </h3>
              <form onSubmit={handleResourceSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={resourceFormData.title}
                    onChange={(e) =>
                      setResourceFormData({
                        ...resourceFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    URL
                  </label>
                  <input
                    type="url"
                    value={resourceFormData.url}
                    onChange={(e) =>
                      setResourceFormData({
                        ...resourceFormData,
                        url: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    placeholder="https://example.com/resource"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Resource Type
                    </label>
                    <select
                      value={resourceFormData.resource_type}
                      onChange={(e) =>
                        setResourceFormData({
                          ...resourceFormData,
                          resource_type: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      required
                    >
                      <option value="article">Article</option>
                      <option value="video">Video</option>
                      <option value="book">Book</option>
                      <option value="course">Course</option>
                      <option value="documentation">Documentation</option>
                      <option value="tool">Tool</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Order Index
                    </label>
                    <input
                      type="number"
                      value={resourceFormData.order_index}
                      onChange={(e) =>
                        setResourceFormData({
                          ...resourceFormData,
                          order_index: parseInt(e.target.value),
                        })
                      }
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                      min="1"
                      required
                    />
                  </div>
                  <div className="flex items-center space-x-3 pt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={resourceFormData.is_free}
                        onChange={(e) =>
                          setResourceFormData({
                            ...resourceFormData,
                            is_free: e.target.checked,
                          })
                        }
                        className="rounded"
                      />
                      <span className="text-gray-300">Free</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    value={resourceFormData.description}
                    onChange={(e) =>
                      setResourceFormData({
                        ...resourceFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                    rows={3}
                    required
                  />
                </div>

                <div className="flex space-x-3">
                  <Button type="submit">
                    {editingResource ? "Update Resource" : "Create Resource"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setShowResourceForm(false);
                      setEditingResource(null);
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}

          {/* Resources List */}
          <div className="grid gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-white">
                        {resource.title}
                      </h4>
                      <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">
                        {resource.resource_type}
                      </span>
                      <span className="px-2 py-1 bg-gray-600 text-white text-xs rounded">
                        Order: {resource.order_index}
                      </span>
                      {resource.is_free && (
                        <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                          Free
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {resource.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-xs flex items-center"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        {resource.url}
                      </a>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Created:{" "}
                      {new Date(resource.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditResource(resource)}
                      className="p-2"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteResource(resource.id)}
                      className="p-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {resources.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-400">No resources found for this topic</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoadmapManagement;
