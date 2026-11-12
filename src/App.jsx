import { useCallback, useEffect, useState } from "react";
import { MotionConfig, useReducedMotion } from "framer-motion";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Marquee from "./components/Marquee.jsx";
import About from "./components/About.jsx";
import Pillars from "./components/Pillars.jsx";
import Donate from "./components/Donate.jsx";
import Leadership from "./components/Leadership.jsx";
import Connect from "./components/Connect.jsx";
import Footer from "./components/Footer.jsx";
import IntroSplash from "./components/IntroSplash.jsx";

export default function App() {
  const prefersReduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(() => Boolean(prefersReduced));
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  // Scroll to the section named in the URL. The browser cannot do this natively because
  // the sections are only mounted once React has rendered.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    // reducedMotion="user": Framer drops transform animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <div
        className="site"
        aria-hidden={introDone ? undefined : true}
        {...(introDone ? {} : { inert: "" })}
      >
        <a className="skip-link" href="#about">
          Skip to content
        </a>
        <Header />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Pillars />
          <Donate />
          <Leadership />
          <Connect />
        </main>
        <Footer />
      </div>

      {!introDone && <IntroSplash onDone={handleIntroDone} />}
    </MotionConfig>
  );
}
