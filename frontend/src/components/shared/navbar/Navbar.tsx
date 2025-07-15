import { Link } from 'react-router';
import AuthNav from './AuthNav';
import RoadmapDropdown from './RoadmapDropdown';
import AITutorDropdown from './AITutorDropdown';

export default function Navbar() {
    return (
      <nav className="flex justify-center items-center px-6 py-4 bg-background border-b">
        <div className="flex items-center gap-4">
          <Link to="/" className="text-xl font-bold">Logo</Link>
          <RoadmapDropdown />
          <AITutorDropdown />
        </div>
        <AuthNav />
      </nav>
    )
  }
