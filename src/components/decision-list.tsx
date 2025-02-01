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
import { toast } from '@/hooks/use-toast';

type Decision = {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
};

export function DecisionList({ decisions }: { decisions: Decision[] }) {
  const [votes, setVotes] = useState<Record<string, number>>({});

  const handleVote = async (decisionId: string, value: number) => {
    try {
      // Mock API call
      console.log('Submitting vote:', { decisionId, value });
      setVotes({ ...votes, [decisionId]: value });
      toast({
        title: 'Success',
        description: 'Your vote has been recorded.',
      });
    } catch (_error: unknown) {
      toast({
        title: 'Error',
        description: 'Failed to submit your vote. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {decisions.map((decision) => (
        <Card key={decision.id}>
          <CardHeader>
            <CardTitle>{decision.title}</CardTitle>
            <CardDescription>
              {new Date(decision.startDate).toLocaleDateString()} -{' '}
              {new Date(decision.endDate).toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{decision.description}</p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              onClick={() => handleVote(decision.id, -1)}
              variant={votes[decision.id] === -1 ? 'default' : 'outline'}
            >
              Against
            </Button>
            <Button
              onClick={() => handleVote(decision.id, 1)}
              variant={votes[decision.id] === 1 ? 'default' : 'outline'}
            >
              In Favor
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
