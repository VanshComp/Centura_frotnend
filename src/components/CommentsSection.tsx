import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Send, Reply, AlertCircle } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  role: string;
  content: string;
  timestamp: string;
  isChangeRequest: boolean;
  replies?: Comment[];
}

export function CommentsSection() {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState("");
  const [isChangeRequest, setIsChangeRequest] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Mock comments
  const [comments, setComments] = useState<Comment[]>([
    {
      id: "1",
      author: "Sarah Chen",
      role: "Compliance Officer",
      content:
        "The disclaimer for past performance is missing. This is a critical requirement per SEBI regulations.",
      timestamp: "2025-11-05 14:30",
      isChangeRequest: true,
      replies: [
        {
          id: "1-1",
          author: "Alex Kumar",
          role: "Marketing Team",
          content: "Acknowledged. We'll add the disclaimer in the next iteration.",
          timestamp: "2025-11-05 15:00",
          isChangeRequest: false,
        },
      ],
    },
    {
      id: "2",
      author: "Sarah Chen",
      role: "Compliance Officer",
      content: "The fee structure disclosure looks good and meets all requirements.",
      timestamp: "2025-11-05 14:35",
      isChangeRequest: false,
    },
  ]);

  const handlePostComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Current User",
      role: "Compliance Officer",
      content: newComment,
      timestamp: new Date().toLocaleString(),
      isChangeRequest,
    };

    if (replyingTo) {
      // Add as reply
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyingTo
            ? { ...c, replies: [...(c.replies || []), comment] }
            : c
        )
      );
      setReplyingTo(null);
    } else {
      // Add as new comment
      setComments((prev) => [...prev, comment]);
    }

    toast({
      title: isChangeRequest ? "Change request posted" : "Comment posted",
      description: isChangeRequest
        ? "Marketing team will be notified of this change request."
        : "Your comment has been added to the case.",
    });

    setNewComment("");
    setIsChangeRequest(false);
  };

  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={isReply ? "ml-12 mt-4" : ""}>
      <Card className="p-4 border-border">
        <div className="flex gap-3">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="text-xs">
              {comment.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{comment.author}</span>
                <Badge variant="outline" className="text-xs">
                  {comment.role}
                </Badge>
                {comment.isChangeRequest && (
                  <Badge variant="outline" className="text-xs bg-warning/20 text-warning border-warning/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Change Request
                  </Badge>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
            </div>
            <p className="text-sm">{comment.content}</p>
            {!isReply && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setReplyingTo(comment.id)}
                className="gap-2 h-8"
              >
                <Reply className="w-3 h-3" />
                Reply
              </Button>
            )}
          </div>
        </div>
      </Card>
      {comment.replies && comment.replies.map((reply) => renderComment(reply, true))}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* New Comment */}
      <Card className="p-6 border-border">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">
              {replyingTo ? "Reply to comment" : "Add Comment"}
            </h4>
            {replyingTo && (
              <Button variant="ghost" size="sm" onClick={() => setReplyingTo(null)}>
                Cancel Reply
              </Button>
            )}
          </div>
          <Textarea
            placeholder="Type your comment or feedback... Use @ to mention users"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Switch
                id="change-request"
                checked={isChangeRequest}
                onCheckedChange={setIsChangeRequest}
              />
              <Label htmlFor="change-request" className="text-sm cursor-pointer">
                Mark as Change Request
              </Label>
            </div>
            <Button onClick={handlePostComment} className="gap-2">
              <Send className="w-4 h-4" />
              Post Comment
            </Button>
          </div>
        </div>
      </Card>

      {/* Comments List */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-muted-foreground">
          {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
        </h4>
        {comments.map((comment) => renderComment(comment))}
      </div>
    </div>
  );
}
