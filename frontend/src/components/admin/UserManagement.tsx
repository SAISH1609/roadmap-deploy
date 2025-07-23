import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Plus, Edit, Trash2, UserX, UserCheck } from "lucide-react";

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  is_active: boolean;
  is_admin: boolean;
  is_verified: boolean;
  created_at: string;
}

interface UserFormData {
  username: string;
  email: string;
  full_name: string;
  password?: string;
  is_admin: boolean;
}

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    username: "",
    email: "",
    full_name: "",
    password: "",
    is_admin: false,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch("http://localhost:8000/api/admin/users/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingUser
        ? `http://localhost:8000/api/admin/users/${editingUser.id}`
        : "http://localhost:8000/api/admin/users/";

      const method = editingUser ? "PUT" : "POST";

      // Prepare the body - for updates, don't send empty password
      let body: any = {
        username: formData.username,
        email: formData.email,
        full_name: formData.full_name,
        is_admin: formData.is_admin,
      };

      // Only include password if it's provided and not empty
      if (formData.password && formData.password.trim() !== "") {
        body.password = formData.password;
      }

      console.log(`${method} request to ${url}:`, body);

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        console.log("User saved successfully");
        await fetchUsers();
        setShowForm(false);
        setEditingUser(null);
        setFormData({
          username: "",
          email: "",
          full_name: "",
          password: "",
          is_admin: false,
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to save user:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to save user:", error);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      full_name: user.full_name,
      password: "",
      is_admin: user.is_admin,
    });
    setShowForm(true);
  };

  const handleDelete = async (userId: number) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const token = localStorage.getItem("admin_token");
      console.log(`Deleting user ${userId}`);
      const response = await fetch(
        `http://localhost:8000/api/admin/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log("User deleted successfully");
        await fetchUsers();
      } else {
        const errorData = await response.text();
        console.error("Failed to delete user:", response.status, errorData);
      }
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  const handleToggleActive = async (userId: number, isActive: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const endpoint = isActive ? "deactivate" : "activate";
      console.log(`${endpoint}ing user ${userId}`);
      const response = await fetch(
        `http://localhost:8000/api/admin/users/${userId}/${endpoint}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        console.log(`User ${endpoint}d successfully`);
        await fetchUsers();
      } else {
        const errorData = await response.text();
        console.error(
          `Failed to ${endpoint} user:`,
          response.status,
          errorData
        );
      }
    } catch (error) {
      console.error("Failed to toggle user status:", error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading users...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">User Management</h2>
        <Button
          onClick={() => {
            setEditingUser(null);
            setFormData({
              username: "",
              email: "",
              full_name: "",
              password: "",
              is_admin: false,
            });
            setShowForm(true);
          }}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </Button>
      </div>

      {showForm && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-white mb-4">
            {editingUser ? "Edit User" : "Add New User"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.full_name}
                onChange={(e) =>
                  setFormData({ ...formData, full_name: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password {editingUser && "(leave empty to keep current)"}
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white"
                required={!editingUser}
              />
            </div>
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.is_admin}
                  onChange={(e) =>
                    setFormData({ ...formData, is_admin: e.target.checked })
                  }
                  className="w-4 h-4"
                />
                <span className="text-gray-300">Admin privileges</span>
              </label>
            </div>
            <div className="flex space-x-3">
              <Button type="submit">
                {editingUser ? "Update User" : "Create User"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowForm(false);
                  setEditingUser(null);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Card>
      )}

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="p-4">
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-white">
                    {user.full_name || user.username}
                  </h4>
                  {user.is_admin && (
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                      Admin
                    </span>
                  )}
                  {!user.is_active && (
                    <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">
                      Inactive
                    </span>
                  )}
                  {user.is_verified && (
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                      Verified
                    </span>
                  )}
                </div>
                <p className="text-gray-400">@{user.username}</p>
                <p className="text-gray-400">{user.email}</p>
                <p className="text-gray-500 text-sm">
                  Created: {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleEdit(user)}
                  className="p-2"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleActive(user.id, user.is_active)}
                  className="p-2"
                >
                  {user.is_active ? (
                    <UserX className="w-4 h-4" />
                  ) : (
                    <UserCheck className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
                  className="p-2"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400">No users found</p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
