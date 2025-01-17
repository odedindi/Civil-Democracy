import { UserDashboard } from '@/components/user-dashboard';
import { UserProfile } from '@/components/user-profile';

// Mock function to simulate fetching user data
function getUserData() {
  return {
    name: 'John Doe',
    email: 'john@example.com',
    stats: {
      participationRate: 75,
      decisionsVoted: 15,
      totalDecisions: 20,
      trustAssigned: 5,
      totalActors: 10,
    },
    recentActivity: [
      {
        id: '1',
        type: 'VOTE' as const,
        target: 'Implement Recycling Program',
        date: new Date('2023-06-15'),
        value: 1,
      },
      {
        id: '2',
        type: 'TRUST' as const,
        target: 'Jane Doe',
        date: new Date('2023-06-14'),
        value: 80,
      },
    ],
  };
}

export default function UserPage() {
  const userData = getUserData();

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">User Profile and Dashboard</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Your Profile</h2>
          <UserProfile user={userData} />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Your Dashboard</h2>
          <UserDashboard
            stats={userData.stats}
            recentActivity={userData.recentActivity}
          />
        </div>
      </div>
    </div>
  );
}
