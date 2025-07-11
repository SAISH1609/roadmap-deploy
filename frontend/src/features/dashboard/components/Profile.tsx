import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Skill Profile</h1>
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Button variant="outline">Edit Profile Picture</Button>
      </div>
      <div className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Srideep" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" placeholder="srideep@example.com" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="headline">Headline</Label>
          <Input type="text" id="headline" placeholder="Full Stack Developer" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="github">Github</Label>
          <Input type="url" id="github" placeholder="https://github.com/srideep" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="linkedin">Linkedin</Label>
          <Input type="url" id="linkedin" placeholder="https://linkedin.com/in/srideep" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="website">Website</Label>
          <Input type="url" id="website" placeholder="https://srideep.dev" />
        </div>
        <Button>Save Profile</Button>
      </div>
    </div>
  );
};

export default Profile;
