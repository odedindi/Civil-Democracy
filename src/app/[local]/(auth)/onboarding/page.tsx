import { NextPage } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

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

const OnboardingPage: NextPage = async () => {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <>OnboardingPage</>;
};

export default OnboardingPage;
