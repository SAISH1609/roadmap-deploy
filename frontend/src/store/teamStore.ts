import { create } from 'zustand';
import { getTeams } from '../services/teamService';

type Team = {
  id: number;
  name: string;
};

type TeamState = {
  teams: Team[];
  fetchTeams: () => Promise<void>;
};

export const useTeamStore = create<TeamState>((set) => ({
  teams: [],
  fetchTeams: async () => {
    try {
      const teams = await getTeams();
      set({ teams });
    } catch (error) {
      console.error("Failed to fetch teams:", error);
    }
  },
}));