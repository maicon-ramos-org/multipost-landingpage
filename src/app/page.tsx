import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SocialCarousel from "@/components/SocialCarousel";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import TrainingSteps from "@/components/TrainingSteps";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";
import WhatsAppButton from "@/components/WhatsAppButton";
import GradFlowBackground from "@/components/GradFlowBackground";

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
