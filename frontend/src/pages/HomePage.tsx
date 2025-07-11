import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

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
    <div className="flex flex-col min-h-screen">
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
                    <h3 className="font-semibold">{skill.name}</h3>
                    <p className="text-sm text-gray-500">{skill.description}</p>
                  </Card>
                ))}
              </div>
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
