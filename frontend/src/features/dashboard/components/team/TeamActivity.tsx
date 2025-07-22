import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTeamStore } from '@/store/teamStore';

const TeamActivity = () => {
  const { teamId } = useParams<{ teamId: string }>();
  const { activities, fetchTeamActivity } = useTeamStore();

  useEffect(() => {
    if (teamId) {
      fetchTeamActivity(teamId);
    }
  }, [teamId, fetchTeamActivity]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Team Activity</h2>
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
    </div>
  );
};

export default TeamActivity;
