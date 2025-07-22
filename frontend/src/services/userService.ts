import apiClient from './apiClient';

export const updateUserProfile = async (profileData: any) => {
  const payload = {
    email: profileData.email,
    username: profileData.username, // Assuming username is available in the form
    full_name: profileData.name,
    headline: profileData.headline,
    github_url: profileData.github,
    linkedin_url: profileData.linkedin,
    website_url: profileData.website,
    profile_picture: profileData.profilePicture,
  };
  const response = await apiClient.put('/users/profile', payload);
  return response.data;
};
