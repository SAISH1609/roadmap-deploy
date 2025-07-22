import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Book, CheckCircle, Clock } from "lucide-react";

const ActivityView = () => {
  const stats = [
    { title: "Topics Completed", value: 12, icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { title: "Topics Learning", value: 3, icon: <Book className="h-6 w-6 text-blue-500" /> },
    { title: "Visit Streak", value: "5 days", icon: <Clock className="h-6 w-6 text-orange-500" /> },
  ];

  const roadmaps = [
    { title: "Frontend Developer", progress: 75 },
    { title: "React Developer", progress: 50 },
    { title: "Full Stack Developer", progress: 25 },
  ];

  const learningActivity = [
    { action: "started", topic: "CSS Basics", date: "2 days ago" },
    { action: "completed", topic: "HTML Fundamentals", date: "3 days ago" },
    { action: "started", topic: "JavaScript for Beginners", date: "4 days ago" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-black">Activity</h1>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-black">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-black">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-black">Continue Following</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {roadmaps.map((roadmap) => (
            <Card key={roadmap.title}>
              <CardHeader>
                <CardTitle className="text-black">{roadmap.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: `${roadmap.progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-black mt-2">{roadmap.progress}% complete</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-black">Learning Activity</h2>
        <Card>
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
                    <p className="font-semibold text-black">
                      You {activity.action} the topic: {activity.topic}
                    </p>
                    <p className="text-sm text-black">{activity.date}</p>
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