import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Projects from "../components/home/Projects";
import InvestmentPlans from "../components/home/InvestPlans";
import Contact from "../components/home/Contact";
import Testimonials from "../components/home/Testimonials";
import SkillsMarquee from "../components/home/SkillsMarquee";
import MarketNews from "../components/home/MarketNews";

interface HomeProps {
  isDark: boolean;
}

const Home = ({ isDark }: HomeProps) => {
  return (
    <>
      <Hero isDark={isDark} />
      <About isDark={isDark} />
      <SkillsMarquee isDark={isDark}/>
      <Projects isDark={isDark} />
      <InvestmentPlans isDark={isDark} />
      <Testimonials isDark={isDark} />
      <Contact isDark={isDark} />
    </>
  );
};

export default Home;
