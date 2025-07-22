import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  // Get state and the fetch function from the store
  const { stats, roadmaps, learningActivity, loading, error, fetchDashboardData } = useactivityStore();

  // Fetch data only once when the component mounts
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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

          // If the stat has a link, wrap the card in a Link component
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
            <Link to={`/roadmaps/${roadmap.slug}`} key={roadmap.title} className="hover:scale-105 transition-transform duration-200">
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
        <h2 className="text-2xl font-bold mb-4">Learning Activity</h2>
        <Card className="text-gray-900 dark:text-gray-100">
          <CardContent className="p-6">
            <ul className="space-y-4">
              {learningActivity.map((activity, index) => (
                <li key={index} className="flex items-center">
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