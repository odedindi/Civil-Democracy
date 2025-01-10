'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';

type Actor = {
  id: number;
  name: string;
  type: string;
  trustLevel: number;
};

export default function TrustScreen() {
  const [actors, setActors] = useState<Actor[]>([
    { id: 1, name: 'Green Party', type: 'Political Party', trustLevel: 50 },
    { id: 2, name: 'Jane Doe', type: 'Politician', trustLevel: 70 },
    {
      id: 3,
      name: 'Environmental NGO',
      type: 'Civil Society Organization',
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
        { ...newActor, id: actors.length + 1, trustLevel: 50 },
      ]);
      setNewActor({ name: '', type: '' });
    }
  };

  return (
    <div className="overflow-hidden bg-white p-6 shadow sm:rounded-lg">
      <h2 className="mb-4 text-2xl font-bold">Trust Screen</h2>
      <div className="mb-6">
        <h3 className="mb-2 text-lg font-medium">Add New Actor</h3>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Actor Name"
            value={newActor.name}
            onChange={(e) => setNewActor({ ...newActor, name: e.target.value })}
          />
          <Input
            type="text"
            placeholder="Actor Type"
            value={newActor.type}
            onChange={(e) => setNewActor({ ...newActor, type: e.target.value })}
          />
          <Button onClick={addActor}>Add</Button>
        </div>
      </div>
      <div className="space-y-4">
        {actors.map((actor) => (
          <div key={actor.id} className="flex items-center space-x-4">
            <div className="w-1/3">
              <p className="font-medium">{actor.name}</p>
              <p className="text-sm text-gray-500">{actor.type}</p>
            </div>
            <Slider
              value={[actor.trustLevel]}
              onValueChange={(value) => handleTrustChange(actor.id, value[0])}
              max={100}
              step={1}
              className="w-1/2"
            />
            <span className="w-12 text-right">{actor.trustLevel}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
