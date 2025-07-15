import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import GuidesPage from '../components/ui/GuidesPage';
import VideosSection from '../components/ui/VideosSection';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('personal');
  const navigate = useNavigate();

  const handleProfileSetupClick = () => {
    navigate('/account/profile');
  };

  const skillRoadmaps = [
    { name: 'React', description: 'Build modern user interfaces with React.' },
    { name: 'Javascript', description: 'Master the language of the web.' },
    { name: 'PostgreSQL', description: 'Learn relational database management.' },
    { name: 'Python', description: 'Explore Python for web development, data science, and more.' },
  ];

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
          {/* Placeholder for actual teams */}
          <Button
            variant={selectedTab === 'team1' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('team1')}
          >
            Team Alpha
          </Button>
          <Button
            variant={selectedTab === 'team2' ? 'default' : 'ghost'}
            onClick={() => setSelectedTab('team2')}
          >
            Team Beta
          </Button>
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
                <h2 className="text-lg font-semibold">0 Days Streak</h2>
                <p className="text-sm text-gray-500">Keep learning every day!</p>
              </Card>
              <Card className="p-4 text-center">
                <h2 className="text-lg font-semibold">0 Learnt Today</h2>
                <p className="text-sm text-gray-500">Start a roadmap to learn something new.</p>
              </Card>
            </div>

            {/* Ongoing Roadmap Choice */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Ongoing Roadmap</h2>
              <p className="text-gray-600">No ongoing roadmap. Choose one below to start your learning journey!</p>
              {/* Placeholder for actual roadmap content */}
            </Card>

            {/* Various Skill Roadmaps */}
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Explore Skill Roadmaps</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {skillRoadmaps.map((skill) => (
                  <Card key={skill.name} className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{skill.name}</h3>
                      <span aria-label="bookmark" className="ml-2">
                        <svg width="15" height="16" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M4 2C2.89543 2 2 2.89543 2 4V22L10 18L18 22V4C18 2.89543 17.1046 2 16 2H4Z" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinejoin="round"/>
                          
                        </svg>
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{skill.description}</p>
                  </Card>
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
        {selectedTab !== 'personal' && (
          <div className="p-6 text-center text-gray-500">
            Content for {selectedTab === 'team1' ? 'Team Alpha' : 'Team Beta'} will be displayed here.
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
