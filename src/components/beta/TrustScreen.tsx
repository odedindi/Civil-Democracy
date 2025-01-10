'use client';

import { useState } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

type Actor = {
  id: number;
  name: string;
  type: string;
  image: string;
  trustLevel: number;
};

export default function TrustScreen() {
  const [actors, setActors] = useState<Actor[]>([
    {
      id: 1,
      name: 'Green Party',
      type: 'Political Party',
      image: '/green-party.jpg',
      trustLevel: 50,
    },
    {
      id: 2,
      name: 'Jane Doe',
      type: 'Politician',
      image: '/jane-doe.jpg',
      trustLevel: 70,
    },
    {
      id: 3,
      name: 'Environmental NGO',
      type: 'Civil Society Organization',
      image: '/env-ngo.jpg',
      trustLevel: 80,
    },
  ]);
  const [newActor, setNewActor] = useState({ name: '', type: '' });

  const handleTrustChange = (id: number, newTrustLevel: number) => {
    setActors(
      actors.map((actor) =>
        actor.id === id ? { ...actor, trustLevel: newTrustLevel } : actor,
      ),
    );
  };

  const addActor = () => {
    if (newActor.name && newActor.type) {
      setActors([
        ...actors,
        {
          ...newActor,
          id: actors.length + 1,
          image: '/placeholder.jpg',
          trustLevel: 50,
        },
      ]);
      setNewActor({ name: '', type: '' });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Actor</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder="Actor Name"
              value={newActor.name}
              onChange={(e) =>
                setNewActor({
                  ...newActor,
                  name: e.target.value,
                })
              }
            />
            <Input
              type="text"
              placeholder="Actor Type"
              value={newActor.type}
              onChange={(e) =>
                setNewActor({
                  ...newActor,
                  type: e.target.value,
                })
              }
            />
            <Button onClick={addActor}>Add</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {actors.map((actor) => (
          <Card key={actor.id}>
            <CardHeader>
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={actor.image} alt={actor.name} />
                  <AvatarFallback>{actor.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{actor.name}</CardTitle>
                  <p className="text-sm text-gray-500">{actor.type}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Slider
                  value={[actor.trustLevel]}
                  onValueChange={(value) =>
                    handleTrustChange(actor.id, value[0])
                  }
                  max={100}
                  step={1}
                  className="flex-grow"
                />
                <span className="w-12 text-right">{actor.trustLevel}%</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
