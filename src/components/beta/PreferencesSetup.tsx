'use client';

import { Moon, Sun, Users } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function PreferencesSetup() {
  const [step, setStep] = useState(1);
  const [timePreference, setTimePreference] = useState<
    'sunrise' | 'midday' | 'dark'
  >('midday');

  return (
    <div className="mx-auto max-w-md p-6">
      <div className="mb-8 text-center">
        <p className="text-sm text-gray-500">Step {step} of 3</p>
        <h2 className="mt-2 text-xl font-semibold">
          Set your reminder preference
        </h2>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <Card
          className={`cursor-pointer ${timePreference === 'sunrise' ? 'border-primary' : ''}`}
          onClick={() => setTimePreference('sunrise')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <Sun className="mb-2 h-8 w-8" />
            <span>Sunrise</span>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer ${timePreference === 'midday' ? 'border-primary' : ''}`}
          onClick={() => setTimePreference('midday')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <Users className="mb-2 h-8 w-8" />
            <span>Midday</span>
          </CardContent>
        </Card>

        <Card
          className={`col-span-2 cursor-pointer ${timePreference === 'dark' ? 'border-primary' : ''}`}
          onClick={() => setTimePreference('dark')}
        >
          <CardContent className="flex flex-col items-center p-6">
            <Moon className="mb-2 h-8 w-8" />
            <span>Dark</span>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => setStep(Math.max(1, step - 1))}
        >
          Ignore
        </Button>
        <Button onClick={() => setStep(Math.min(3, step + 1))}>Continue</Button>
      </div>
    </div>
  );
}
