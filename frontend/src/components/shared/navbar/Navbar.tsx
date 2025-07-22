import { Link } from 'react-router';
import AuthNav from './AuthNav';
import RoadmapDropdown from './RoadmapDropdown';
import AITutorDropdown from './AITutorDropdown';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-background border-b">
      {/* Left Section: Logo and Menus */}
      <div className="flex items-center gap-8">
        <Link to="/" className="text-2xl font-bold text-white tracking-tight hover:text-primary transition">
          Logo
        </Link>
        <div className="flex items-center gap-4">
          <RoadmapDropdown />
          <AITutorDropdown />
        </div>
      </div>
      {/* Right Section: AuthNav */}
      <div className="flex items-center">
        <AuthNav />
      </div>
    </nav>
  );
}