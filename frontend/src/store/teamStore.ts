import { create } from 'zustand';
import { getTeams, getTeamActivity } from '../services/teamService';

type Team = {
  id: number;
  name: string;
};

type Activity = {
  id: number;
  activity_type: string;
  description: string;
  created_at: string;
};

type TeamState = {
  teams: Team[];
  activities: Activity[];
  fetchTeams: () => Promise<void>;
  fetchTeamActivity: (teamId: string) => Promise<void>;
};

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  activities: [],
  fetchTeams: async () => {
    try {
      const teams = await getTeams();
      set({ teams });
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  },
  fetchTeamActivity: async (teamId: string) => {
    try {
      const activities = await getTeamActivity(teamId);
      set({ activities });
    } catch (error) {
      console.error("Failed to fetch team activity:", error);
    }
  },
}));