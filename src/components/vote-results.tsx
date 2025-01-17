import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type VoteOption = {
  id: string;
  label: string;
  votes: number;
  percentage: number;
};

type VoteResultsProps = {
  options: VoteOption[];
  totalVotes: number;
};

export function VoteResults({ options, totalVotes }: VoteResultsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">Current Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {options.map((option) => (
            <div key={option.id}>
              <div className="mb-1 flex flex-col justify-between sm:flex-row">
                <span className="text-sm font-medium sm:text-base">
                  {option.label}
                </span>
                <span className="text-xs text-muted-foreground sm:text-sm">
                  {option.votes} votes ({option.percentage.toFixed(1)}%)
                </span>
              </div>
              <Progress value={option.percentage} className="h-2" />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-muted-foreground sm:text-sm">
          Total votes: {totalVotes}
        </p>
      </CardContent>
    </Card>
  );
}
