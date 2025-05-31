import Link from "next/link";
import { Button } from "@/components/ui/button";
import FeaturesSection from "./component/features-section";
import TestimonialsSection from "./component/testimonilas-section";
import CTASection from "./component/cta-section";
import HeroSection from "./component/hero-section";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      {/* Features Section */}
      <FeaturesSection />
      {/* Testimonials */}
      <TestimonialsSection />
      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
