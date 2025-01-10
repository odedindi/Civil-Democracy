'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Community = {
  id: number;
  name: string;
  description: string;
  members: number;
};

export default function CommunityManagement() {
  const [communities, setCommunities] = useState<Community[]>([
    {
      id: 1,
      name: 'Environmental Activists',
      description: 'For those passionate about environmental issues',
      members: 500,
    },
    {
      id: 2,
      name: 'Tech Innovators',
      description: 'Discussing the latest in technology',
      members: 300,
    },
  ]);
  const [newCommunity, setNewCommunity] = useState({
    name: '',
    description: '',
  });

  const addCommunity = () => {
    if (newCommunity.name && newCommunity.description) {
      setCommunities([
        ...communities,
        { ...newCommunity, id: communities.length + 1, members: 0 },
      ]);
      setNewCommunity({ name: '', description: '' });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Community</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Community Name"
              value={newCommunity.name}
              onChange={(e) =>
                setNewCommunity({
                  ...newCommunity,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Description"
              value={newCommunity.description}
              onChange={(e) =>
                setNewCommunity({
                  ...newCommunity,
                  description: e.target.value,
                })
              }
            />
            <Button onClick={addCommunity}>Add Community</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <Card key={community.id}>
            <CardHeader>
              <CardTitle>{community.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{community.description}</p>
              <p className="mt-2">Members: {community.members}</p>
              <Button className="mt-4">Join Community</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
