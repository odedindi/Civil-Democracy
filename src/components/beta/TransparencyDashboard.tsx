'use client';

import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Decision = {
  id: number;
  title: string;
  description: string;
  status:
    | 'Proposed'
    | 'Under Discussion'
    | 'Voting'
    | 'Approved'
    | 'Implemented'
    | 'Rejected';
  proposedBy: string;
  proposedDate: string;
  votingStart?: string;
  votingEnd?: string;
  implementationDate?: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  updates: {
    date: string;
    content: string;
  }[];
};

export default function TransparencyDashboard() {
  const [
    decisions, // setDecisions
  ] = useState<Decision[]>([
    {
      id: 1,
      title: 'Implement Weekly Car-Free Sundays',
      description:
        'Proposal to make city center car-free every Sunday to reduce emissions and promote community activities.',
      status: 'Voting',
      proposedBy: 'Environmental Action Group',
      proposedDate: '2025-01-15',
      votingStart: '2025-02-01',
      votingEnd: '2025-02-15',
      votes: {
        yes: 1520,
        no: 280,
        abstain: 50,
      },
      updates: [
        {
          date: '2025-01-15',
          content: 'Proposal submitted by Environmental Action Group',
        },
        {
          date: '2025-01-22',
          content: 'Proposal reviewed by City Council',
        },
        { date: '2025-02-01', content: 'Public voting opened' },
      ],
    },
    {
      id: 2,
      title: 'Increase Funding for Public Libraries',
      description:
        'Allocate additional budget to expand library services and digital resources.',
      status: 'Implemented',
      proposedBy: 'Education First Coalition',
      proposedDate: '2024-11-10',
      votingStart: '2024-12-01',
      votingEnd: '2024-12-15',
      implementationDate: '2025-01-01',
      votes: {
        yes: 3300,
        no: 420,
        abstain: 80,
      },
      updates: [
        {
          date: '2024-11-10',
          content: 'Proposal submitted by Education First Coalition',
        },
        {
          date: '2024-11-20',
          content: 'Budget impact assessment completed',
        },
        { date: '2024-12-01', content: 'Public voting opened' },
        {
          date: '2024-12-16',
          content: 'Proposal approved by majority vote',
        },
        {
          date: '2025-01-01',
          content: 'Additional funding allocated to libraries',
        },
      ],
    },
  ]);

  const getStatusColor = (status: Decision['status']) => {
    switch (status) {
      case 'Proposed':
        return 'bg-blue-500';
      case 'Under Discussion':
        return 'bg-yellow-500';
      case 'Voting':
        return 'bg-purple-500';
      case 'Approved':
        return 'bg-green-500';
      case 'Implemented':
        return 'bg-teal-500';
      case 'Rejected':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transparency Dashboard</CardTitle>
          <CardDescription>
            Track the progress of civic decisions from proposal to
            implementation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="active">
            <TabsList>
              <TabsTrigger value="active">Active Decisions</TabsTrigger>
              <TabsTrigger value="past">Past Decisions</TabsTrigger>
            </TabsList>
            <TabsContent value="active">
              <ScrollArea className="h-[600px] pr-4">
                {decisions
                  .filter(
                    (d) =>
                      d.status !== 'Implemented' && d.status !== 'Rejected',
                  )
                  .map((decision) => (
                    <Card key={decision.id} className="mb-4">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{decision.title}</CardTitle>
                            <CardDescription>
                              {decision.description}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(decision.status)}>
                            {decision.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Proposed by: {decision.proposedBy}</span>
                            <span>Date: {decision.proposedDate}</span>
                          </div>
                          {decision.status === 'Voting' && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>
                                  Voting Period: {decision.votingStart} -{' '}
                                  {decision.votingEnd}
                                </span>
                              </div>
                              <Progress
                                value={
                                  (decision.votes.yes /
                                    (decision.votes.yes +
                                      decision.votes.no +
                                      decision.votes.abstain)) *
                                  100
                                }
                              />
                              <div className="flex justify-between text-sm">
                                <span>Yes: {decision.votes.yes}</span>
                                <span>No: {decision.votes.no}</span>
                                <span>Abstain: {decision.votes.abstain}</span>
                              </div>
                            </div>
                          )}
                          <div className="mt-4">
                            <h4 className="mb-2 font-semibold">Updates</h4>
                            {decision.updates.map((update, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span>{update.date}</span>
                                <span>{update.content}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </ScrollArea>
            </TabsContent>
            <TabsContent value="past">
              <ScrollArea className="h-[600px] pr-4">
                {decisions
                  .filter(
                    (d) =>
                      d.status === 'Implemented' || d.status === 'Rejected',
                  )
                  .map((decision) => (
                    <Card key={decision.id} className="mb-4">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle>{decision.title}</CardTitle>
                            <CardDescription>
                              {decision.description}
                            </CardDescription>
                          </div>
                          <Badge className={getStatusColor(decision.status)}>
                            {decision.status}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Proposed by: {decision.proposedBy}</span>
                            <span>Date: {decision.proposedDate}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>
                              Implementation Date: {decision.implementationDate}
                            </span>
                          </div>
                          <div className="space-y-1">
                            <Progress
                              value={
                                (decision.votes.yes /
                                  (decision.votes.yes +
                                    decision.votes.no +
                                    decision.votes.abstain)) *
                                100
                              }
                            />
                            <div className="flex justify-between text-sm">
                              <span>Yes: {decision.votes.yes}</span>
                              <span>No: {decision.votes.no}</span>
                              <span>Abstain: {decision.votes.abstain}</span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <h4 className="mb-2 font-semibold">
                              Decision Timeline
                            </h4>
                            {decision.updates.map((update, index) => (
                              <div
                                key={index}
                                className="flex justify-between text-sm"
                              >
                                <span>{update.date}</span>
                                <span>{update.content}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
