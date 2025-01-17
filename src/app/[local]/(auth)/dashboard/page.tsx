import { NextPage } from 'next';
import { getTranslations } from 'next-intl/server';

import { Hello } from '@/components/Hello';

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

const Dashboard: NextPage = async () => {
  return (
    <div className="py-5 [&_p]:my-6">
      <Hello />
    </div>
  );
};

export default Dashboard;
