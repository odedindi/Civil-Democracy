'use client';

import {
  Card,
  CardContent,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type UserStats = {
  participationRate: number;
  decisionsVoted: number;
  totalDecisions: number;
  trustAssigned: number;
  totalActors: number;
};

type RecentActivity = {
  id: string;
  type: 'VOTE' | 'TRUST';
  target: string;
  date: Date;
  value: number;
};

export function UserDashboard({
  stats,
  recentActivity,
}: {
  stats: UserStats;
  recentActivity: RecentActivity[];
}) {
  // Removed: const { data: session } = useSession()

  // Removed: if (!session) {
  // Removed:   return <p>Please log in to view your dashboard.</p>
  // Removed: }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Participation Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium">Participation Rate</p>
              <Progress value={stats.participationRate} className="mt-2" />
              <p className="mt-1 text-sm text-muted-foreground">
                {stats.decisionsVoted} / {stats.totalDecisions} decisions
              </p>
            </div>
            <div>
              <p className="text-sm font-medium">Trust Assigned</p>
              <Progress
                value={(stats.trustAssigned / stats.totalActors) * 100}
                className="mt-2"
              />
              <p className="mt-1 text-sm text-muted-foreground">
                {stats.trustAssigned} / {stats.totalActors} actors
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivity.map((activity) => (
              <li
                key={activity.id}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">
                    {activity.type === 'VOTE'
                      ? 'Voted on'
                      : 'Assigned trust to'}{' '}
                    {activity.target}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-sm font-medium">
                  {activity.type === 'VOTE'
                    ? activity.value > 0
                      ? 'In Favor'
                      : 'Against'
                    : `${activity.value}%`}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
