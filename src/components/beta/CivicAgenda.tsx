'use client';

import {
  Home,
  MessageSquare,
  // Calendar,
  Plus,
  Search,
  // Bell,
  User,
} from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Event = {
  id: number;
  title: string;
  type: string;
  time: string;
  participants: { name: string; avatar: string }[];
  status: 'upcoming' | 'ongoing' | 'past';
};

export default function CivicAgenda() {
  const events: Event[] = [
    {
      id: 1,
      title: 'Family Dinner',
      type: 'Community',
      time: '18:00',
      participants: [
        { name: 'John', avatar: '/placeholder-user.jpg' },
        { name: 'Jane', avatar: '/placeholder-user.jpg' },
      ],
      status: 'upcoming',
    },
    {
      id: 2,
      title: 'Weekend Brunch',
      type: 'Social',
      time: '10:00',
      participants: [
        { name: 'Alice', avatar: '/placeholder-user.jpg' },
        { name: 'Bob', avatar: '/placeholder-user.jpg' },
      ],
      status: 'upcoming',
    },
  ];

  return (
    <div className="mx-auto max-w-md">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">Today&apos;s Civic Agenda</h1>
        <Plus className="size-6" />
      </div>

      <div className="space-y-4 p-4">
        {events.map((event) => (
          <Card key={event.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {event.title}
              </CardTitle>
              <div className="flex space-x-1">
                {event.participants.map((participant, index) => (
                  <Avatar key={index} className="size-6">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  {event.type}
                </span>
                <span className="text-sm">{event.time}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t bg-background p-2">
        <div className="flex justify-around">
          <Button variant="ghost" size="icon">
            <Home className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Search className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Plus className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <MessageSquare className="size-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
