// import { UserProfile } from '@clerk/nextjs';
import { NextPage } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

// import { getI18nPath } from '@/lib/utils';

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
  const locale = await getLocale();
  setRequestLocale(locale);

  return <>{`<UserProfile path={getI18nPath('/sign-up', locale)} />`}</>;
};

export default Dashboard;
