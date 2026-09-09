"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm, ValidationError } from "@formspree/react";
import { supabase } from "@/lib/supabaseClient";
import { motion, AnimatePresence } from "framer-motion";

interface Projects {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
}

// ── Static data (moved outside component to avoid re-creation) ──
const NAV_SECTIONS = ["home", "about", "experience", "projects", "contact"] as const;

const SKILLS = [
  "React",
  "Next.js",
  "JavaScript",
  "TypeScript",
  "Tailwind CSS",
  "Supabase",
  "DRIZZLE-ORM",
  "SQL",
  "AI/LLM Integrations and RAG (vector search)",
  "Fullstack Applications",
  "Git",
  "GitHub",
  "REST APIs",
  "Framer Motion",
  "Responsive Design",
];

const EXPERIENCES = [
  {
    role: "Frontend Developer",
    company: "Aquila Cyber",
    period: "Nov 2025 — Present",
    description:
      "Currently responsible for building clean user interfaces, working closely with designers, backend engineers, and product managers. Crafted responsive web designs that boosted user engagement by 30%, optimized website performance reducing load times by 50%, and integrated APIs seamlessly to expand functionality and user experience.",
    skills: ["Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Agile"],
  },
  {
    role: "Frontend Developer (Intern) & QA Tester",
    company: "Myinstashop",
    period: "Apr 2025 — Present",
    description:
      "Assisted in building and improving user-facing features while ensuring product quality through systematic testing. Developed responsive UI components using Next.js, Tailwind, and TypeScript. Translated Figma designs into clean, reusable code, identified and tracked bugs, and performed manual/functional testing before releases.",
    skills: ["Next.js", "Tailwind CSS", "TypeScript", "QA Testing", "Figma"],
  },
  {
    role: "Frontend Developer (Intern)",
    company: "Tverza",
    period: "Jan 2025 — Apr 2025",
    description:
      "Tverza is the single point of entry and exit into the World Business Activities, Revolutionizing the way real-world businesses operate in the digital realm redefining transactions within supply chains.Assisted in building and improving user interfaces with Next.js, Tailwind CSS, and TypeScript. Collaborated with designers to create visually appealing UI/UX solutions, integrated APIs to enhance functionality, and participated in code reviews fostering a culture of quality and learning.",
    skills: ["Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "Git"],
  },
];

const HERO_TECH = ["React", "Next.js", "TypeScript", "Tailwind"];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("home");
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [project, setProject] = useState<Projects[]>([]);
  const [expandedExp, setExpandedExp] = useState<number | null>(0);

  const progressBarRef = useRef<HTMLDivElement>(null);
  const backToTopRef = useRef<HTMLButtonElement>(null);
  const activeSectionRef = useRef("home");
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await supabase
          .from("projects")
          .select("id, title, description, image_url, tech_stack, live_url, github_url")
          .order("created_at", { ascending: false });

        if (data) setProject(data);
      } catch (err) {
        console.error("Unable to fetch data:", err);
      }
    };
    fetchProjects();
  }, []);

  useEffect(() => {
    const sections = NAV_SECTIONS
      .map((section) => document.getElementById(section))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (first, second) =>
              Math.abs(
                first.boundingClientRect.top +
                  first.boundingClientRect.height / 2 -
                  window.innerHeight / 2,
              ) -
              Math.abs(
                second.boundingClientRect.top +
                  second.boundingClientRect.height / 2 -
                  window.innerHeight / 2,
              ),
          )[0];

        if (!visibleEntry) return;

        const section = visibleEntry.target.id;
        if (activeSectionRef.current !== section) {
          activeSectionRef.current = section;
          setActiveSection(section);
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = requestAnimationFrame(() => {
      const scrollHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      if (progressBarRef.current) {
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }

      if (backToTopRef.current) {
        backToTopRef.current.setAttribute(
          "data-visible",
          progress > 0.2 ? "true" : "false",
        );
      }

      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const router = useRouter();
  const [state, handleSubmit] = useForm("mzzvpgjq");

  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        router.back();
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded, router]);

  // Success state
  if (state.succeeded) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <motion.div
          className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-10 text-center max-w-md w-full relative z-10"
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          role="alert"
          aria-live="polite"
        >
          <motion.div
            className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>

          <motion.h2
            className="text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Thank You!
          </motion.h2>
          <motion.p
            className="text-[#999] mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Your message has been sent successfully. I&apos;ll get back to you
            soon.
          </motion.p>

          <motion.div
            className="w-full bg-[#1a1a1a] rounded-full h-1 mb-6 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            role="progressbar"
            aria-label="Redirect timer"
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <motion.div
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "linear" }}
            />
          </motion.div>

          <motion.button
            onClick={() => router.back()}
            className="w-full bg-white text-black py-3 rounded-lg font-semibold transition-all hover:bg-white/90"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="Return to portfolio"
          >
            Return to Portfolio
          </motion.button>

          <motion.p
            className="text-xs text-[#777] mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Redirecting automatically...
          </motion.p>
        </motion.div>
      </div>
    );
  }

  return (
    <>
      {/* Skip to content link (Accessibility) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden text-white">
        {/* Static background accents kept outside the content flow. */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        {/* Scroll Progress — direct DOM ref, no state re-renders */}
        <div
          ref={progressBarRef}
          className="scroll-progress-bar"
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={0}
        />

        {/* =============== NAVBAR =============== */}
        <nav
          className="fixed top-0 w-full z-50 bg-[#0a0a0a] border-b border-white/5 transition-colors duration-300"
          aria-label="Main navigation"
          role="banner"
        >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between items-center h-16">
              <motion.div
                className="text-lg font-bold text-white tracking-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#999]" aria-hidden="true">{"{"}</span>
                Ojehonmon Israel.Dev
                <span className="text-[#999]" aria-hidden="true">{"}"}</span>
              </motion.div>

              {/* Desktop Nav */}
              <motion.div
                className="hidden md:flex items-center gap-8"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                role="list"
              >
                {NAV_SECTIONS.map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`text-sm capitalize transition-colors duration-200 ${
                      activeSection === item
                        ? "text-white"
                        : "text-[#999] hover:text-white"
                    }`}
                    role="listitem"
                    aria-current={activeSection === item ? "true" : undefined}
                  >
                    {item}
                  </button>
                ))}
                {/* Theme toggle icon */}
                <button
                  aria-label="Toggle theme"
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#999] hover:text-white transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </button>
              </motion.div>

              {/* Mobile Menu Button */}
              <button
                aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-nav-menu"
                className="md:hidden text-[#999] hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Nav */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                id="mobile-nav-menu"
                className="md:hidden bg-[#0a0a0a] border-b border-[#1a1a1a]"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                role="menu"
                aria-label="Mobile navigation"
              >
                <div className="px-6 py-4 space-y-3">
                  {NAV_SECTIONS.map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollToSection(item)}
                      className="block w-full text-left text-sm text-[#999] hover:text-white capitalize transition-colors py-1"
                      role="menuitem"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>

        {/* =============== MAIN CONTENT =============== */}
        <main id="main-content">

          {/* =============== HERO =============== */}
          <section
            id="home"
            className="min-h-screen flex items-center justify-center px-6 relative z-10"
            aria-labelledby="hero-heading"
          >
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#111] border border-[#1a1a1a] rounded-full text-sm text-[#999] mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span aria-hidden="true">✨</span>
                <span>Welcome to my portfolio</span>
              </motion.div>

              {/* Hero Heading */}
              <motion.h1
                id="hero-heading"
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Crafting Digital
                <br />
                <span className="gradient-text glow-text relative inline-block">Magic</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-[#999] text-lg sm:text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                I&apos;m a frontend developer. I craft elegant and efficient frontend solutions
                that transform ideas into seamless digital experiences with clean,
                performant code.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <motion.button
                  onClick={() => scrollToSection("projects")}
                  className="bg-white text-black px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore My Work
                </motion.button>
                <motion.button
                  onClick={() => scrollToSection("contact")}
                  className="bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-white/10 hover:border-white/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get In Touch
                </motion.button>
              </motion.div>

              {/* Tech Stack Row */}
              <motion.div
                className="flex items-center justify-center gap-6 text-[#777] text-xs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                aria-label="Core technology stack"
              >
                <span className="text-[#777]">TECH STACK</span>
                <span className="text-[#333]" aria-hidden="true">|</span>
                <div className="flex items-center gap-4">
                  {HERO_TECH.map((tech) => (
                    <span key={tech} className="text-[#777] hover:text-white transition-colors cursor-default">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* =============== ABOUT ME =============== */}
          <section
            id="about"
            className="py-24 px-6 relative z-10"
            aria-labelledby="about-heading"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                id="about-heading"
                className="text-3xl font-bold text-white mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-line" aria-hidden="true" />
                About Me
              </motion.h2>

              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                {/* Left — Bio */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <p className="text-[#aaa] text-base leading-relaxed mb-6">
                    I&apos;m a passionate frontend developer with experience
                    creating modern web applications. I love turning complex
                    problems into simple, beautiful, and intuitive designs that
                    users enjoy interacting with.
                  </p>
                  <p className="text-[#aaa] text-base leading-relaxed mb-8">
                    Currently, I&apos;m focused on React, TypeScript, and
                    Next.js, building scalable and performant
                    applications that prioritize both developer
                    experience and end-user satisfaction.
                  </p>

                  {/* Social links */}
                  <div className="flex items-center gap-4">
                    <motion.a
                      href="https://github.com/izzymony"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[#999] hover:text-white hover:border-[#333] transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="GitHub profile"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="https://www.linkedin.com/in/israel-ojehonmon-24775626a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[#999] hover:text-white hover:border-[#333] transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="LinkedIn profile"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </motion.a>
                    <motion.a
                      href="https://x.com/IOjehonmon31052/photo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[#999] hover:text-white hover:border-[#333] transition-all"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label="Twitter / X profile"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </motion.a>
                  </div>
                </motion.div>

                {/* Right — Skills & Quick Info */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* My Skills label */}
                  <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6 mb-6">
                    <h3 className="text-sm font-semibold text-[#999] uppercase tracking-wider mb-4">
                      My Skills
                    </h3>
                    <div className="flex flex-wrap gap-2.5" role="list" aria-label="Technical skills">
                      {SKILLS.map((skill) => (
                        <motion.span
                          key={skill}
                          className="skill-pill"
                          whileHover={{ scale: 1.05 }}
                          role="listitem"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-white/40" aria-hidden="true" />
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Experience Summary */}
                  <div className="bg-[#111] border border-[#1a1a1a] rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <svg
                          className="w-4 h-4 text-[#999]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-sm font-semibold text-white">
                        Experience
                      </h3>
                    </div>
                    <p className="text-[#999] text-sm leading-relaxed">
                      Professional experience at Aquila Cyber, Myinstashop, and Tverza —
                      building responsive UIs with React, Next.js, and TypeScript.
                      Skilled in translating designs to code, API integration, and QA testing.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* =============== EXPERIENCE =============== */}
          <section
            id="experience"
            className="py-24 px-6 relative z-10"
            aria-labelledby="experience-heading"
          >
            <div className="max-w-4xl mx-auto">
              <motion.h2
                id="experience-heading"
                className="text-3xl font-bold text-white mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-line" aria-hidden="true" />
                Experience
              </motion.h2>

              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                variants={staggerContainer}
              >
                {EXPERIENCES.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="experience-card"
                    variants={fadeInUp}
                  >
                    {/* Header — always visible */}
                    <button
                      className="w-full flex items-center justify-between p-6 text-left"
                      onClick={() =>
                        setExpandedExp(expandedExp === index ? null : index)
                      }
                      aria-expanded={expandedExp === index}
                      aria-controls={`experience-panel-${index}`}
                      id={`experience-header-${index}`}
                    >
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-[#222] flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-white" aria-hidden="true">
                            {exp.company.charAt(0)}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base font-semibold text-white truncate">
                            {exp.role}
                          </h3>
                          <p className="text-sm text-[#8a8a8a]">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="text-xs bg-[#1a1a1a] text-[#999] px-3 py-1 rounded-full border border-[#222]">
                          {exp.period}
                        </span>
                        <motion.svg
                          className="w-4 h-4 text-[#999]"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          animate={{
                            rotate: expandedExp === index ? 180 : 0,
                          }}
                          transition={{ duration: 0.2 }}
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </motion.svg>
                      </div>
                    </button>

                    {/* Expandable content */}
                    <AnimatePresence>
                      {expandedExp === index && (
                        <motion.div
                          id={`experience-panel-${index}`}
                          role="region"
                          aria-labelledby={`experience-header-${index}`}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-0">
                            <p className="text-[#999] text-sm leading-relaxed mb-4">
                              {exp.description}
                            </p>
                            <div className="flex flex-wrap gap-2" role="list" aria-label={`Skills used at ${exp.company}`}>
                              {exp.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="text-xs bg-[#1a1a1a] text-[#999] px-3 py-1 rounded-full border border-[#222]"
                                  role="listitem"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* =============== FEATURED WORK =============== */}
          <section
            id="projects"
            className="py-24 px-6 relative z-10"
            aria-labelledby="projects-heading"
          >
            <div className="max-w-6xl mx-auto">
              <motion.h2
                id="projects-heading"
                className="text-3xl font-bold text-white mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <span className="section-line" aria-hidden="true" />
                Featured Work
              </motion.h2>
              <motion.p
                className="text-[#999] mb-12 max-w-xl"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Showcasing projects built with modern technologies and a passion for quality.
              </motion.p>

              <motion.div
                className="space-y-4"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                variants={staggerContainer}
              >
                {project.map((proj) => (
                  <motion.article
                    key={proj.id}
                    className="project-card"
                    variants={fadeInUp}
                    whileHover={{ borderColor: "#333" }}
                    aria-labelledby={`project-title-${proj.id}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start gap-6">
                      {/* Project image */}
                        {proj.image_url && (
                          <div className="w-full md:w-56 lg:w-64 aspect-video md:aspect-video rounded-xl overflow-hidden image-placeholder flex-shrink-0 relative">
                            <Image
                              src={proj.image_url}
                              alt={`Screenshot of ${proj.title}`}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 224px, 256px"
                              loading="lazy"
                              className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                            />
                          </div>
                        )}
                      <div className="flex-1 min-w-0">
                        <h3
                          id={`project-title-${proj.id}`}
                          className="text-lg font-semibold text-white mb-2"
                        >
                          {proj.title}
                        </h3>
                        <p className="text-[#999] text-sm leading-relaxed mb-4 line-clamp-2">
                          {proj.description}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 mb-4" role="list" aria-label={`Technologies used in ${proj.title}`}>
                          {proj.tech_stack?.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs bg-[#1a1a1a] text-[#999] px-3 py-1 rounded-full border border-[#222]"
                              role="listitem"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* Action links */}
                        <div className="flex items-center gap-3">
                          {proj.live_url && (
                            <a
                              href={proj.live_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#999] hover:text-white transition-colors flex items-center gap-1.5"
                              aria-label={`View live demo of ${proj.title}`}
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                              Live Demo
                            </a>
                          )}
                          {proj.github_url && (
                            <a
                              href={proj.github_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#999] hover:text-white transition-colors flex items-center gap-1.5"
                              aria-label={`View source code of ${proj.title} on GitHub`}
                            >
                              <svg
                                className="w-3.5 h-3.5"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                              </svg>
                              Source Code
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </section>

          {/* =============== CONTACT =============== */}
          <section
            id="contact"
            className="py-24 px-6 relative z-10"
            aria-labelledby="contact-heading"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h2 id="contact-heading" className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-[#999] max-w-lg mx-auto">
                  Have a project in mind? Let&apos;s collaborate. Just drop me a
                  line and I&apos;ll get back to you as soon as possible.
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 gap-12">
                {/* Left — Contact Info */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-white mb-6">
                    Contact Info
                  </h3>
                  {[
                    {
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      ),
                      label: "Email",
                      value: "ojehonmonisrael008@gmail.com",
                    },
                    {
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      ),
                      label: "Phone",
                      value: "+234 906 579 8272",
                    },
                    {
                      icon: (
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      ),
                      label: "Location",
                      value: "Lagos, Nigeria",
                    },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      className="contact-card"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-[#999]">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-xs text-[#8a8a8a] mb-0.5">{item.label}</p>
                        <p className="text-sm text-white">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}

                  {/* Social row */}
                  <div className="flex items-center gap-3 pt-4">
                    {[
                      {
                        label: "GitHub",
                        href: "https://github.com/izzymony",
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                          </svg>
                        ),
                      },
                      {
                        label: "LinkedIn",
                        href: "https://www.linkedin.com/in/israel-ojehonmon-24775626a",
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        ),
                      },
                      {
                        label: "Twitter / X",
                        href: "https://x.com/IOjehonmon31052/photo",
                        icon: (
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        ),
                      },
                    ].map((social) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 rounded-lg bg-[#111] border border-[#1a1a1a] flex items-center justify-center text-[#999] hover:text-white hover:border-[#333] transition-all"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </motion.div>

                {/* Right — Contact Form */}
                <motion.form
                  className="space-y-4"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                  aria-label="Contact form"
                  noValidate
                >
                  <div>
                    <label htmlFor="contact-name" className="sr-only">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      required
                      placeholder="Your Name"
                      className="form-input"
                      aria-describedby="contact-name-error"
                      autoComplete="name"
                    />
                    <div id="contact-name-error" aria-live="polite">
                      <ValidationError
                        prefix="Name"
                        field="name"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-email" className="sr-only">Your Email</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      required
                      placeholder="Your Email"
                      className="form-input"
                      aria-describedby="contact-email-error"
                      autoComplete="email"
                    />
                    <div id="contact-email-error" aria-live="polite">
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="sr-only">Your Message</label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      name="message"
                      placeholder="Your Message"
                      required
                      className="form-input resize-none"
                      aria-describedby="contact-message-error"
                    />
                    <div id="contact-message-error" aria-live="polite">
                      <ValidationError
                        prefix="Message"
                        field="message"
                        errors={state.errors}
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={state.submitting}
                    className="w-full bg-white text-black py-3 rounded-lg font-semibold text-sm hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-busy={state.submitting}
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </motion.button>
                </motion.form>
              </div>
            </div>
          </section>
        </main>

        {/* =============== FOOTER =============== */}
        <footer
          className="pt-16 pb-8 px-6 border-t border-[#1a1a1a] relative z-10"
          role="contentinfo"
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-12 mb-12">
              {/* Quick Links */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Quick Links
                </h4>
                <nav aria-label="Footer quick links">
                  <div className="space-y-2">
                    {["Home", "About", "Experience", "Projects", "Contact"].map(
                      (link) => (
                        <button
                          key={link}
                          onClick={() =>
                            scrollToSection(link.toLowerCase())
                          }
                          className="block footer-link"
                        >
                          {link}
                        </button>
                      )
                    )}
                  </div>
                </nav>
              </div>

              {/* Built With */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Built With
                </h4>
                <div className="space-y-2">
                  {[
                    "Next.js",
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Framer Motion",
                  ].map((tech) => (
                    <p key={tech} className="footer-link">
                      {tech}
                    </p>
                  ))}
                </div>
              </div>

              {/* Connect */}
              <div>
                <h4 className="text-sm font-semibold text-white mb-4">
                  Connect
                </h4>
                <nav aria-label="Social media links">
                  <div className="space-y-2">
                    <a
                      href="https://github.com/izzymony"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block footer-link"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://www.linkedin.com/in/israel-ojehonmon-24775626a"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block footer-link"
                    >
                      LinkedIn
                    </a>
                    <a
                      href="https://x.com/IOjehonmon31052/photo"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block footer-link"
                    >
                      Twitter / X
                    </a>
                    <a
                      href="mailto:ojehonmonisrael008@gmail.com"
                      className="block footer-link"
                    >
                      Email
                    </a>
                  </div>
                </nav>
              </div>
            </div>

            {/* Copyright */}
            <div className="pt-8 border-t border-[#1a1a1a] text-center">
              <p className="text-[#777] text-sm">
                © {new Date().getFullYear()} Ojehonmon Israel. Built with ❤️
                using Next.js and TypeScript.
              </p>
            </div>
          </div>
        </footer>

        {/* Back to Top Button — visibility controlled via data attribute + CSS for perf */}
        <button
          id="back-to-top-btn"
          data-visible="false"
          onClick={() => scrollToSection("home")}
          className="fixed bottom-8 right-8 z-50 bg-white text-black p-3 rounded-full shadow-lg transition-all hover:bg-white/90 data-[visible=false]:opacity-0 data-[visible=false]:scale-0 data-[visible=false]:pointer-events-none data-[visible=true]:opacity-100 data-[visible=true]:scale-100"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      </div>
    </>
  );
}