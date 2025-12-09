import { Hero } from "@/components/home/Hero";
import { ImpactStats } from "@/components/home/ImpactStats";
import { TrustSection } from "@/components/home/TrustSection";
import { UrgentBanner } from "@/components/home/UrgentBanner";
import { Testimonials } from "@/components/home/Testimonials";
import CausesPage from "@/app/(public)/causes/page";
import { WhatWeDo } from "@/components/home/WhatWeDo"; // Added import
import { FundraisingSection } from "@/components/home/FundraisingSection";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <WhatWeDo /> {/* Added WhatWeDo component */}
      <FundraisingSection />
      <TrustSection />

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Appeals</h2>
              <div className="w-20 h-1 bg-[#0F5E36] rounded-full" />
            </div>
            <a href="/appeals" className="text-[#0F5E36] font-bold hover:underline">View All Appeals &rarr;</a>
          </div>

          {/* Reuse Causes Grid but limit/style it if needed */}
          <div className="[&>div>div:first-child]:hidden [&>div]:p-0">
            <CausesPage />
          </div>
        </div>
      </section>

      <UrgentBanner />
      <ImpactStats />
      <Testimonials />
    </div>
  );
}
