import React from "react";
import { Share, MessageCircle, Heart, Bookmark, MoreHorizontal, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Avatar } from "@/components/ui/avatar";

interface Stats {
  likes: number;
  comments: number;
  trees: number;
}

const userStats: Stats = {
  likes: 1234,
  comments: 89,
  trees: 45,
};

const EcoInfluencer = () => {
  const { toast } = useToast();
  const [isLiked, setIsLiked] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "My Eco Journey",
          text: "Check out my impact on sustainable projects!",
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Share your eco journey with others",
        });
      }
    } catch (error) {
      console.error("Error sharing:", error);
      toast({
        variant: "destructive",
        title: "Error sharing post",
        description: "Please try again later",
      });
    }
  };

  return (
    <Card className="max-w-xl mx-auto overflow-hidden">
      {/* Post Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <img
              src="https://github.com/shadcn.png"
              alt="Profile"
              className="rounded-full"
            />
          </Avatar>
          <div>
            <h3 className="font-semibold text-sm">eco_champion</h3>
            <p className="text-xs text-muted-foreground">Level 3 Influencer</p>
          </div>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square bg-muted">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb"
          alt="Eco Project"
          className="object-cover w-full h-full"
        />
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full flex items-center gap-2">
          <TreePine className="h-4 w-4" />
          <span className="text-sm font-medium">{userStats.trees} Trees Planted</span>
        </div>
      </div>

      {/* Post Actions */}
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsLiked(!isLiked)}
              className={isLiked ? "text-red-500" : ""}
            >
              <Heart className="h-6 w-6" fill={isLiked ? "currentColor" : "none"} />
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircle className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleShare}>
              <Share className="h-6 w-6" />
            </Button>
          </div>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark 
              className="h-6 w-6" 
              fill={isSaved ? "currentColor" : "none"} 
            />
          </Button>
        </div>

        {/* Engagement Stats */}
        <div className="space-y-1">
          <p className="font-semibold text-sm">{userStats.likes.toLocaleString()} likes</p>
          <p className="text-sm">
            <span className="font-semibold">eco_champion</span>{" "}
            Making a difference one tree at a time! 🌱 Join me in creating a sustainable future. Every small action counts! #EcoWarrior #Sustainability
          </p>
          <p className="text-sm text-muted-foreground">
            View all {userStats.comments} comments
          </p>
          <p className="text-xs text-muted-foreground uppercase">2 hours ago</p>
        </div>
      </div>
    </Card>
  );
};

export default EcoInfluencer;