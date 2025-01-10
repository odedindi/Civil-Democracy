'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

type Region = {
  id: number;
  name: string;
  description: string;
  members: number;
};

export default function RegionManagement() {
  const [regions, setRegions] = useState<Region[]>([
    {
      id: 1,
      name: 'New York City',
      description: 'The Big Apple',
      members: 1000,
    },
    {
      id: 2,
      name: 'Los Angeles',
      description: 'City of Angels',
      members: 800,
    },
  ]);
  const [newRegion, setNewRegion] = useState({ name: '', description: '' });

  const addRegion = () => {
    if (newRegion.name && newRegion.description) {
      setRegions([
        ...regions,
        { ...newRegion, id: regions.length + 1, members: 0 },
      ]);
      setNewRegion({ name: '', description: '' });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Create New Region</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Region Name"
              value={newRegion.name}
              onChange={(e) =>
                setNewRegion({
                  ...newRegion,
                  name: e.target.value,
                })
              }
            />
            <Input
              placeholder="Description"
              value={newRegion.description}
              onChange={(e) =>
                setNewRegion({
                  ...newRegion,
                  description: e.target.value,
                })
              }
            />
            <Button onClick={addRegion}>Add Region</Button>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {regions.map((region) => (
          <Card key={region.id}>
            <CardHeader>
              <CardTitle>{region.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{region.description}</p>
              <p className="mt-2">Members: {region.members}</p>
              <Button className="mt-4">Join Region</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
