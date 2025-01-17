import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type QuestionNavigationProps = {
  currentQuestion: number;
  totalQuestions: number;
  onNavigate: (_direction: 'prev' | 'next') => void;
};

export function QuestionNavigation({
  currentQuestion,
  totalQuestions,
  onNavigate,
}: QuestionNavigationProps) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('prev')}
          disabled={currentQuestion === 1}
          className="w-24"
        >
          <ChevronLeft className="mr-2 size-4" />
          <span className="hidden sm:inline">Previous</span>
        </Button>
        <span className="text-sm font-medium">
          Question {currentQuestion} of {totalQuestions}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onNavigate('next')}
          disabled={currentQuestion === totalQuestions}
          className="w-24"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="ml-2 size-4" />
        </Button>
      </div>
      <Progress
        value={(currentQuestion / totalQuestions) * 100}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Start</span>
        <span>Finish</span>
      </div>
    </div>
  );
}
