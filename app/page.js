import Navbar      from "./shared/navbar/Navbar";
import Footer      from "./shared/footer/Footer";
import Hero        from "./sections/hero/Hero";
import Problem     from "./sections/problem/Problem";
import Solution    from "./sections/solution/Solution";
import Comparison  from "./sections/comparison/Comparison";
import HowItWorks  from "./sections/how-it-works/HowItWorks";
import Story       from "./sections/story/Story";
import Hyderabad   from "./sections/hyderabad/Hyderabad";
import Verticals   from "./sections/verticals/Verticals";
import Technology  from "./sections/technology/Technology";
import Waitlist    from "./sections/waitlist/Waitlist";

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
