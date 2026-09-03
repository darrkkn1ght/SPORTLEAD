import Hero from "@/components/home/Hero";
import ServicePillars from "@/components/home/ServicePillars";
import WhoWeServe from "@/components/home/WhoWeServe";
import WhySportLead from "@/components/home/WhySportLead";
import ClosingCTA from "@/components/home/ClosingCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <ServicePillars />
      <WhoWeServe />
      <WhySportLead />
      <ClosingCTA />
    </main>
  );
}
