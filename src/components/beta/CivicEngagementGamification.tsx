'use client';

import { Award, TrendingUp, Users, Vote } from 'lucide-react';
import { JSX, useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Achievement = {
  id: number;
  title: string;
  description: string;
  progress: number;
  maxProgress: number;
  icon: JSX.Element;
};

type LeaderboardEntry = {
  id: number;
  name: string;
  avatar: string;
  score: number;
  rank: number;
};

type Challenge = {
  id: number;
  title: string;
  description: string;
  reward: string;
  difficulty: 'easy' | 'medium' | 'hard';
  completed: boolean;
};

export default function CivicEngagementGamification() {
  const [
    achievements,
    // setAchievements
  ] = useState<Achievement[]>([
    {
      id: 1,
      title: 'Consistent Voter',
      description: 'Participate in 10 community votes',
      progress: 7,
      maxProgress: 10,
      icon: <Vote className="h-6 w-6 text-blue-500" />,
    },
    {
      id: 2,
      title: 'Proposal Champion',
      description: 'Have 5 of your proposals approved',
      progress: 3,
      maxProgress: 5,
      icon: <Award className="h-6 w-6 text-yellow-500" />,
    },
    {
      id: 3,
      title: 'Network Builder',
      description: 'Connect with 50 citizens in your trust network',
      progress: 32,
      maxProgress: 50,
      icon: <Users className="h-6 w-6 text-green-500" />,
    },
  ]);

  const [
    leaderboard,
    // setLeaderboard
  ] = useState<LeaderboardEntry[]>([
    {
      id: 1,
      name: 'Jane Smith',
      avatar: '/placeholder.svg?height=32&width=32',
      score: 1250,
      rank: 1,
    },
    {
      id: 2,
      name: 'John Doe',
      avatar: '/placeholder.svg?height=32&width=32',
      score: 1180,
      rank: 2,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      avatar: '/placeholder.svg?height=32&width=32',
      score: 1050,
      rank: 3,
    },
    {
      id: 4,
      name: 'Bob Williams',
      avatar: '/placeholder.svg?height=32&width=32',
      score: 980,
      rank: 4,
    },
    {
      id: 5,
      name: 'Carol Brown',
      avatar: '/placeholder.svg?height=32&width=32',
      score: 920,
      rank: 5,
    },
  ]);

  const [
    challenges,
    // setChallenges
  ] = useState<Challenge[]>([
    {
      id: 1,
      title: 'Diverse Perspectives',
      description:
        'Engage in meaningful discussions with 5 citizens who have different viewpoints from yours',
      reward: '50 Civic Points',
      difficulty: 'medium',
      completed: false,
    },
    {
      id: 2,
      title: 'Policy Deep Dive',
      description:
        'Read and summarize a local policy document, then share your insights on the platform',
      reward: '100 Civic Points',
      difficulty: 'hard',
      completed: false,
    },
    {
      id: 3,
      title: 'Community Volunteer',
      description:
        'Participate in a local community service event and share your experience',
      reward: '75 Civic Points',
      difficulty: 'easy',
      completed: true,
    },
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Civic Engagement Gamification</CardTitle>
          <CardDescription>
            Track your progress, compete with others, and take on civic
            challenges
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="achievements">
            <TabsList>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>
            <TabsContent value="achievements">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="mb-4">
                    <CardHeader className="py-2">
                      <div className="flex items-center space-x-2">
                        {achievement.icon}
                        <div>
                          <CardTitle className="text-base">
                            {achievement.title}
                          </CardTitle>
                          <CardDescription className="text-xs">
                            {achievement.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <Progress
                        value={
                          (achievement.progress / achievement.maxProgress) * 100
                        }
                        className="mb-2"
                      />
                      <p className="text-right text-sm">
                        {achievement.progress} / {achievement.maxProgress}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="leaderboard">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {leaderboard.map((entry) => (
                  <Card key={entry.id} className="mb-4">
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-2xl font-bold">{entry.rank}</span>
                        <img
                          src={entry.avatar}
                          alt={entry.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <span>{entry.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-green-500" />
                        <span className="font-bold">{entry.score}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="challenges">
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                {challenges.map((challenge) => (
                  <Card key={challenge.id} className="mb-4">
                    <CardHeader className="py-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {challenge.title}
                        </CardTitle>
                        <Badge
                          variant={
                            challenge.completed ? 'default' : 'secondary'
                          }
                        >
                          {challenge.completed
                            ? 'Completed'
                            : challenge.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2">
                      <p className="mb-2 text-sm">{challenge.description}</p>
                      <p className="text-xs text-muted-foreground">
                        Reward: {challenge.reward}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
