import ApiShowcaseSection from "@/components/landing/api-showcase-section";
import FeaturedVideoSection from "@/components/landing/featured-video-section";
import FeaturesSection from "@/components/landing/features-section";
import HeroSection from "@/components/landing/hero-section";
import MetricsSection from "@/components/landing/metrics-section";
import SponsorSection from "@/components/landing/sponsor-section";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col items-center overflow-hidden">
      <HeroSection />
      <ApiShowcaseSection />
      <FeaturesSection />
      <MetricsSection />
      <FeaturedVideoSection />
      <SponsorSection />
    </div>
  );
}
