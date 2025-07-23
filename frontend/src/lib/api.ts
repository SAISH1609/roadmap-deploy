const API_BASE_URL = "http://localhost:8000/api";

export interface Guide {
  id: number;
  title: string;
  type: string;
  link: string;
  description?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at?: string;
}

export interface Video {
  id: number;
  title: string;
  duration: string;
  link: string;
  description?: string;
  is_active: boolean;
  order_index: number;
  created_at: string;
  updated_at?: string;
}

export const contentApi = {
  async getGuides(): Promise<Guide[]> {
    const response = await fetch(`${API_BASE_URL}/content/guides`);
    if (!response.ok) {
      throw new Error("Failed to fetch guides");
    }
    return response.json();
  },

  async getVideos(): Promise<Video[]> {
    const response = await fetch(`${API_BASE_URL}/content/videos`);
    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }
    return response.json();
  },

  async getGuideById(id: number): Promise<Guide> {
    const response = await fetch(`${API_BASE_URL}/content/guides/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch guide");
    }
    return response.json();
  },

  async getVideoById(id: number): Promise<Video> {
    const response = await fetch(`${API_BASE_URL}/content/videos/${id}`);
    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }
    return response.json();
  },
};
