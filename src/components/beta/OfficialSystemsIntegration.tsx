'use client';

import { AlertTriangle, ArrowUpRight, CheckCircle, Clock } from 'lucide-react';
import { useState } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

type IntegrationStatus = 'connected' | 'pending' | 'error';

type SystemIntegration = {
  id: number;
  name: string;
  description: string;
  status: IntegrationStatus;
  lastSync: string;
};

type ImplementationUpdate = {
  id: number;
  proposalTitle: string;
  status: 'in_progress' | 'completed' | 'delayed';
  progress: number;
  lastUpdate: string;
  description: string;
};

export default function OfficialSystemsIntegration() {
  const [
    integrations, // setIntegrations
  ] = useState<SystemIntegration[]>([
    {
      id: 1,
      name: 'City Council Agenda System',
      description:
        'Syncs approved proposals with the official city council agenda',
      status: 'connected',
      lastSync: '2025-06-15 14:30',
    },
    {
      id: 2,
      name: 'Municipal Budget Database',
      description: 'Provides real-time budget data for proposal cost analysis',
      status: 'pending',
      lastSync: 'N/A',
    },
    {
      id: 3,
      name: 'City GIS System',
      description: 'Integrates geographical data for location-based proposals',
      status: 'error',
      lastSync: '2025-06-14 09:15',
    },
  ]);

  const [
    implementationUpdates, //setImplementationUpdates
  ] = useState<ImplementationUpdate[]>([
    {
      id: 1,
      proposalTitle: 'City-Wide Recycling Program',
      status: 'in_progress',
      progress: 65,
      lastUpdate: '2025-06-15',
      description:
        'Recycling bins distributed to 65% of households. Education campaign ongoing.',
    },
    {
      id: 2,
      proposalTitle: 'New Community Center Construction',
      status: 'delayed',
      progress: 30,
      lastUpdate: '2025-06-14',
      description:
        'Construction delayed due to unexpected archaeological findings. Reassessing timeline.',
    },
    {
      id: 3,
      proposalTitle: 'Smart Traffic Light System',
      status: 'completed',
      progress: 100,
      lastUpdate: '2025-06-10',
      description:
        'All planned intersections now equipped with smart traffic lights. Monitoring phase begun.',
    },
  ]);

  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case 'connected':
        return <CheckCircle className="size-4 text-green-500" />;
      case 'pending':
        return <Clock className="size-4 text-yellow-500" />;
      case 'error':
        return <AlertTriangle className="size-4 text-red-500" />;
    }
  };

  const getImplementationStatusColor = (
    status: ImplementationUpdate['status'],
  ) => {
    switch (status) {
      case 'in_progress':
        return 'bg-blue-500';
      case 'completed':
        return 'bg-green-500';
      case 'delayed':
        return 'bg-yellow-500';
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Official Systems Integration</CardTitle>
          <CardDescription>
            Connect with and monitor official government systems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h3 className="mb-4 text-lg font-semibold">Connected Systems</h3>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {integrations.map((integration) => (
              <Card key={integration.id} className="mb-4">
                <CardHeader className="py-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {integration.name}
                    </CardTitle>
                    <Badge
                      variant={
                        integration.status === 'connected'
                          ? 'default'
                          : 'secondary'
                      }
                    >
                      {getStatusIcon(integration.status)}
                      <span className="ml-1">{integration.status}</span>
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-sm">{integration.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last synced: {integration.lastSync}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>

          <h3 className="mb-4 mt-6 text-lg font-semibold">
            Implementation Updates
          </h3>
          <ScrollArea className="h-[300px] w-full rounded-md border p-4">
            {implementationUpdates.map((update) => (
              <Card key={update.id} className="mb-4">
                <CardHeader className="py-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">
                      {update.proposalTitle}
                    </CardTitle>
                    <Badge
                      className={getImplementationStatusColor(update.status)}
                    >
                      {update.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="py-2">
                  <Progress value={update.progress} className="mb-2" />
                  <p className="text-sm">{update.description}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Last updated: {update.lastUpdate}
                  </p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>

          <Button className="mt-4">
            View All Updates
            <ArrowUpRight className="ml-2 size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
