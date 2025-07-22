import { useEffect, useMemo } from 'react';
import { useTeamStore } from '@/store/teamStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const formatActivityType = (activityType: string) => {
  if (activityType === 'in_progress_topic') {
    return 'In Progress';
  }
  if (activityType === 'done_topic') {
    return 'Done';
  }
  return activityType
    .replace(/_topic/g, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());
};

const TeamActivity = () => {
  const { activities, fetchTeamActivity, selectedTeam } = useTeamStore();

  useEffect(() => {
    if (selectedTeam) {
      fetchTeamActivity(selectedTeam.id.toString());
    }
  }, [selectedTeam, fetchTeamActivity]);

  const activitiesByUser = useMemo(() => {
    const groupedByUser = activities.reduce((acc, activity) => {
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

    for (const userId in groupedByUser) {
      const userActivities = groupedByUser[userId].activities;

      // Sort activities to be safe, newest first
      userActivities.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

      const filteredActivities = userActivities.filter(
        (activity) => activity.activity_type !== 'not_started_topic'
      );

      const uniqueActivities = new Set<string>();
      const deDupedActivities = filteredActivities.filter((activity) => {
        const key = `${activity.description}-${activity.activity_type}`;
        if (uniqueActivities.has(key)) {
          return false;
        }
        uniqueActivities.add(key);
        return true;
      });

      groupedByUser[userId].activities = deDupedActivities;
    }

    return groupedByUser;
  }, [activities]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Team Activity</h2>
      <div className="space-y-4">
        {Object.values(activitiesByUser).map(({ user, activities }) => (
          <Card key={user.id} className="text-gray-900 dark:text-gray-100">
            <CardHeader >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={user.profile_picture} alt={user.username} />
                  <AvatarFallback>{user.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle  >{user.full_name || user.username}</CardTitle>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent >
              <ul>
                {activities.map((activity) => (
                  <li key={activity.id} className="mb-2">
                    <p className="font-semibold">{formatActivityType(activity.activity_type)}</p>
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
