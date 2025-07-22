import { useEffect, useMemo } from 'react';
import { useTeamStore } from '@/store/teamStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const TeamActivity = () => {
  const { activities, fetchTeamActivity, selectedTeam } = useTeamStore();

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamActivity(selectedTeam.id.toString());
    }
  }, [selectedTeam, fetchTeamActivity]);

  const activitiesByUser = useMemo(() => {
    return activities.reduce((acc, activity) => {
      const userId = activity.user.id;
      if (!acc[userId]) {
        acc[userId] = {
          user: activity.user,
          activities: [],
        };
      }
      acc[userId].activities.push(activity);
      return acc;
    }, {} as Record<string, { user: any; activities: any[] }>);
  }, [activities]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Team Activity</h2>
      <div className="space-y-4">
        {Object.values(activitiesByUser).map(({ user, activities }) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.profile_picture} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{user.full_name || user.username}</CardTitle>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul>
                {activities.map((activity) => (
                  <li key={activity.id} className="mb-2">
                    <p className="font-semibold">{activity.activity_type}</p>
                    <p>{activity.description}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(activity.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TeamActivity;
