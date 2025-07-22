import { useEffect, useState } from 'react';
import { useTeamStore } from '@/store/teamStore';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/services/apiClient';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ProgressSummary {
  roadmap_title: string;
  completed_topics: number;
  total_topics: number;
}

interface TeamMember {
  id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  progress?: ProgressSummary[];
}

const TeamProgress = () => {
  const { selectedTeam } = useTeamStore();
  const { user } = useAuthStore();
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      if (selectedTeam) {
        try {
          const membersResponse = await apiClient.get(`/teams/${selectedTeam.id}/members`);
          const members: TeamMember[] = membersResponse.data;

          const progressPromises = members.map(member =>
            apiClient.get(`/progress/${member.id}/summary`).then(res => res.data)
          );

          const progressResults = await Promise.all(progressPromises);

          const membersWithProgress = members.map((member, index) => ({
            ...member,
            progress: progressResults[index],
          }));

          setTeamMembers(membersWithProgress);
        } catch (error) {
          console.error('Error fetching team data:', error);
        }
      }
    };

    fetchTeamData();
  }, [selectedTeam]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Team Progress</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamMembers.map(member => (
          <Card key={member.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.profile_picture} alt={member.username} />
                  <AvatarFallback>{member.full_name?.charAt(0).toUpperCase() || member.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{member.full_name || member.username}</CardTitle>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              {member.id === user?.id && <Badge variant="destructive">You</Badge>}
            </CardHeader>
            <CardContent>
              {member.progress && member.progress.length > 0 ? (
                <ul>
                  {member.progress.slice(0, 4).map(p => (
                    <li key={p.roadmap_title}>{`${p.roadmap_title} ${p.completed_topics} / ${p.total_topics}`}</li>
                  ))}
                  {member.progress.length > 4 && (
                    <li className="text-sm text-gray-500">+ {member.progress.length - 4} more</li>
                  )}
                </ul>
              ) : (
                <p className="text-center text-gray-500">No progress</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamProgress;