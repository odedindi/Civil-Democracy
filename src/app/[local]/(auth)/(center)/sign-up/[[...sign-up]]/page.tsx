import { SignUp } from '@clerk/nextjs';
import { NextPage } from 'next';
import { getLocale, getTranslations, setRequestLocale } from 'next-intl/server';

import { getI18nPath } from '@/lib/utils';

type ISignUpPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata(props: ISignUpPageProps) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale,
    namespace: 'SignUp',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const SignUpPage: NextPage = async () => {
  const locale = await getLocale();
  setRequestLocale(locale);

  return <SignUp path={getI18nPath('/sign-up', locale)} />;
};

export default SignUpPage;
