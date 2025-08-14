import React, { useState } from 'react';
import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { DevotionalSection } from './DevotionalSection';
import { BibleVersesSection } from './BibleVersesSection';
import { SabbathSchoolSection } from './SabbathSchoolSection';
import { MediaSection } from './MediaSection';
import { AnnouncementsSection } from './AnnouncementsSection';
import { WorshipScheduleSection } from './WorshipScheduleSection';
import { CallToActionSection } from './CallToActionSection';
import { Footer } from './Footer';
import { useLanguage } from '../contexts/LanguageContext';

interface EthiopianLandingPageProps {
  currentUser: any;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  setCurrentView: (view: string) => void;
  handleLogout: () => void;
}

export function EthiopianLandingPage({
  currentUser,
  isMenuOpen,
  setIsMenuOpen,
  setCurrentView,
  handleLogout
}: EthiopianLandingPageProps) {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);

  const handlePlayAudio = (podcastId: string) => {
    if (playingAudio === podcastId) {
      setPlayingAudio(null);
    } else {
      setPlayingAudio(podcastId);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        currentUser={currentUser}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setCurrentView={setCurrentView}
        handleLogout={handleLogout}
      />

      <HeroSection
        currentUser={currentUser}
        setCurrentView={setCurrentView}
      />

      <DevotionalSection
        currentUser={currentUser}
        setCurrentView={setCurrentView}
      />

      <BibleVersesSection
        currentUser={currentUser}
        setCurrentView={setCurrentView}
      />

      <SabbathSchoolSection
        currentUser={currentUser}
        setCurrentView={setCurrentView}
      />

      <MediaSection
        currentUser={currentUser}
        setCurrentView={setCurrentView}
        playingAudio={playingAudio}
        handlePlayAudio={handlePlayAudio}
      />

      <AnnouncementsSection />

      <WorshipScheduleSection />

      <CallToActionSection
        setCurrentView={setCurrentView}
      />

      <Footer />
    </div>
  );
}