'use client';

import { AlertTriangle, CheckCircle, ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

type Comment = {
  id: number;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  dislikes: number;
  isFactChecked: boolean;
};

type Proposal = {
  id: number;
  title: string;
  description: string;
  author: string;
  timestamp: string;
  category: string;
  comments: Comment[];
};

export default function DeliberationSpaces() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 1,
      title: 'Implement City-Wide Recycling Program',
      description:
        'Proposal to establish a comprehensive recycling program covering all neighborhoods in our city.',
      author: 'Green Initiative Group',
      timestamp: '2025-03-15',
      category: 'Environment',
      comments: [
        {
          id: 1,
          author: 'Jane Doe',
          avatar: '/placeholder.svg?height=40&width=40',
          content:
            'This is a great initiative! However, we need to consider the cost implications for lower-income neighborhoods.',
          timestamp: '2025-03-16 10:30',
          likes: 15,
          dislikes: 2,
          isFactChecked: false,
        },
        {
          id: 2,
          author: 'John Smith',
          avatar: '/placeholder.svg?height=40&width=40',
          content:
            'According to the Environmental Protection Agency, recycling can reduce landfill waste by up to 75%.',
          timestamp: '2025-03-16 11:45',
          likes: 28,
          dislikes: 0,
          isFactChecked: true,
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState('');

  const addComment = (proposalId: number) => {
    if (newComment.trim()) {
      setProposals(
        proposals.map((proposal) =>
          proposal.id === proposalId
            ? {
                ...proposal,
                comments: [
                  ...proposal.comments,
                  {
                    id: proposal.comments.length + 1,
                    author: 'You',
                    avatar: '/placeholder.svg?height=40&width=40',
                    content: newComment,
                    timestamp: new Date().toLocaleString(),
                    likes: 0,
                    dislikes: 0,
                    isFactChecked: false,
                  },
                ],
              }
            : proposal,
        ),
      );
      setNewComment('');
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {proposals.map((proposal) => (
        <Card key={proposal.id}>
          <CardHeader>
            <CardTitle>{proposal.title}</CardTitle>
            <CardDescription>
              Proposed by {proposal.author} on {proposal.timestamp}
            </CardDescription>
            <Badge>{proposal.category}</Badge>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{proposal.description}</p>
            <h3 className="mb-2 text-lg font-semibold">Discussion</h3>
            <ScrollArea className="h-[300px] pr-4">
              {proposal.comments.map((comment) => (
                <Card key={comment.id} className="mb-4">
                  <CardHeader className="py-2">
                    <div className="flex items-center space-x-2">
                      <Avatar>
                        <AvatarImage src={comment.avatar} />
                        <AvatarFallback>{comment.author[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-sm">
                          {comment.author}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {comment.timestamp}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="py-2">
                    <p className="text-sm">{comment.content}</p>
                  </CardContent>
                  <CardFooter className="py-2">
                    <div className="flex items-center space-x-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="mr-1 h-4 w-4" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ThumbsDown className="mr-1 h-4 w-4" />
                        {comment.dislikes}
                      </Button>
                      {comment.isFactChecked ? (
                        <Badge variant="secondary">
                          <CheckCircle className="mr-1 h-4 w-4" />
                          Fact Checked
                        </Badge>
                      ) : (
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="mr-1 h-4 w-4" />
                          Request Fact Check
                        </Button>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </ScrollArea>
            <div className="mt-4 space-y-2">
              <Textarea
                placeholder="Add to the discussion..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button onClick={() => addComment(proposal.id)}>
                Post Comment
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
