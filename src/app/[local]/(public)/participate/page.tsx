import { DecisionList } from '@/components/decision-list';

// Mock function to simulate fetching decisions from the database
function getDecisions() {
  return [
    {
      id: '1',
      title: 'Implement Recycling Program',
      description:
        'Proposal to implement a city-wide recycling program to reduce waste and promote sustainability.',
      startDate: new Date('2023-06-01'),
      endDate: new Date('2023-06-30'),
    },
    {
      id: '2',
      title: 'Increase Public Transportation Budget',
      description:
        'Proposal to increase the budget for public transportation to improve services and reduce traffic congestion.',
      startDate: new Date('2023-06-15'),
      endDate: new Date('2023-07-15'),
    },
  ];
}

export default function ParticipatePage() {
  const decisions = getDecisions();

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">Participate in Decisions</h1>
      <p className="mb-6">
        Here you can vote on current decisions and policies.
      </p>
      <DecisionList decisions={decisions} />
    </div>
  );
}
