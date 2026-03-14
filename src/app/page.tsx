import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Solution from "@/components/Solution";
import Features from "@/components/Features";
import Networks from "@/components/Networks";
import CourseContent from "@/components/CourseContent";
import Audience from "@/components/Audience";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Networks />
        <CourseContent />
        <Audience />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
