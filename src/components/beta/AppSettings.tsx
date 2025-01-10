'use client';

import { Bell, Globe, HelpCircle, Info, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

import AccessibilitySettings from './AccessibilitySettings';

export default function AppSettings() {
  return (
    <div className="mx-auto max-w-md space-y-6 p-4">
      <h1 className="text-2xl font-bold">App Preferences</h1>

      <Card>
        <CardHeader>
          <CardTitle>Display</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <span>Dark Mode</span>
            </label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <Globe className="h-4 w-4" />
              <span>Language</span>
            </label>
            <span className="text-sm text-muted-foreground">English</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Push Notifications</span>
            </label>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <span>Email Alerts</span>
            </label>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2">
              <Lock className="h-4 w-4" />
              <span>Location Access</span>
            </label>
            <Switch />
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <AccessibilitySettings />
      </div>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <Info className="mr-2 h-4 w-4" />
          App Information
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <HelpCircle className="mr-2 h-4 w-4" />
          Support
        </Button>
      </div>
    </div>
  );
}
