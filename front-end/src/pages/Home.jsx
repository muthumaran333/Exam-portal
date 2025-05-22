import React, { useEffect } from 'react';
import HeroSection from '../components/Hero';
import StatsSection from '../components/Stats';
import Features from '../components/Features';
import TechStack from '../components/TechStack';
import PricingPlans from '../components/PricePlans';
import MeetTheTeam from '../components/MeetTeam';
import FAQAndNewsletter from '../components/FAQAndNews';

export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 to-white text-gray-800 font-sans scroll-smooth">



      <HeroSection />


      <StatsSection />


      <Features />

      <TechStack />

      <PricingPlans />










<MeetTheTeam  />


 
<FAQAndNewsletter />

      

   
    </div>
  );
}
