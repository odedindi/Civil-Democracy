'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

export default function AccessibilitySettings() {
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenReader, setScreenReader] = useState(false);

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Accessibility Settings</CardTitle>
        <CardDescription>
          Customize your experience to make the platform more accessible
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast">High Contrast Mode</Label>
          <Switch
            id="high-contrast"
            checked={highContrast}
            onCheckedChange={setHighContrast}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="font-size">Font Size</Label>
          <Slider
            id="font-size"
            min={12}
            max={24}
            step={1}
            value={[fontSize]}
            onValueChange={(value) => setFontSize(value[0])}
          />
          <p className="text-sm text-muted-foreground">
            Current size: {fontSize}px
          </p>
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="reduce-motion">Reduce Motion</Label>
          <Switch
            id="reduce-motion"
            checked={reduceMotion}
            onCheckedChange={setReduceMotion}
          />
        </div>
        <div className="flex items-center justify-between">
          <Label htmlFor="screen-reader">Screen Reader Optimized</Label>
          <Switch
            id="screen-reader"
            checked={screenReader}
            onCheckedChange={setScreenReader}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="color-scheme">Color Scheme</Label>
          <Select defaultValue="system">
            <SelectTrigger id="color-scheme">
              <SelectValue placeholder="Select color scheme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="w-full">Save Settings</Button>
      </CardContent>
    </Card>
  );
}
