import { useEffect, useState } from 'react';
import { getTeamRoadmaps } from '../../../../services/teamService';
import { useTeamStore } from '../../../../store/teamStore';
import { Card, CardContent, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import { ExternalLink } from 'lucide-react';
import { Link } from 'react-router';

type Roadmap = {
  id: number;
  title: string;
  slug: string;
  total_topics: number;
};

const TeamRoadmaps = () => {
  const { selectedTeam } = useTeamStore();
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedTeam) {
      const fetchRoadmaps = async () => {
        try {
          setLoading(true);
          const data = await getTeamRoadmaps(selectedTeam.id.toString());
          setRoadmaps(data);
          setError(null);
        } catch (err) {
          setError('Failed to fetch roadmaps');
        } finally {
          setLoading(false);
        }
      };
      fetchRoadmaps();
    }
  }, [selectedTeam]);

  if (!selectedTeam) {
    return <div>Please select a team to see their roadmaps.</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Card className="text-gray-900 dark:text-gray-100">
      <CardHeader >
        <CardTitle >Team Roadmaps</CardTitle>
      </CardHeader>
      <CardContent >
        <div className="space-y-4">
          {roadmaps.length > 0 ? (
            roadmaps.map((roadmap) => (
              <div key={roadmap.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="text-lg font-semibold">{roadmap.title}</h3>
                  <p className="text-sm text-muted-foreground">{roadmap.total_topics} topics</p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link to={`/roadmaps/${roadmap.slug}`}>
                    Visit <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            ))
          ) : (
            <p>No roadmaps found for this team.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamRoadmaps;