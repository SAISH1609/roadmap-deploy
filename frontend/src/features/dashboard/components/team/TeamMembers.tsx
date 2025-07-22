import { useEffect, useState } from 'react';
import { useTeamStore } from '@/store/teamStore';
import { useAuthStore } from '@/store/authStore';
import { getTeamMembers, inviteTeamMember, leaveTeam, removeTeamMember } from '@/services/teamService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const TeamMembers = () => {
  const { selectedTeam, setSelectedTeam } = useTeamStore();
  const { user } = useAuthStore();
  const [members, setMembers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);

  useEffect(() => {
    if (selectedTeam) {
      fetchMembers();
    }
  }, [selectedTeam]);

  useEffect(() => {
    const adminCheck = members.find(member => member.id === user?.id)?.role === 'admin';
    setIsAdmin(adminCheck);
  }, [members, user]);

  const fetchMembers = async () => {
    if (selectedTeam) {
      try {
        const teamMembers = await getTeamMembers(selectedTeam.id.toString());
        setMembers(teamMembers);
      } catch (error) {
        console.error("Failed to fetch team members:", error);
      }
    }
  };

  const handleInvite = async () => {
    if (selectedTeam) {
      try {
        await inviteTeamMember(selectedTeam.id.toString(), inviteEmail);
        setInviteEmail('');
        setIsInviteDialogOpen(false);
        // Optionally, show a success notification
      } catch (error) {
        console.error("Failed to invite member:", error);
        // Optionally, show an error notification
      }
    }
  };

  const handleLeaveTeam = async () => {
    if (selectedTeam) {
      try {
        await leaveTeam(selectedTeam.id.toString());
        setSelectedTeam(null);
        // Navigate to personal dashboard or another appropriate page
      } catch (error) {
        console.error("Failed to leave team:", error);
      }
    }
  };

  const handleRemoveMember = async (userId: number) => {
    if (selectedTeam) {
      try {
        await removeTeamMember(selectedTeam.id.toString(), userId);
        fetchMembers(); // Refresh member list
      } catch (error) {
        console.error("Failed to remove member:", error);
      }
    }
  };

  if (!selectedTeam) {
    return <div>Please select a team to see its members.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>{members.length} people in {selectedTeam.name}</CardTitle>
          <Button variant="destructive" onClick={handleLeaveTeam}>Leave Team</Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member: any) => (
            <div key={member.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={member.profile_picture} alt={member.username} />
                  <AvatarFallback>{member.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{member.full_name || member.username}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-600">{member.role}</span>
                {isAdmin && user?.id !== member.id && (
                  <Button variant="outline" size="sm" onClick={() => handleRemoveMember(member.id)}>
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ))}
          {isAdmin && (
            <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
              <DialogTrigger asChild>
                <Button className="mt-4">+ Invite Member</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Invite a new member</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <Button onClick={handleInvite}>Send Invitation</Button>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TeamMembers;