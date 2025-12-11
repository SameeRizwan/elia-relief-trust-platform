import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyHornOfAfrica } from "@/components/home/WhyHornOfAfrica";
import { IftaarSection } from "@/components/home/IftaarSection";

import { TrustSection } from "@/components/home/TrustSection";
import { FundraisingSection } from "@/components/home/FundraisingSection";
import CausesPage from "@/app/(public)/causes/page";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Short About Section */}
      <WhatWeDo />

      {/* 3. Our Main Focus Areas (Featured Appeals) */}



      {/* 4. Why the Horn of Africa */}
      <WhyHornOfAfrica />

      {/* 5. Iftaar As-Saami Highlight */}
      <IftaarSection />



      {/* 7. Trust Section */}
      <TrustSection />

      {/* 8. Featured Campaigns / Get Involved */}
      <FundraisingSection />
    </div>
  );
}
