import React, { useState, useEffect } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuSeparator
  } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, Users } from "lucide-react";
import { useAuthStore } from '@/store/authStore';
import { useTeamStore } from '@/store/teamStore';
import { AuthDialog } from '../AuthDialog';

export default function AuthNav() {
  const { isAuthenticated, user, logout } = useAuthStore();
  const { teams, fetchTeams, setSelectedTeam } = useTeamStore();
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTeams();
    }
  }, [isAuthenticated, fetchTeams]);

  const handleLogout = () => {
    logout();
    // Optionally, redirect to home page or show a notification
  };

  const handleTeamClick = (team: typeof teams[0]) => {
    setSelectedTeam(team);
    navigate('/account/team/activity');
  };

  if (!isAuthenticated) {
    return (
      <>
        <Button onClick={() => setIsAuthDialogOpen(true)} className="bg-purple-600 text-white rounded-full">
          Login / Register
        </Button>
        <AuthDialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-purple-600 text-white rounded-full">
          {user?.username || 'Account'} / Teams
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link to="/account">Account</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/account/profile">My Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Users className="mr-2 h-4 w-4" />
            <span>Teams</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            {teams.map(team => (
              <DropdownMenuItem key={team.id} onClick={() => handleTeamClick(team)}>
                {team.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/teams/create">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create new team
              </Link>
            </DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
