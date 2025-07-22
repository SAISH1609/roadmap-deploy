import { Link } from 'react-router-dom';
import AuthNav from './AuthNav';
import AITutorDropdown from './AITutorDropdown';
import logo from '@/assets/roadmapsh.png';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-background border-b">
      {/* Left Section: Logo and Menus */}
      <div className="flex items-center gap-8">
        <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-white tracking-tight hover:text-primary transition">
          <img src={logo} alt="Roadmap.sh Logo" className="h-12 w-auto rounded-lg" />
        </Link>
        <div className="flex items-center gap-4">
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