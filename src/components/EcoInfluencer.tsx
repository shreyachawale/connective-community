import React from "react";
import { Share, Award, UserPlus, Heart, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface Reward {
  id: number;
  name: string;
  description: string;
  icon: React.ReactNode;
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
        // Fallback to copying to clipboard
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
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Eco-Influencer Program</h2>
        <Button onClick={handleShare} className="gap-2">
          <Share className="h-4 w-4" />
          Share Scorecard
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rewards.map((reward) => (
          <Card key={reward.id} className="p-4">
            <div className="flex items-start space-x-4">
              {reward.icon}
              <div>
                <h3 className="font-semibold">{reward.name}</h3>
                <p className="text-sm text-gray-600">{reward.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="rounded-lg bg-green-50 p-4">
        <div className="flex items-center gap-2">
          <Heart className="h-5 w-5 text-green-600" />
          <p className="text-sm text-green-800">
            Share your scorecard to earn rewards and help grow our sustainable community!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EcoInfluencer;