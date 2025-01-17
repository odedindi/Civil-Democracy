'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Actor = {
  id: number;
  name: string;
  type: string;
  bio: string;
  followers: number;
  trustScore: number;
};

export default function ActorProfile() {
  const [
    actor,
    // setActor
  ] = useState<Actor>({
    id: 1,
    name: 'Jane Doe',
    type: 'Politician',
    bio: 'Dedicated to environmental causes and social justice.',
    followers: 10000,
    trustScore: 85,
  });

  return (
    <div className="mx-auto max-w-2xl">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="size-20">
              <AvatarImage src="/placeholder-user.jpg" alt={actor.name} />
              <AvatarFallback>{actor.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{actor.name}</CardTitle>
              <CardDescription>{actor.type}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="about">
            <TabsList>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="stats">Stats</TabsTrigger>
            </TabsList>
            <TabsContent value="about">
              <p>{actor.bio}</p>
            </TabsContent>
            <TabsContent value="stats">
              <p>Followers: {actor.followers}</p>
              <p>Trust Score: {actor.trustScore}%</p>
            </TabsContent>
          </Tabs>
          <div className="mt-4 flex space-x-2">
            <Button>Follow</Button>
            <Button variant="outline">Message</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
