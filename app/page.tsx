import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import ThisWeek from "@/components/ThisWeek";
import TheSpace from "@/components/TheSpace";
import KnowBeforeYouGo from "@/components/KnowBeforeYouGo";
import Gallery from "@/components/Gallery";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Marquee />
        <ThisWeek />
        <TheSpace />
        <KnowBeforeYouGo />
        <Gallery />
        <Marquee />
        <FindUs />
      </main>
      <Footer />
    </>
  );
}
