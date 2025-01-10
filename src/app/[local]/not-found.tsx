'use client';

import Error from 'next/error';

export default function NotFound() {
  console.log('bobo');

  return <Error statusCode={404} />;
}
