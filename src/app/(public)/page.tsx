import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { WhyHornOfAfrica } from "@/components/home/WhyHornOfAfrica";
import { IftaarSection } from "@/components/home/IftaarSection";
import { ImpactStats } from "@/components/home/ImpactStats";
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Main Focus Areas</h2>
              <div className="w-20 h-1 bg-[#0F5E36] rounded-full" />
            </div>
            <a href="/appeals" className="text-[#0F5E36] font-bold hover:underline">View All Appeals &rarr;</a>
          </div>

          {/* Reuse Causes Grid */}
          <div className="[&>div>div:first-child]:hidden [&>div]:p-0">
            <CausesPage />
          </div>
        </div>
      </section>

      {/* 4. Why the Horn of Africa */}
      <WhyHornOfAfrica />

      {/* 5. Iftaar As-Saami Highlight */}
      <IftaarSection />

      {/* 6. Impact Numbers / Simple Stats */}
      <ImpactStats />

      {/* 7. Trust Section */}
      <TrustSection />

      {/* 8. Featured Campaigns / Get Involved */}
      <FundraisingSection />
    </div>
  );
}
