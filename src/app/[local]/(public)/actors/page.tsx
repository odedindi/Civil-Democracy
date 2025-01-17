import { Actor, ActorList } from '@/components/actor-list';

// Mock function to simulate fetching actors from the database
function getActors(): Actor[] {
  return [
    {
      id: '1',
      name: 'Jane Doe',
      description: 'Environmental activist and community leader',
      type: 'INDIVIDUAL',
    },
    {
      id: '2',
      name: 'Green Future Coalition',
      description: 'A group dedicated to promoting sustainable policies',
      type: 'GROUP',
    },
  ];
}

export default function ActorsPage() {
  const actors = getActors();

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">Explore Actors</h1>
      <p className="mb-6">
        Here you can view and assign trust to individual or group actors.
      </p>
      <ActorList actors={actors} />
    </div>
  );
}
