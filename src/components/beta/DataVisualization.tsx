'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const participationData = [
  { name: 'Jan', participation: 65 },
  { name: 'Feb', participation: 59 },
  { name: 'Mar', participation: 80 },
  { name: 'Apr', participation: 81 },
  { name: 'May', participation: 56 },
  { name: 'Jun', participation: 55 },
];

const trustDistributionData = [
  { name: 'Political Parties', value: 30 },
  { name: 'Politicians', value: 25 },
  { name: 'Civil Society Organizations', value: 35 },
  { name: 'Individuals', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function DataVisualization() {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Civic Participation Over Time</CardTitle>
          <CardDescription>
            Monthly participation rates in community decisions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={participationData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participation" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Trust Distribution</CardTitle>
          <CardDescription>
            Breakdown of trust across different actor types
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trustDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {trustDistributionData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
