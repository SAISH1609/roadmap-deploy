import apiClient from './apiClient';

export const getTeams = async () => {
  const response = await apiClient.get('/teams/');
  return response.data;
};

export const getTeamActivity = async (teamId: string) => {
  const response = await apiClient.get(`/teams/${teamId}/activity`);
  return response.data;
};

export const getTeamMembers = async (teamId: string) => {
  const response = await apiClient.get(`/teams/${teamId}/members`);
  return response.data;
};

export const inviteTeamMember = async (teamId: string, email: string) => {
  const response = await apiClient.post(`/teams/${teamId}/invite`, { email });
  return response.data;
};

export const leaveTeam = async (teamId: string) => {
  const response = await apiClient.delete(`/teams/${teamId}/leave`);
  return response.data;
};

export const removeTeamMember = async (teamId: string, userId: number) => {
  const response = await apiClient.delete(`/teams/${teamId}/members/${userId}`);
  return response.data;
};
