'use client';

import {
  // UserCircle,
  Settings,
  // History,
  Shield,
  Users,
  // Award,
  // TrendingUp,
  Vote,
} from 'lucide-react';
import { JSX, useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProfileStats = {
  trustScore: number;
  participationRate: number;
  proposalsCreated: number;
  proposalsSupported: number;
  trustConnections: number;
  impactScore: number;
};

type Achievement = {
  id: number;
  title: string;
  description: string;
  icon: JSX.Element;
  earned: boolean;
};

export default function EnhancedProfile() {
  const [stats] = useState<ProfileStats>({
    trustScore: 85,
    participationRate: 92,
    proposalsCreated: 12,
    proposalsSupported: 48,
    trustConnections: 156,
    impactScore: 78,
  });

  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      title: 'Trusted Voice',
      description: 'Achieved 80%+ trust score',
      icon: <Shield className="size-6 text-blue-500" />,
      earned: true,
    },
    {
      id: 2,
      title: 'Active Citizen',
      description: '90%+ participation rate',
      icon: <Vote className="size-6 text-green-500" />,
      earned: true,
    },
    {
      id: 3,
      title: 'Community Leader',
      description: 'Created 10+ successful proposals',
      icon: <Users className="size-6 text-purple-500" />,
      earned: true,
    },
  ]);

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-start space-x-6">
            <Avatar className="size-24">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl">Jane Smith</CardTitle>
                  <CardDescription>
                    Trusted Citizen • Active since 2023
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 size-4" />
                  Edit Profile
                </Button>
              </div>
              <div className="mt-2 flex gap-2">
                <Badge variant="secondary">Environmental Advocate</Badge>
                <Badge variant="secondary">Education Reform</Badge>
                <Badge variant="secondary">Urban Planning</Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="trust">Trust Network</TabsTrigger>
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Trust Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.trustScore}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Participation Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.participationRate}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">
                      Impact Score
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {stats.impactScore}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="achievements">
              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                {achievements.map((achievement) => (
                  <Card
                    key={achievement.id}
                    className={!achievement.earned ? 'opacity-50' : ''}
                  >
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-4">
                        {achievement.icon}
                        <div>
                          <CardTitle className="text-base">
                            {achievement.title}
                          </CardTitle>
                          <CardDescription>
                            {achievement.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
