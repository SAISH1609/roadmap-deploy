import apiClient from './apiClient';

export const getTeams = async () => {
  const response = await apiClient.get('/teams/');
  return response.data;
};

export const getTeamActivity = async (teamId: string) => {
  const response = await apiClient.get(`/teams/${teamId}/activity`);
  return response.data;
};