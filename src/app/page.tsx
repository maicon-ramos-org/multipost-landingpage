import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialCarousel from "@/components/SocialCarousel";

// Below-the-fold components: lazy loaded
const Stats = dynamic(() => import("@/components/Stats"));
const Features = dynamic(() => import("@/components/Features"));
const TrainingSteps = dynamic(() => import("@/components/TrainingSteps"));
const Pricing = dynamic(() => import("@/components/Pricing"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const Footer = dynamic(() => import("@/components/Footer"));
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"));
const ScrollProgress = dynamic(() => import("@/components/ScrollProgress"));
const GradFlowBackground = dynamic(
  () => import("@/components/GradFlowBackground"),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <GradFlowBackground />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <SocialCarousel />
        <Stats />
        <Features />
        <TrainingSteps />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
