'use client';

import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function WelcomeScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white p-6">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold">EmpowerCitizens</h1>
          <p className="mt-2 text-gray-600">
            Learn how to decide votes effectively.
          </p>
        </div>

        <div className="relative h-64 w-full">
          <Image
            src="/placeholder.svg?height=300&width=400"
            alt="People collaborating"
            layout="fill"
            objectFit="contain"
          />
        </div>

        <Button className="w-full" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}
