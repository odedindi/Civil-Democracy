import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type ActorVote = {
  id: string;
  name: string;
  avatar: string;
  vote: string | string[];
  confidence: number;
  rationale?: string;
};

type TrustedActorVotesProps = {
  actors: ActorVote[];
  questionType: 'yesno' | 'multiple';
};

export function TrustedActorVotes({
  actors,
  questionType,
}: TrustedActorVotesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl">
          Trusted Actors&apos; Votes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {actors.map((actor) => (
            <div key={actor.id} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={actor.avatar} alt={actor.name} />
                  <AvatarFallback>
                    {actor.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grow">
                  <p className="text-sm font-medium sm:text-base">
                    {actor.name}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground sm:text-sm">
                      Voted:
                    </span>
                    {questionType === 'yesno' ? (
                      <Badge
                        variant={actor.vote === 'Yes' ? 'default' : 'secondary'}
                      >
                        {actor.vote}
                      </Badge>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {(actor.vote as string[]).map((option, index) => (
                          <Badge key={index} variant="outline">
                            {option}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="whitespace-nowrap text-xs sm:text-sm">
                  Confidence: {actor.confidence}%
                </div>
              </div>
              {actor.rationale && (
                <p className="text-xs text-muted-foreground sm:text-sm">
                  {actor.rationale}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
