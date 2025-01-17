'use client';

import { Globe, Lock, MessageCircle, Share2, ThumbsUp } from 'lucide-react';
import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

type Post = {
  id: number;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  visibility: 'public' | 'private';
  type: 'general' | 'proposal' | 'vote';
};

export default function SocialFeed() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: {
        name: 'Environmental Action Group',
        avatar: '/placeholder.svg?height=40&width=40',
        role: 'Verified Organization',
      },
      content:
        'New proposal: Should we implement weekly car-free days in the city center? Share your thoughts and vote on this initiative. #SustainableCity #CivicEngagement',
      timestamp: '2 hours ago',
      likes: 128,
      comments: 45,
      shares: 23,
      isLiked: false,
      visibility: 'public',
      type: 'proposal',
    },
    {
      id: 2,
      author: {
        name: 'Jane Smith',
        avatar: '/placeholder.svg?height=40&width=40',
        role: 'Trusted Citizen',
      },
      content:
        "Just participated in the local education budget allocation survey. It's crucial that we all make our voices heard on how our tax money is spent! Check out the survey in the Surveys section.",
      timestamp: '4 hours ago',
      likes: 89,
      comments: 12,
      shares: 8,
      isLiked: true,
      visibility: 'public',
      type: 'general',
    },
  ]);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      }),
    );
  };

  const createPost = () => {
    if (newPost.trim()) {
      setPosts([
        {
          id: posts.length + 1,
          author: {
            name: 'You',
            avatar: '/placeholder.svg?height=40&width=40',
            role: 'Citizen',
          },
          content: newPost,
          timestamp: 'Just now',
          likes: 0,
          comments: 0,
          shares: 0,
          isLiked: false,
          visibility: 'public',
          type: 'general',
        },
        ...posts,
      ]);
      setNewPost('');
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Share your thoughts on civic matters..."
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                className="min-h-[100px]"
              />
              <div className="flex items-center justify-between">
                <Button variant="outline" size="sm">
                  <Globe className="mr-2 size-4" />
                  Public
                </Button>
                <Button onClick={createPost}>Post</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {posts.map((post) => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-base">
                    {post.author.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {post.author.role} • {post.timestamp}
                  </p>
                </div>
              </div>
              {post.visibility === 'private' && (
                <Lock className="size-4 text-muted-foreground" />
              )}
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-base">{post.content}</p>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <div className="flex w-full justify-between">
              <Button
                variant="ghost"
                size="sm"
                className={post.isLiked ? 'text-blue-600' : ''}
                onClick={() => handleLike(post.id)}
              >
                <ThumbsUp className="mr-2 size-4" />
                {post.likes}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageCircle className="mr-2 size-4" />
                {post.comments}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="mr-2 size-4" />
                {post.shares}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
