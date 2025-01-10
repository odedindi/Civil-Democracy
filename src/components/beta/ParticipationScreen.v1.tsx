'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type Option = {
  id: number;
  text: string;
  rank: number;
};

type Decision = {
  id: number;
  title: string;
  description: string;
  options: Option[];
};

export default function ParticipationScreen() {
  const [decisions, setDecisions] = useState<Decision[]>([
    {
      id: 1,
      title: 'City Park Development',
      description: 'How should we develop the new city park?',
      options: [
        { id: 1, text: 'Build a playground', rank: 2 },
        { id: 2, text: 'Create a nature reserve', rank: 1 },
        { id: 3, text: 'Construct a sports complex', rank: 3 },
      ],
    },
  ]);

  const handleRankChange = (
    decisionId: number,
    optionId: number,
    newRank: number,
  ) => {
    setDecisions(
      decisions.map((decision) => {
        if (decision.id === decisionId) {
          const updatedOptions = decision.options.map((option) =>
            option.id === optionId ? { ...option, rank: newRank } : option,
          );
          return {
            ...decision,
            options: updatedOptions.sort((a, b) => a.rank - b.rank),
          };
        }
        return decision;
      }),
    );
  };

  return (
    <div className="space-y-6">
      {decisions.map((decision) => (
        <Card key={decision.id}>
          <CardHeader>
            <CardTitle>{decision.title}</CardTitle>
            <CardDescription>{decision.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {decision.options.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <span className="w-8 font-medium">{option.rank}.</span>
                  <span className="flex-grow">{option.text}</span>
                  <Button
                    onClick={() =>
                      handleRankChange(
                        decision.id,
                        option.id,
                        Math.max(1, option.rank - 1),
                      )
                    }
                    disabled={option.rank === 1}
                    size="sm"
                  >
                    ▲
                  </Button>
                  <Button
                    onClick={() =>
                      handleRankChange(
                        decision.id,
                        option.id,
                        Math.min(decision.options.length, option.rank + 1),
                      )
                    }
                    disabled={option.rank === decision.options.length}
                    size="sm"
                  >
                    ▼
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
