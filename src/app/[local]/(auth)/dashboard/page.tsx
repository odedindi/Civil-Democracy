import { NextPage } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { UserDashboard } from '@/components/user-dashboard';

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'Dashboard',
  });

  return {
    title: t('meta_title'),
  };
}
// This is a mock function to simulate fetching user stats and activity from the database
async function getUserDashboardData() {
  return {
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

const Dashboard: NextPage = async () => {
  const locale = await getLocale();
  setRequestLocale(locale);
  const { stats, recentActivity } = await getUserDashboardData();

  return (
    <div className="container py-8">
      <h1 className="mb-4 text-3xl font-bold">Your Dashboard</h1>
      <p className="mb-6">
        View aggregated results and your participation history here.
      </p>
      <UserDashboard stats={stats} recentActivity={recentActivity} />
    </div>
  );
};

export default Dashboard;
