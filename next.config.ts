import withBundleAnalyzer from '@next/bundle-analyzer';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');
const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig: NextConfig = bundleAnalyzer(
  withNextIntl({
    // eslint: {
    //   dirs: ['.'],
    // },
    // poweredByHeader: false,
    reactStrictMode: true,
    // serverExternalPackages: ['@electric-sql/pglite'],
  }),
);

export default nextConfig;
