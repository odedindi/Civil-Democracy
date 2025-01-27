'use client';

import { Suspense, useState } from 'react';

import { useTranslations } from 'next-intl';

import AIAssistant from '@/components/beta/AIAssistant';
// import ActorProfile from '@/components/beta/ActorProfile';
import AppSettings from '@/components/beta/AppSettings';
// import CivicAgenda from '@/components/beta/CivicAgenda';
import CivicEngagementGamification from '@/components/beta/CivicEngagementGamification';
import CommunityManagement from '@/components/beta/CommunityManagement';
import Dashboard from '@/components/beta/Dashboard';
import DeliberationSpaces from '@/components/beta/DeliberationSpaces';
import EducationalResources from '@/components/beta/EducationalResources';
import EnhancedProfile from '@/components/beta/EnhancedProfile';
import MessageCenter from '@/components/beta/MessageCenter';
import NetworkDiscovery from '@/components/beta/NetworkDiscovery';
import OfficialSystemsIntegration from '@/components/beta/OfficialSystemsIntegration';
import ParticipationScreen from '@/components/beta/ParticipationScreen';
// import PreferencesSetup from '@/components/beta/PreferencesSetup';
// import RegionManagement from '@/components/beta/RegionManagement';
import SocialFeed from '@/components/beta/SocialFeed';
import SurveyCenter from '@/components/beta/SurveyCenter';
import TransparencyDashboard from '@/components/beta/TransparencyDashboard';
import TrustScreen from '@/components/beta/TrustScreen';
// import WelcomeScreen from '@/components/beta/WelcomeScreen';
import { Button } from '@/components/ui/button';

const tabs = [
  // 'welcome',
  // 'preferences',
  // 'regions',
  // 'actor',
  // 'agenda',
  'trust',
  'participate',
  'dashboard',
  'communities',
  'surveys',
  'messages',
  'settings',
  'feed',
  'profile',
  'network',
  'transparency',
  'learn',
  'deliberate',
  'aiAssistant',
  'officialSystems',
  'achievements',
] as const;

type Screen = (typeof tabs)[number];

const renderScreen = (activeScreen: Screen) => {
  switch (activeScreen) {
    // case 'welcome':
    //   return <WelcomeScreen />;
    // case 'preferences':
    //   return <PreferencesSetup />;
    case 'trust':
      return <TrustScreen />;
    case 'participate':
      return <ParticipationScreen />;
    case 'dashboard':
      return <Dashboard />;
    // case 'regions':
    //   return <RegionManagement />;
    case 'communities':
      return <CommunityManagement />;
    // case 'actor':
    //   return <ActorProfile />;
    case 'surveys':
      return <SurveyCenter />;
    case 'messages':
      return <MessageCenter />;
    // case 'agenda':
    //   return <CivicAgenda />;
    case 'settings':
      return <AppSettings />;
    case 'feed':
      return <SocialFeed />;
    case 'profile':
      return <EnhancedProfile />;
    case 'network':
      return <NetworkDiscovery />;
    case 'transparency':
      return <TransparencyDashboard />;
    case 'learn':
      return <EducationalResources />;
    case 'deliberate':
      return <DeliberationSpaces />;
    case 'aiAssistant':
      return <AIAssistant />;
    case 'officialSystems':
      return <OfficialSystemsIntegration />;
    case 'achievements':
      return <CivicEngagementGamification />;
    default:
      return <SocialFeed />;
  }
};

export default function CivilDemocracy() {
  const [activeScreen, setActiveScreen] = useState<Screen>('feed');
  const t = useTranslations('common');

  return (
    <div className="xs:px-4 mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-6 flex flex-wrap justify-center gap-2">
          {tabs.map((item, i) => (
            <Button
              key={i}
              onClick={() => setActiveScreen(item)}
              variant={activeScreen === item ? 'default' : 'outline'}
            >
              {t(item)}
            </Button>
          ))}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          {renderScreen(activeScreen)}
        </Suspense>
      </div>
    </div>
  );
}
