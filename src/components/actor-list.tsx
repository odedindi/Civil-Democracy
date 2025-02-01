'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { toast } from '@/hooks/use-toast';

export type Actor = {
  id: string;
  name: string;
  description: string;
  type: 'INDIVIDUAL' | 'GROUP';
};

export function ActorList({ actors }: { actors: Actor[] }) {
  const [trusts, setTrusts] = useState<Record<string, number>>({});

  const handleTrustChange = (actorId: string, value: number[]) => {
    setTrusts({ ...trusts, [actorId]: value[0] });
  };

  const handleTrustSubmit = async (actorId: string) => {
    try {
      // Mock API call
      console.log('Submitting trust assignment:', {
        actorId,
        value: trusts[actorId],
      });
      toast({
        title: 'Success',
        description: 'Your trust assignment has been recorded.',
      });
    } catch (_error) {
      toast({
        title: 'Error',
        description:
          'Failed to submit your trust assignment. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {actors.map((actor) => (
        <Card key={actor.id}>
          <CardHeader>
            <CardTitle>{actor.name}</CardTitle>
            <CardDescription>{actor.type}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{actor.description}</p>
          </CardContent>
          <CardFooter className="flex flex-col items-start gap-4">
            <div className="w-full">
              <p className="mb-2">Assign Trust:</p>
              <Slider
                defaultValue={[0]}
                max={100}
                step={1}
                onValueChange={(value) => handleTrustChange(actor.id, value)}
              />
            </div>
            <Button onClick={() => handleTrustSubmit(actor.id)}>
              Assign Trust ({trusts[actor.id] || 0}%)
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
