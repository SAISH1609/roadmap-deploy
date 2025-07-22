import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { useactivityStore } from '../../../store/activityStore';
import { Book, CheckCircle, Clock } from 'lucide-react';

// Helper function to render the correct icon based on the string from the store
const renderStatIcon = (iconName: 'check' | 'book' | 'clock') => {
  switch (iconName) {
    case 'check':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    case 'book':
      return <Book className="h-6 w-6 text-blue-500" />;
    case 'clock':
      return <Clock className="h-6 w-6 text-orange-500" />;
    default:
      return null;
  }
};

const ActivityView = () => {
  // Get state and actions from the store
  const {
    stats,
    roadmaps,
    learningActivity,
    loading,
    error,
    activityFilter,
    fetchDashboardData,
    setActivityFilter,
  } = useactivityStore();

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  // Filter and process activities
  const filteredAndGroupedActivities = useMemo(() => {
    // Apply the current filter
    const filtered =
      activityFilter === 'all'
        ? learningActivity
        : learningActivity.filter((a) => a.action === activityFilter);

    // Deduplicate activities by topic and action
    const uniqueActivities = new Map<string, typeof filtered[0]>();
    for (const activity of filtered) {
      const key = `${activity.topic}-${activity.action}`;
      if (!uniqueActivities.has(key)) {
        uniqueActivities.set(key, activity);
      }
    }

    return Array.from(uniqueActivities.values());
  }, [learningActivity, activityFilter]);

  // Handle loading and error states
  if (loading) return <div className="p-8">Loading activity dashboard...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="p-1 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Activity</h1>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {stats.map((stat) => {
          const statCard = (
            <Card className="text-gray-900 dark:text-gray-100">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {renderStatIcon(stat.icon)}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );

          return stat.link ? (
            <Link to={stat.link} key={stat.title} className="hover:scale-105 transition-transform duration-200">
              {statCard}
            </Link>
          ) : (
            <div key={stat.title}>{statCard}</div>
          );
        })}
      </div>

      {/* Continue Following Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Continue Following</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => (
            <Link to={`/roadmaps/${roadmap.slug}`} key={`${roadmap.slug}-${roadmap.title}`} className="hover:scale-105 transition-transform duration-200">
              <Card className="text-gray-900 dark:text-gray-100">
                <CardHeader>
                  <CardTitle>{roadmap.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full"
                      style={{ width: `${roadmap.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{roadmap.progress}% complete</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Learning Activity Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Learning Activity</h2>
          <div className="flex space-x-2">
            <Button
              variant={activityFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setActivityFilter('all')}
            >
              All
            </Button>
            <Button
              variant={activityFilter === 'started' ? 'default' : 'outline'}
              onClick={() => setActivityFilter('started')}
            >
              Started
            </Button>
            <Button
              variant={activityFilter === 'completed' ? 'default' : 'outline'}
              onClick={() => setActivityFilter('completed')}
            >
              Completed
            </Button>
          </div>
        </div>
        <Card className="text-gray-900 dark:text-gray-100">
          <CardContent className="p-6">
            <ul className="space-y-4">
              {filteredAndGroupedActivities.map((activity) => (
                <li key={activity.id} className="flex items-center">
                  <div className="mr-4">
                    {activity.action === "completed" ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Book className="h-6 w-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">
                      You {activity.action} the topic:{" "}
                      <Link to={`/roadmaps/${activity.topicSlug}`} className="text-grey-900 hover:underline">
                        {activity.topic}
                      </Link>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{activity.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActivityView;