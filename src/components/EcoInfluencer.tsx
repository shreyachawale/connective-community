import React from "react";
import { Share, Award, UserPlus, Heart, Leaf, Users, Trophy, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";

interface Reward {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
}

interface Stats {
  followers: number;
  impact: number;
  trees: number;
}

const rewards: Reward[] = [
  {
    id: 1,
    name: "Eco Event Access",
    description: "Exclusive access to sustainable project events",
    icon: <Award className="h-6 w-6 text-green-500" />,
  },
  {
    id: 2,
    name: "Community Leader",
    description: "Private discussions with project leaders",
    icon: <UserPlus className="h-6 w-6 text-blue-500" />,
  },
  {
    id: 3,
    name: "Green Products",
    description: "Eco-friendly product rewards",
    icon: <Leaf className="h-6 w-6 text-emerald-500" />,
  },
];

const userStats: Stats = {
  followers: 1234,
  impact: 89,
  trees: 45,
};

const EcoInfluencer = () => {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Eco-Influencer Scorecard",
          text: "Check out my impact on sustainable projects!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Share your scorecard link with others",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        variant: "destructive",
        title: "Error sharing scorecard",
        description: "Please try again later",
      });
    }
  };

  return (
    <div className="space-y-8 p-6 bg-white rounded-xl shadow-sm">
      {/* Profile Header - Instagram Style */}
      <div className="flex flex-col md:flex-row items-center gap-6">
        <Avatar className="w-24 h-24 border-2 border-green-500">
          <img
            src="https://github.com/shadcn.png"
            alt="Profile"
            className="rounded-full"
          />
        </Avatar>
        
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold mb-2">Eco Champion</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-6 mb-4">
            <div className="text-center">
              <span className="block font-bold text-xl">{userStats.followers}</span>
              <span className="text-sm text-gray-600">Followers</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-xl">{userStats.impact}%</span>
              <span className="text-sm text-gray-600">Impact Score</span>
            </div>
            <div className="text-center">
              <span className="block font-bold text-xl">{userStats.trees}</span>
              <span className="text-sm text-gray-600">Trees Planted</span>
            </div>
          </div>
          <Button onClick={handleShare} className="gap-2">
            <Share className="h-4 w-4" />
            Share Profile
          </Button>
        </div>
      </div>

      {/* Stats Cards - Instagram Grid Style */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <Card 
            key={reward.id} 
            className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-gray-50 rounded-lg">
                {reward.icon}
              </div>
              <div>
                <h3 className="font-semibold">{reward.name}</h3>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Achievement Banner */}
      <div className="rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 p-6">
        <div className="flex items-center gap-4">
          <div className="flex -space-x-2">
            <Trophy className="h-6 w-6 text-yellow-500" />
            <TreePine className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h4 className="font-semibold text-green-800">Level 3 Eco Influencer</h4>
            <p className="text-sm text-green-700">
              Share your journey to unlock exclusive rewards and inspire others!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EcoInfluencer;