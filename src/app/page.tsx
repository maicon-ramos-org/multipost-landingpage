import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Networks from "@/components/Networks";
import Demo from "@/components/Demo";
import CourseContent from "@/components/CourseContent";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Stats />
        <Features />
        <Networks />
        <Demo />
        <CourseContent />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
