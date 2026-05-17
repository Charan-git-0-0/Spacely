import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Comparison from "./components/Comparison";
import HowItWorks from "./components/HowItWorks";
import Story from "./components/Story";
import Hyderabad from "./components/Hyderabad";
import Verticals from "./components/Verticals";
import Technology from "./components/Technology";
import Waitlist from "./components/Waitlist";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative grid-bg">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Comparison />
      <HowItWorks />
      <Story />
      <Hyderabad />
      <Verticals />
      <Technology />
      <Waitlist />
      <Footer />
    </main>
  );
}
