import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhoWeHelp } from './components/WhoWeHelp';
import { ServicesSection } from './components/ServicesSection';
import { RevenueCalculators } from './components/RevenueCalculators';
import { WhyChooseUs } from './components/WhyChooseUs';
import { TransformationSection } from './components/TransformationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { ConsultationModal } from './components/ConsultationModal';
import { FloatingContact } from './components/FloatingContact';
import { InteractiveCursor } from './components/InteractiveCursor';

export default function App() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('');
  const [selectedPropertyType, setSelectedPropertyType] = useState<string>('');

  const handleOpenConsultation = (serviceOrProperty?: string) => {
    if (serviceOrProperty) {
      if (['Hotels', 'Apartments', 'Guesthouses', 'Resorts', 'Lodges', 'Independent Property Owners'].includes(serviceOrProperty)) {
        setSelectedPropertyType(serviceOrProperty);
      } else {
        setSelectedService(serviceOrProperty);
      }
    }
    setIsConsultationOpen(true);
  };

  const handleCloseConsultation = () => {
    setIsConsultationOpen(false);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans selection:bg-blue-600/15 selection:text-blue-700">
      {/* Interactive Motion Graphic Cursor */}
      <InteractiveCursor />

      {/* Navigation Header */}
      <Header onOpenConsultation={handleOpenConsultation} />

      {/* Main Sections Content */}
      <main className="flex-1">
        {/* SECTION 1: HERO with Interactive Yield Simulator */}
        <Hero onOpenConsultation={() => handleOpenConsultation()} />

        {/* SECTION 2: WHO WE HELP */}
        <WhoWeHelp onOpenConsultation={handleOpenConsultation} />

        {/* SECTION 3: OUR SERVICES */}
        <ServicesSection onOpenConsultation={handleOpenConsultation} />

        {/* SECTION 4: REVENUE CALCULATORS */}
        <RevenueCalculators onOpenConsultation={handleOpenConsultation} />

        {/* SECTION 5: WHY CHOOSE REVMAX */}
        <WhyChooseUs onOpenConsultation={() => handleOpenConsultation()} />

        {/* SECTION 6: HOW WE TRANSFORM PERFORMANCE (Authentic 5-Stage Methodology) */}
        <TransformationSection onOpenConsultation={() => handleOpenConsultation()} />

        {/* SECTION 7: OPERATIONAL STANDARDS & COMMITMENTS (Zero false data) */}
        <TestimonialsSection />

        {/* SECTION 8: CONTACT */}
        <ContactSection 
          initialService={selectedService} 
          initialPropertyType={selectedPropertyType} 
        />

        {/* SECTION 9: FINAL CTA */}
        <FinalCTA onOpenConsultation={() => handleOpenConsultation()} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={handleCloseConsultation}
        prefilledService={selectedService}
        prefilledPropertyType={selectedPropertyType}
      />

      {/* Floating Quick Contact Widget */}
      <FloatingContact />
    </div>
  );
}
