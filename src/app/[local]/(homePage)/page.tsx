'use client';

import { Hero } from './hero';

export default function WelcomePage() {
  return (
    <div className="xs:px-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <Hero />
      </div>
    </div>
  );
}
