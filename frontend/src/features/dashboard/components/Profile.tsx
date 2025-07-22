import { useState, useEffect, useRef } from "react";
import { useAuthStore } from "@/store/authStore";
import { updateUserProfile } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Save, X, Upload } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useAuthStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    headline: "",
    github: "",
    twitter: "",
    linkedin: "",
    dailydev: "",
    website: "",
    availableForHire: false,
    profilePicture: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 3. On component load, copy user into formData
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.full_name || user.name || "",
        email: user.email || "",
        headline: user.headline || "",
        github: user.github_url || "",
        twitter: user.twitter_url || "",
        linkedin: user.linkedin_url || "",
        dailydev: user.dailydev_url || "",
        website: user.website || "",
        availableForHire: user.availableForHire || false,
        profilePicture: user.profilePicture || ""
      });
    }
  }, [user]);

  // 4. Controlled input change handler
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setFormData(prev => ({
          ...prev,
          profilePicture: result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditProfilePicture = () => {
    fileInputRef.current?.click();
  };

  // 5, 6, 7, 8. Save Profile logic
  const handleSaveProfile = async () => {
    setSaving(true);
    setError(null);
    try {
      const responseData = await updateUserProfile(formData);
      setUser(responseData); // update global state
      setIsEditing(false);
      alert("Profile saved successfully!");
    } catch (err: any) {
      setError(err?.message || "Failed to save profile. Please try again.");
      alert("Failed to save profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset form to last loaded user data
    if (user) {
      setFormData({
        name: user.full_name || user.name || "",
        email: user.email || "",
        headline: user.headline || "",
        github: user.github_url || "",
        twitter: user.twitter_url || "",
        linkedin: user.linkedin_url || "",
        dailydev: user.dailydev_url || "",
        website: user.website || "",
        availableForHire: user.availableForHire || false,
        profilePicture: user.profilePicture || ""
      });
    }
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Skill Profile</h1>
            <p className="text-gray-600">Create your skill profile to showcase your skills.</p>
          </div>
          {!isEditing ? (
            <Button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Pencil className="h-4 w-4" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                onClick={handleSaveProfile}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white"
                disabled={saving}
              >
                <Save className="h-4 w-4" />
                {saving ? "Saving..." : "Save"}
              </Button>
              <Button 
                onClick={handleCancel}
                variant="outline" 
                className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-100"
                disabled={saving}
              >
                <X className="h-4 w-4" />
                Cancel
              </Button>
            </div>
          )}
        </div>
        {error && (
          <div className="mb-4 text-red-600">{error}</div>
        )}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium text-gray-700 mb-3 block">Profile picture</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={formData.profilePicture} alt="Profile" />
                  <AvatarFallback className="text-xl bg-gray-600 text-white">
                    {formData.name.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                      onClick={handleEditProfilePicture}
                    >
                      <Upload className="h-4 w-4" />
                      Edit
                    </Button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="name" className="text-sm font-medium text-blue-600 mb-2 block">
                Name*
              </Label>
              <Input
                type="text"
                id="name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your full name"
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-blue-600 mb-2 block">
                Email*
              </Label>
              <Input
                type="email"
                id="email"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your email address"
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label htmlFor="headline" className="text-sm font-medium text-blue-600 mb-2 block">
                Headline
              </Label>
              <Input
                type="text"
                id="headline"
                value={formData.headline}
                onChange={e => handleInputChange("headline", e.target.value)}
                className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                placeholder="Headline (e.g. Full Stack Developer)"
                disabled={!isEditing}
              />
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="github" className="text-sm font-medium text-gray-700 mb-2 block">
                  GitHub
                </Label>
                <Input
                  type="url"
                  id="github"
                  value={formData.github}
                  onChange={e => handleInputChange("github", e.target.value)}
                  placeholder="https://github.com/username"
                  className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="text-sm font-medium text-gray-700 mb-2 block">
                  Twitter
                </Label>
                <Input
                  type="url"
                  id="twitter"
                  value={formData.twitter}
                  onChange={e => handleInputChange("twitter", e.target.value)}
                  placeholder="https://twitter.com/username"
                  className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="text-sm font-medium text-gray-700 mb-2 block">
                  LinkedIn
                </Label>
                <Input
                  type="url"
                  id="linkedin"
                  value={formData.linkedin}
                  onChange={e => handleInputChange("linkedin", e.target.value)}
                  placeholder="https://www.linkedin.com/in/username/"
                  className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
              <div>
                <Label htmlFor="website" className="text-sm font-medium text-gray-700 mb-2 block">
                  Website
                </Label>
                <Input
                  type="url"
                  id="website"
                  value={formData.website}
                  onChange={e => handleInputChange("website", e.target.value)}
                  placeholder="https://example.com"
                  className="w-full border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500"
                  disabled={!isEditing}
                />
              </div>
            </div>
            {isEditing && (
              <Button 
                onClick={handleSaveProfile}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-md"
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Profile"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;