import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import DataVisualization from './DataVisualization';

export default function Dashboard() {
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Participation Rate</CardTitle>
            <CardDescription>Overall citizen engagement</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">78%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Trust Distribution</CardTitle>
            <CardDescription>
              Spread of trust across actor types
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Political Parties: 30%</li>
              <li>Politicians: 25%</li>
              <li>Civil Society Organizations: 35%</li>
              <li>Individuals: 10%</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Decision Impact</CardTitle>
            <CardDescription>
              Your influence on recent decisions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">High</p>
            <p className="text-sm text-gray-500">
              Your preferences aligned with 85% of outcomes
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="mt-8">
        <DataVisualization />
      </div>
    </>
  );
}
