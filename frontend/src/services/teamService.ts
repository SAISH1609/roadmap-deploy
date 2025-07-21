import apiClient from './apiClient';

export const getTeams = async () => {
  const response = await apiClient.get('/teams/');
  return response.data;
};