
import React from 'react';
import LandingHeader from '@/components/LandingHeader';
import HeroSection from '@/components/HeroSection';
import HowItWorks from '@/components/HowItWorks';
import SocialProof from '@/components/SocialProof';
import Benefits from '@/components/Benefits';
import FinalCTA from '@/components/FinalCTA';
import LandingFooter from '@/components/LandingFooter';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <LandingHeader />
      <HeroSection />
      <SocialProof />
      <HowItWorks />
      <Benefits />
      <FinalCTA />
      <LandingFooter />
    </div>
  );
};

export default Index;
