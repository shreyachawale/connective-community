import React, { useState } from "react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { SmileIcon, SendIcon, ReplyIcon, XIcon } from "lucide-react";

interface Reply {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
}

interface Message {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
  replies: Reply[];
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      user: {
        name: "John Doe",
        avatar: "https://github.com/shadcn.png",
      },
      content: "Hey everyone! What do you think about the latest updates?",
      timestamp: new Date("2024-02-10T10:00:00"),
      replies: [],
    },
    {
      id: "2",
      user: {
        name: "Jane Smith",
        avatar: "https://github.com/shadcn.png",
      },
      content: "The new features look amazing! Great work on the implementation.",
      timestamp: new Date("2024-02-10T10:05:00"),
      replies: [],
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const { toast } = useToast();

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "https://github.com/shadcn.png",
      },
      content: newMessage,
      timestamp: new Date(),
      replies: [],
    };

    setMessages([...messages, message]);
    setNewMessage("");
    toast({
      description: "Message sent successfully!",
      duration: 2000,
    });
  };

  const handleReply = (messageId: string) => {
    if (!replyContent.trim()) return;

    const reply: Reply = {
      id: Date.now().toString(),
      user: {
        name: "Current User",
        avatar: "https://github.com/shadcn.png",
      },
      content: replyContent,
      timestamp: new Date(),
    };

    setMessages(messages.map(msg => {
      if (msg.id === messageId) {
        return {
          ...msg,
          replies: [...msg.replies, reply],
        };
      }
      return msg;
    }));

    setReplyContent("");
    setReplyingTo(null);
    toast({
      description: "Reply sent successfully!",
      duration: 2000,
    });
  };

  return (
    <div className="flex flex-col h-[600px] max-w-3xl mx-auto bg-background border rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Project Discussion</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className="space-y-2">
              <div className="flex items-start space-x-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <Avatar>
                  <img
                    src={message.user.avatar}
                    alt={message.user.name}
                    className="rounded-full"
                  />
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{message.user.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm text-foreground">{message.content}</p>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={() => setReplyingTo(message.id)}
                  >
                    <ReplyIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <SmileIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Replies */}
              <div className="ml-12 space-y-2">
                {message.replies.map((reply) => (
                  <div
                    key={reply.id}
                    className="flex items-start space-x-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors"
                  >
                    <Avatar>
                      <img
                        src={reply.user.avatar}
                        alt={reply.user.name}
                        className="rounded-full"
                      />
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{reply.user.name}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(reply.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm text-foreground">{reply.content}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Input */}
              {replyingTo === message.id && (
                <div className="ml-12 flex items-center space-x-2">
                  <Input
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Type your reply..."
                    className="flex-1"
                  />
                  <Button 
                    onClick={() => handleReply(message.id)}
                    size="icon"
                  >
                    <SendIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost"
                    size="icon"
                    onClick={() => setReplyingTo(null)}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button type="submit" size="icon">
            <SendIcon className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatSection;