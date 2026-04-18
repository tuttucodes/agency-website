import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Metrics } from "@/components/Metrics";
import { Capabilities } from "@/components/Capabilities";
import { Process } from "@/components/Process";
import { Testimonial } from "@/components/Testimonial";
import { Studio } from "@/components/Studio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Work />
        <Metrics />
        <Capabilities />
        <Process />
        <Testimonial />
        <Studio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
