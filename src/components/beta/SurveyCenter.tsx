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
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

type Survey = {
  id: number;
  title: string;
  description: string;
  questions: {
    id: number;
    text: string;
    options: string[];
  }[];
};

export default function SurveyCenter() {
  const [
    surveys, // setSurveys
  ] = useState<Survey[]>([
    {
      id: 1,
      title: 'City Park Development',
      description: 'Help us decide how to improve our city parks',
      questions: [
        {
          id: 1,
          text: 'What feature would you most like to see in our parks?',
          options: [
            'More playgrounds',
            'Better lighting',
            'More benches',
            'Dog parks',
          ],
        },
      ],
    },
  ]);

  return (
    <div className="space-y-6">
      {surveys.map((survey) => (
        <Card key={survey.id}>
          <CardHeader>
            <CardTitle>{survey.title}</CardTitle>
            <CardDescription>{survey.description}</CardDescription>
          </CardHeader>
          <CardContent>
            {survey.questions.map((question) => (
              <div key={question.id} className="mb-4">
                <h3 className="mb-2 text-lg font-medium">{question.text}</h3>
                <RadioGroup>
                  {question.options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={option}
                        id={`option-${survey.id}-${question.id}-${index}`}
                      />
                      <Label
                        htmlFor={`option-${survey.id}-${question.id}-${index}`}
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
            <Button>Submit Survey</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
