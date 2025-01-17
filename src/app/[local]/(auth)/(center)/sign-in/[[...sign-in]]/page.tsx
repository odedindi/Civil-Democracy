import { SignIn } from '@clerk/nextjs';
import { NextPage } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { getI18nPath } from '@/lib/utils';

type ISignInPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignInPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignIn',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignInPage: NextPage = async () => {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <SignIn path={getI18nPath('/sign-in', locale)} />;
};

export default SignInPage;
