'use client';

import { Filter, Search } from 'lucide-react';
import { useState } from 'react';

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
import { Input } from '@/components/ui/input';

type User = {
  id: number;
  name: string;
  avatar: string;
  role: string;
  trustScore: number;
  expertise: string[];
  isTrusted: boolean;
};

export default function NetworkDiscovery() {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      avatar: '/placeholder.svg?height=40&width=40',
      role: 'Environmental Scientist',
      trustScore: 92,
      expertise: ['Climate Policy', 'Sustainability'],
      isTrusted: false,
    },
    {
      id: 2,
      name: 'Marcus Chen',
      avatar: '/placeholder.svg?height=40&width=40',
      role: 'Urban Planner',
      trustScore: 88,
      expertise: ['City Development', 'Public Transport'],
      isTrusted: true,
    },
    {
      id: 3,
      name: 'Community Safety Initiative',
      avatar: '/placeholder.svg?height=40&width=40',
      role: 'Organization',
      trustScore: 95,
      expertise: ['Public Safety', 'Community Engagement'],
      isTrusted: false,
    },
  ]);

  const toggleTrust = (userId: number) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, isTrusted: !user.isTrusted } : user,
      ),
    );
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder="Search for people, organizations, or expertise..."
          />
        </div>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{user.name}</CardTitle>
                    <CardDescription>{user.role}</CardDescription>
                    <div className="mt-2 flex gap-2">
                      {user.expertise.map((exp, i) => (
                        <Badge key={i} variant="secondary">
                          {exp}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium">Trust Score</div>
                  <div className="text-2xl font-bold text-green-600">
                    {user.trustScore}%
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                {user.isTrusted ? 'Trusted' : 'Not yet trusted'}
              </div>
              <Button
                variant={user.isTrusted ? 'destructive' : 'default'}
                onClick={() => toggleTrust(user.id)}
              >
                {user.isTrusted ? 'Remove Trust' : 'Trust User'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
