import axios from "axios";

export const updateUserProfile = async (profileData: any) => {
  const token = localStorage.getItem("token");
  const response = await axios.put(
    "/api/users/profile",
    profileData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};