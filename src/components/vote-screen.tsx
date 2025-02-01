'use client';

import {
  Clock,
  //  Info
} from 'lucide-react';
import { useState } from 'react';

import Link from 'next/link';

import { CombinedRanking } from '@/components/combined-ranking';
import { QuestionNavigation } from '@/components/question-navigation';
import { TrustedActorVotes } from '@/components/trusted-actor-votes';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  //   CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { VoteResults } from '@/components/vote-results';
import { toast } from '@/hooks/use-toast';

type ActorInsight = {
  name: string;
  support: number;
  certainty: number;
};

export type Option = {
  id: string;
  title: string;
  description: string;
  trustedActorSupport: number;
  actorInsights: ActorInsight[];
  rationale: string;
};

type Question = {
  id: string;
  title: string;
  description: string;
  type: 'yesno' | 'multiple';
  options: Option[];
};

type Survey = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  expiryTime: Date;
};

// Mock data for trusted actors and vote results
const trustedActorsData = [
  {
    id: '1',
    name: 'Jane Doe',
    avatar: '/placeholder.svg',
    votes: [
      {
        vote: 'Yes',
        confidence: 85,
        rationale: 'This aligns with our environmental goals.',
      },
      {
        vote: ['Option A', 'Option C'],
        confidence: 70,
        rationale: 'These options provide the best balance.',
      },
      {
        vote: 'No',
        confidence: 60,
        rationale: 'The costs outweigh the benefits at this time.',
      },
    ],
  },
  {
    id: '2',
    name: 'John Smith',
    avatar: '/placeholder.svg',
    votes: [
      {
        vote: 'No',
        confidence: 70,
        rationale: 'We need more research before proceeding.',
      },
      {
        vote: ['Option B'],
        confidence: 90,
        rationale: 'This option is the most cost-effective.',
      },
      {
        vote: 'Yes',
        confidence: 80,
        rationale: 'This will greatly benefit our community.',
      },
    ],
  },
  {
    id: '3',
    name: 'Alice Johnson',
    avatar: '/placeholder.svg',
    votes: [
      {
        vote: 'Yes',
        confidence: 95,
        rationale: 'This is a crucial step for our future.',
      },
      {
        vote: ['Option A', 'Option B', 'Option D'],
        confidence: 85,
        rationale: 'A comprehensive approach is needed.',
      },
      {
        vote: 'No',
        confidence: 75,
        rationale: 'We should prioritize other initiatives first.',
      },
    ],
  },
];

const voteResultsData = [
  {
    options: [
      { id: '1', label: 'Yes', votes: 1250, percentage: 62.5 },
      { id: '2', label: 'No', votes: 750, percentage: 37.5 },
    ],
    totalVotes: 2000,
  },
  {
    options: [
      { id: '1', label: 'Option A', votes: 800, percentage: 40 },
      { id: '2', label: 'Option B', votes: 600, percentage: 30 },
      { id: '3', label: 'Option C', votes: 400, percentage: 20 },
      { id: '4', label: 'Option D', votes: 200, percentage: 10 },
    ],
    totalVotes: 2000,
  },
  {
    options: [
      { id: '1', label: 'Yes', votes: 1500, percentage: 75 },
      { id: '2', label: 'No', votes: 500, percentage: 25 },
    ],
    totalVotes: 2000,
  },
];

export function VoteScreen({ survey }: { survey?: Survey }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userVotes, setUserVotes] = useState<Record<string, Option[]>>({});

  const currentQuestion = survey?.questions[currentQuestionIndex];

  const handleSubmit = () => {
    console.log('Submitting votes:', userVotes);
    toast({
      title: 'Votes Submitted',
      description: 'Your choices have been recorded successfully.',
    });
  };

  const timeRemaining = () => {
    if (!survey) return '';
    const now = new Date();
    const diff = survey.expiryTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    return `${days} days ${hours} hours`;
  };

  const handleNavigate = (direction: 'prev' | 'next') => {
    if (!survey) return;
    if (direction === 'prev' && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (
      direction === 'next' &&
      currentQuestionIndex < survey.questions.length - 1
    ) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleVote = (options: Option[]) => {
    if (!currentQuestion) return;
    setUserVotes((prev) => ({
      ...prev,
      [currentQuestion.id]: options,
    }));
  };

  if (!survey || !currentQuestion) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-lg">Survey not found.</p>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl sm:text-3xl">{survey.title}</CardTitle>
          <CardDescription className="text-base sm:text-lg">
            {survey.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex items-center text-muted-foreground">
            <Clock className="mr-2" />
            <span className="text-sm sm:text-base">
              Time remaining: {timeRemaining()}
            </span>
          </div>
          <QuestionNavigation
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={survey.questions.length}
            onNavigate={handleNavigate}
          />
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                {currentQuestion.title}
              </CardTitle>
              <CardDescription>{currentQuestion.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {currentQuestion.type === 'yesno' ? (
                <div className="flex justify-center space-x-4">
                  <Button
                    onClick={() =>
                      handleVote([
                        {
                          id: 'yes',
                          title: 'Yes',
                          description: '',
                          trustedActorSupport: 0,
                          actorInsights: [],
                          rationale: '',
                        },
                      ])
                    }
                    variant={
                      userVotes[currentQuestion.id]?.[0]?.id === 'yes'
                        ? 'default'
                        : 'outline'
                    }
                  >
                    Yes
                  </Button>
                  <Button
                    onClick={() =>
                      handleVote([
                        {
                          id: 'no',
                          title: 'No',
                          description: '',
                          trustedActorSupport: 0,
                          actorInsights: [],
                          rationale: '',
                        },
                      ])
                    }
                    variant={
                      userVotes[currentQuestion.id]?.[0]?.id === 'no'
                        ? 'default'
                        : 'outline'
                    }
                  >
                    No
                  </Button>
                </div>
              ) : (
                <CombinedRanking
                  options={currentQuestion.options}
                  setOptions={(options) => handleVote(options)}
                />
              )}
            </CardContent>
          </Card>

          <TrustedActorVotes
            actors={trustedActorsData.map((actor) => ({
              ...actor,
              ...actor.votes[currentQuestionIndex],
            }))}
            questionType={currentQuestion.type}
          />
        </div>

        <div className="space-y-8">
          <VoteResults
            options={voteResultsData[currentQuestionIndex].options}
            totalVotes={voteResultsData[currentQuestionIndex].totalVotes}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl">
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="background" className="w-full">
                <TabsList className="w-full justify-start">
                  <TabsTrigger value="background">Background</TabsTrigger>
                  <TabsTrigger value="impact">Impact</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>
                <TabsContent value="background">
                  <p className="text-sm sm:text-base">
                    Detailed background information about the proposal...
                  </p>
                  <Link
                    href="#"
                    className="mt-2 inline-block text-sm text-primary hover:underline sm:text-base"
                  >
                    Read full background document
                  </Link>
                </TabsContent>
                <TabsContent value="impact">
                  <p className="text-sm sm:text-base">
                    Analysis of potential impacts of the proposal...
                  </p>
                  <Link
                    href="#"
                    className="mt-2 inline-block text-sm text-primary hover:underline sm:text-base"
                  >
                    View full impact assessment
                  </Link>
                </TabsContent>
                <TabsContent value="discussion">
                  <p className="text-sm sm:text-base">
                    Join the community discussion about this proposal...
                  </p>
                  <Link
                    href="#"
                    className="mt-2 inline-block text-sm text-primary hover:underline sm:text-base"
                  >
                    Go to discussion forum
                  </Link>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8">
        <Button onClick={handleSubmit} className="w-full">
          Submit All Votes
        </Button>
      </div>
    </div>
  );
}
