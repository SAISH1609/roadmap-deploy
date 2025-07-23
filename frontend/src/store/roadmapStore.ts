import { create } from 'zustand';
import { getRoadmaps } from '../services/roadmapService';
import type { RoadmapSummary } from '../types';

interface RoadmapState {
  roadmaps: RoadmapSummary[];
  fetchRoadmaps: () => Promise<void>;
}

export const useRoadmapStore = create<RoadmapState>((set) => ({
  roadmaps: [],
  fetchRoadmaps: async () => {
    try {
      const roadmaps = await getRoadmaps();
      set({ roadmaps });
    } catch (error) {
      console.error('Error fetching roadmaps:', error);
    }
  },
}));
