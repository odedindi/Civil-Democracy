'use client';

import { useState } from 'react';

import { useTranslations } from 'next-intl';

import AIAssistant from '@/components/beta/AIAssistant';
import ActorProfile from '@/components/beta/ActorProfile';
import AppSettings from '@/components/beta/AppSettings';
import CivicAgenda from '@/components/beta/CivicAgenda';
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
import PreferencesSetup from '@/components/beta/PreferencesSetup';
import RegionManagement from '@/components/beta/RegionManagement';
import SocialFeed from '@/components/beta/SocialFeed';
import SurveyCenter from '@/components/beta/SurveyCenter';
import TransparencyDashboard from '@/components/beta/TransparencyDashboard';
import TrustScreen from '@/components/beta/TrustScreen';
import WelcomeScreen from '@/components/beta/WelcomeScreen';
import { Button } from '@/components/ui/button';

type Screen =
  | 'welcome'
  | 'preferences'
  | 'trust'
  | 'participate'
  | 'dashboard'
  | 'regions'
  | 'communities'
  | 'actor'
  | 'surveys'
  | 'messages'
  | 'agenda'
  | 'settings'
  | 'feed'
  | 'profile'
  | 'network'
  | 'transparency'
  | 'education'
  | 'deliberation'
  | 'ai-assistant'
  | 'official-integration'
  | 'gamification';

const renderScreen = (activeScreen: Screen) => {
  switch (activeScreen) {
    case 'welcome':
      return <WelcomeScreen />;
    case 'preferences':
      return <PreferencesSetup />;
    case 'trust':
      return <TrustScreen />;
    case 'participate':
      return <ParticipationScreen />;
    case 'dashboard':
      return <Dashboard />;
    case 'regions':
      return <RegionManagement />;
    case 'communities':
      return <CommunityManagement />;
    case 'actor':
      return <ActorProfile />;
    case 'surveys':
      return <SurveyCenter />;
    case 'messages':
      return <MessageCenter />;
    case 'agenda':
      return <CivicAgenda />;
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
    case 'education':
      return <EducationalResources />;
    case 'deliberation':
      return <DeliberationSpaces />;
    case 'ai-assistant':
      return <AIAssistant />;
    case 'official-integration':
      return <OfficialSystemsIntegration />;
    case 'gamification':
      return <CivicEngagementGamification />;
    default:
      return <SocialFeed />;
  }
};
export default function CivilDemocracy() {
  const [activeScreen, setActiveScreen] = useState<Screen>('feed');
  const t = useTranslations('common');

  const menuItems: { id: Screen; label: string }[] = [
    { id: 'feed', label: t('feed') },
    { id: 'profile', label: t('profile') },
    { id: 'network', label: t('network') },
    { id: 'trust', label: t('trust') },
    { id: 'dashboard', label: t('dashboard') },
    { id: 'participate', label: t('participate') },
    { id: 'surveys', label: t('surveys') },
    { id: 'communities', label: t('communities') },
    { id: 'messages', label: t('messages') },
    { id: 'transparency', label: t('transparency') },
    { id: 'education', label: t('learn') },
    { id: 'deliberation', label: t('deliberate') },
    { id: 'ai-assistant', label: t('aiAssistant') },
    { id: 'official-integration', label: t('officialSystems') },
    { id: 'gamification', label: t('achievements') },
    { id: 'settings', label: t('settings') },
  ];

  return (
    <main>
      <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {menuItems.map((item) => (
              <Button
                key={item.id}
                onClick={() => setActiveScreen(item.id)}
                variant={activeScreen === item.id ? 'default' : 'outline'}
              >
                {item.label}
              </Button>
            ))}
          </div>
          {renderScreen(activeScreen)}
        </div>
      </div>
    </main>
  );
}
