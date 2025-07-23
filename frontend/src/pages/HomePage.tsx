import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import GuidesPage from '../components/ui/GuidesPage';
import VideosSection from '../components/ui/VideosSection';
import { useTeamStore, type Team } from '../store/teamStore';
import { useactivityStore } from '../store/activityStore';

import { useRoadmapStore } from '../store/roadmapStore';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('personal');
  const navigate = useNavigate();
  const { teams, fetchTeams, setSelectedTeam } = useTeamStore();
  const {
    stats,
    topicsCompletedToday,
    roadmaps: ongoingRoadmaps,
    fetchDashboardData,
    fetchTopicsCompletedToday,
  } = useactivityStore();
  const { roadmaps: skillRoadmaps, fetchRoadmaps: fetchAllRoadmaps } = useRoadmapStore();

  useEffect(() => {
    fetchTeams();
    fetchDashboardData();
    fetchTopicsCompletedToday();
    fetchAllRoadmaps();
  }, [fetchTeams, fetchDashboardData, fetchTopicsCompletedToday, fetchAllRoadmaps]);

  const handleProfileSetupClick = () => {
    navigate('/account/profile');
  };

  const handleTeamClick = (team: Team) => {
    setSelectedTeam(team);
    navigate('/account/team/activity');
  };

  const visitStreakStat = stats.find(stat => stat.title === 'Visit Streak');

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-950 via-black to-black">
      <div className="container mx-auto px-4 py-8">
        
        {/* Teams Section */}
        <div className="flex space-x-4 border-b pb-2 mb-4">
          <Button
            variant={selectedTab === 'personal' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('personal')}
          >
            Personal
          </Button>
          {teams.map((team) => (
            <Button
              key={team.id}
              variant={selectedTab === `team-${team.id}` ? 'default' : 'ghost'}
              onClick={() => {
                setSelectedTab(`team-${team.id}`);
                handleTeamClick(team);
              }}
            >
              {team.name}
            </Button>
          ))}
        </div>

        {/* Content based on selected tab */}
        {selectedTab === 'personal' && (
          <div className="space-y-6">
            {/* Profile, Streak, Learnt Today */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 text-center cursor-pointer" onClick={handleProfileSetupClick}>
                <h2 className="text-lg font-semibold">Set Up your Profile</h2>
                <p className="text-sm text-gray-500">Complete your profile to get started.</p>
              </Card>
              <Card className="p-4 text-center">
                <h2 className="text-lg font-semibold">{visitStreakStat ? visitStreakStat.value : '0 days'}</h2>
                <p className="text-sm text-gray-500">Keep learning every day!</p>
              </Card>
              <Card className="p-4 text-center">
                <h2 className="text-lg font-semibold">{topicsCompletedToday} Learnt Today</h2>
                <p className="text-sm text-gray-500">Start a roadmap to learn something new.</p>
              </Card>
            </div>

            {/* Ongoing Roadmap Choice */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Ongoing Roadmaps</h2>
              {ongoingRoadmaps && ongoingRoadmaps.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {ongoingRoadmaps.map((roadmap) => (
                    <Link to={`/roadmaps/${roadmap.slug}`} key={`${roadmap.slug}-${roadmap.title}`} className="no-underline">
                      <Card className="text-gray-900 dark:text-gray-100 h-full hover:bg-gray-800 transition-colors">
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
              ) : (
                <p className="text-gray-600">No ongoing roadmap. Choose one below to start your learning journey!</p>
              )}
            </Card>

            {/* Various Skill Roadmaps */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Explore Skill Roadmaps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillRoadmaps.map((skill) => (
                  <Link to={`/roadmaps/${skill.slug}`} key={skill.id} className="no-underline">
                    <Card className="p-4 h-full hover:bg-gray-800 transition-colors">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{skill.title}</h3>
                        <span aria-label="bookmark" className="ml-2">
                          <svg width="15" height="16" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 2C2.89543 2 2 2.89543 2 4V22L10 18L18 22V4C18 2.89543 17.1046 2 16 2H4Z" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/>
                          </svg>
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{skill.description}</p>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Guides Section */}
            <div className="mt-10">
              <GuidesPage />
              <VideosSection />
            </div>
          </div>
        )}

        {/* Placeholder for Team content */}
        {selectedTab.startsWith('team-') && (
          <div className="p-6 text-center text-gray-500">
            Navigating to team page...
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
