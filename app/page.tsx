"use client";
import React, { useState, useEffect, } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useForm, ValidationError } from '@formspree/react'
import { supabase } from '@/lib/supabaseClient';
import { motion, } from 'framer-motion';



interface Projects {
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
}

interface Skill {
  name: string;
  level: number;
}


// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 }
  }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [project, setProject] = useState<Projects[]>([]);
  const [, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);



  useEffect(() => {
    const fetchProjects = async () => {

      try {
        const { data } = await supabase.from("projects")
          .select("*")
          .order("created_at", { ascending: false })

        if (data) setProject(data);
        setLoading(false);

      } catch (err) {
        console.error("Unable to fetch data:", err)

      } finally {
        setLoading(false)
      }
    }
    fetchProjects();
  }, [])


  const skills: Skill[] = [
    { name: "JavaScript", level: 9 },
    { name: "TypeScript", level: 8 },
    { name: "Tailwind CSS", level: 9 },
    { name: "Supabase", level: 7 },
    { name: "Git", level: 8 },
    { name: "GitHub", level: 8 },
    { name: "Firebase", level: 7 }
  ]

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'services', 'skills', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100

        }
        return false;

      })
      if (current) {
        setActiveSection(current);
      }

      // Update scroll progress
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / scrollHeight) * 100;
      setScrollProgress(progress);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const router = useRouter()

  const [state, handleSubmit] = useForm('mzzvpgjq')

  // keep hooks at the top-level - BEFORE any conditional returns
  useEffect(() => {
    if (state.succeeded) {
      const timer = setTimeout(() => {
        router.back();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [state.succeeded, router]);

  // Early return AFTER all hooks
  if (state.succeeded) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-[#030712]">
        {/* Animated Background */}
        <div className="fixed inset-0 z-0 opacity-40">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-[#2F73F2]/20 rounded-full blur-[128px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9c78f]/10 rounded-full blur-[128px]"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        <div className="h-screen flex items-center justify-center p-4 relative z-10">
          <motion.div
            className="bg-[#0f172a]/90 backdrop-blur-xl p-8 md:p-12 text-center rounded-2xl shadow-2xl border border-slate-800 max-w-md w-full"
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
          >
            {/* Success Icon with Animation */}
            <motion.div
              className="mb-6 flex justify-center"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 150 }}
            >
              <motion.div
                className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2F73F2] to-[#f9c78f] flex items-center justify-center shadow-[0_0_30px_rgba(47,115,242,0.5)]"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(47, 115, 242, 0.4)",
                    "0 0 40px rgba(249, 199, 143, 0.6)",
                    "0 0 20px rgba(47, 115, 242, 0.4)",
                  ],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  className="filter brightness-0 invert"
                  src={"/icons8-check-50 (1).png"}
                  alt="Success"
                  width={50}
                  height={50}
                />
              </motion.div>
            </motion.div>

            {/* Success Message */}
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F73F2] to-[#f9c78f]">
                Thank You!
              </span>
            </motion.h2>

            <motion.p
              className="text-gray-200 text-lg font-semibold mb-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Your message has been sent successfully
            </motion.p>

            <motion.p
              className="text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              We will get back to you soon
            </motion.p>

            {/* Progress Bar */}
            <motion.div
              className="w-full bg-slate-800 rounded-full h-1.5 mb-6 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-[#2F73F2] to-[#f9c78f]"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "linear" }}
              />
            </motion.div>

            {/* Manual Return Button */}
            <motion.button
              onClick={() => { router.back() }}
              className="bg-gradient-to-r from-[#2F73F2] to-[#f9c78f] hover:opacity-90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg w-full"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(47, 115, 242, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              title="Return to portfolio"
            >
              Return to Portfolio
            </motion.button>

            <motion.p
              className="text-sm text-gray-500 mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Redirecting automatically in 2 seconds...
            </motion.p>
          </motion.div>
        </div>
      </div>
    );
  }



  return (
    <>
      <Head>
        <title>Your Name - Frontend Developer</title>
        <meta name='description' content='Frontend Developer Portfolio showcasing modern web applications' />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='min-h-screen bg-[#030712] relative overflow-hidden text-white'>
        {/* Animated Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <motion.div
            className="absolute top-0 left-0 w-96 h-96 bg-[#2F73F2]/10 rounded-full blur-[128px]"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
          <motion.div
            className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9c78f]/5 rounded-full blur-[128px]"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2F73F2] to-[#f9c78f] z-50 origin-left"
          style={{ scaleX: scrollProgress / 100 }}
        />

        <nav className="fixed top-0 w-full z-40 bg-[#030712]/80 backdrop-blur-md border-b border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <motion.div
                className="text-2xl font-bold text-white"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-[#2F73F2]">{'<'}</span>
                Ojehonmon Israel
                <span className="text-[#2F73F2]">{'/>'}</span>
              </motion.div>

              {/* Desktop Navigation */}
              <motion.div
                className="hidden md:flex space-x-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {['home', 'about', 'services', 'skills', 'projects', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-colors duration-300 hover:text-[#2F73F2] relative font-medium ${activeSection === item ? 'text-[#2F73F2]' : 'text-gray-300'
                      }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item}
                    {activeSection === item && (
                      <motion.div
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2F73F2] to-[#f9c78f]"
                        layoutId="activeSection"
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Mobile Menu Button */}
              <button title='button'
                className="md:hidden text-gray-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />

                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <motion.div
              className="md:hidden bg-[#030712]/95 backdrop-blur-md border-b border-slate-800"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'services', 'skills', 'projects', 'contact'].map((item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 text-gray-300 hover:text-[#2F73F2] capitalize font-medium"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </nav>

        <section id='home' className='min-h-screen flex items-center justify-center px-4 relative z-10'>
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Profile Photo - Replace the src with your photo path */}
              <motion.div
                className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden border-4 border-[#2F73F2] shadow-2xl relative"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(47, 115, 242, 0.4)",
                    "0 0 40px rgba(249, 199, 143, 0.6)",
                    "0 0 20px rgba(47, 115, 242, 0.4)",
                  ],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Image
                  src="/profile-photo.jpg" // Replace this with your photo
                  alt="Ojehonmon Israel"
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
                {/* Fallback gradient if no image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2F73F2] to-[#f9c78f] flex items-center justify-center text-4xl font-bold text-white -z-10">
                  OI
                </div>
              </motion.div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Frontend
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2F73F2] to-[#f9c78f]">
                {' '}Developer
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              I craft beautiful, responsive web applications using modern technologies.
              Passionate about creating exceptional user experiences.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.button
                onClick={() => scrollToSection('projects')}
                className="bg-[#2F73F2] hover:bg-[#2F73F2]/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-[#2F73F2]/30"
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(47, 115, 242, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                View My Work
              </motion.button>
              <motion.button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-[#2F73F2] text-[#2F73F2] hover:bg-[#2F73F2] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </motion.div>

            {/* Floating Arrow */}
            <motion.div
              className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-[#2F73F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </section>

        <section id="about" className="py-20 px-4 bg-[#0f172a]/50 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              About <span className="text-[#2F73F2]">Me</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  I&apos;m a passionate frontend developer with 1+ years of experience creating
                  modern web applications. I love turning complex problems into simple,
                  beautiful designs.
                </p>
                <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                  When I&apos;m not coding, you can find me exploring new technologies,
                  contributing to open source projects, or sharing knowledge with the
                  developer community.
                </p>
                <div className="flex space-x-4">
                  <motion.a
                    href="#"
                    className="text-[#2F73F2] hover:text-[#f9c78f] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-[#2F73F2] hover:text-[#f9c78f] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </motion.a>
                  <motion.a
                    href="#"
                    className="text-[#2F73F2] hover:text-[#f9c78f] transition-colors"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700 shadow-xl"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
                whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(47, 115, 242, 0.2)" }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Quick Facts</h3>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <span className="text-2xl mr-3">💼</span>
                    <span className="text-gray-300">1+ Years Experience</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="text-2xl mr-3">🎓</span>
                    <span className="text-gray-300">Computer Science Degree</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-2xl mr-3">☕</span>
                    <span className="text-gray-300">Coffee Enthusiast</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white mb-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              What I <span className="text-[#2F73F2]">Do</span>
            </motion.h2>
            <motion.p
              className="text-gray-400 text-center mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              I specialize in building modern, responsive web applications with clean code and exceptional user experiences
            </motion.p>

            <motion.div
              className="grid md:grid-cols-2 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {[
                {
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  ),
                  title: "Web Development",
                  description: "Building responsive, fast, and SEO-friendly websites using modern frameworks like Next.js and React."
                },
                {
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  ),
                  title: "UI/UX Implementation",
                  description: "Transforming designs into beautiful, intuitive, and accessible user interfaces."
                },
                {
                  icon: (
                    <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  ),
                  title: "API Integration",
                  description: "Connecting applications with RESTful APIs and modern backend services seamlessly."
                }
              ].map((service, index) => (
                <motion.div
                  key={index}
                  className="bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-8 border border-slate-700 hover:border-[#2F73F2] transition-all duration-300 shadow-md group"
                  variants={fadeInUp}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(47, 115, 242, 0.2)"
                  }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#2F73F2] to-[#f9c78f] flex items-center justify-center text-white mb-6"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">{service.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-20 px-4 bg-[#0f172a]/50 relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={staggerContainer}
            >
              {[
                { number: "5+", label: "Projects Completed", icon: "📁" },
                { number: "1+", label: "Years Experience", icon: "💼" },
                { number: "7+", label: "Technologies", icon: "⚡" },
                { number: "100%", label: "Client Satisfaction", icon: "😊" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  variants={scaleIn}
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="text-5xl mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#2F73F2] to-[#f9c78f] mb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-gray-400 font-medium">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section id='skills' className='py-20 px-4 relative z-10'>
          <div className='max-w-6xl mx-auto'>
            <motion.h2
              className='text-4xl font-bold text-white mb-12 text-center'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              My <span className="text-[#2F73F2]">Skills</span>
            </motion.h2>
            <motion.div
              className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8'
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={staggerContainer}
            >
              {skills.map((skill, index) => {
                // Icon SVGs for each technology
                const getIcon = (name: string) => {
                  switch (name.toLowerCase()) {
                    case 'javascript':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <rect width="256" height="256" rx="28" fill="#F7DF1E" />
                          <path d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574" fill="#000" />
                        </svg>
                      );
                    case 'typescript':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <rect width="256" height="256" rx="28" fill="#3178C6" />
                          <path d="M56.612 128.85h33.441v94.369h28.284v-94.369h33.522v-24.795h-95.246v24.795zm106.531-24.795v94.369h28.284v-94.369h33.522v-24.795h-95.246v24.795h33.441z" fill="#fff" />
                          <path d="M145.336 106.338h28.284v94.369h-28.284z" fill="#fff" />
                        </svg>
                      );
                    case 'tailwind css':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <g clipPath="url(#clip0)">
                            <path d="M128.001 32C92.445 32 71.111 49.778 64.001 85.333c10.667-17.777 23.111-24.444 37.334-20 8.107 2.027 13.898 7.902 20.308 14.419C131.586 89.92 143.328 101.333 176.001 101.333c35.556 0 56.889-17.778 64-53.333-10.667 17.778-23.111 24.444-37.334 20-8.107-2.027-13.898-7.902-20.308-14.42C172.416 43.414 160.674 32 128.001 32zM64.001 101.333C28.445 101.333 7.111 119.111 0 154.667c10.667-17.778 23.111-24.445 37.334-20 8.107 2.026 13.898 7.901 20.308 14.419 9.942 10.166 21.684 21.58 54.358 21.58 35.556 0 56.889-17.778 64-53.334-10.667 17.778-23.111 24.445-37.334 20-8.107-2.026-13.898-7.901-20.308-14.419C108.416 112.746 96.674 101.333 64.001 101.333z" fill="#06B6D4" />
                          </g>
                          <defs>
                            <clipPath id="clip0">
                              <rect width="256" height="256" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      );
                    case 'supabase':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <path d="M149.6 226.4c-6.4 7.2-18.4 3.2-18.4-6.4V99.2h110.4c12 0 18.4 14.4 10.4 23.2l-102.4 104z" fill="url(#paint0_linear)" />
                          <path d="M106.4 29.6c6.4-7.2 18.4-3.2 18.4 6.4V156.8H14.4c-12 0-18.4-14.4-10.4-23.2l102.4-104z" fill="#3ECF8E" fillOpacity="0.2" />
                          <defs>
                            <linearGradient id="paint0_linear" x1="124.8" y1="99.2" x2="231.2" y2="99.2" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#3ECF8E" />
                              <stop offset="1" stopColor="#3ECF8E" stopOpacity="0.5" />
                            </linearGradient>
                          </defs>
                        </svg>
                      );
                    case 'git':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <path d="M251.172 116.594L139.4 4.828c-6.433-6.437-16.873-6.437-23.314 0l-23.21 23.21 29.443 29.443c6.842-2.312 14.688-.761 20.142 4.693 5.48 5.489 7.02 13.402 4.652 20.266l28.375 28.376c6.865-2.365 14.786-.835 20.269 4.657 7.663 7.66 7.663 20.075 0 27.74-7.665 7.666-20.08 7.666-27.749 0-5.764-5.77-7.188-14.235-4.27-21.336l-26.462-26.462-.003 69.637a19.82 19.82 0 015.188 3.71c7.663 7.66 7.663 20.076 0 27.747-7.665 7.662-20.086 7.662-27.74 0-7.663-7.671-7.663-20.086 0-27.746a19.654 19.654 0 016.421-4.281V94.196a19.378 19.378 0 01-6.421-4.281c-5.806-5.798-7.202-14.317-4.227-21.446L81.47 39.442l-76.64 76.635c-6.44 6.443-6.44 16.884 0 23.322l111.774 111.768c6.435 6.438 16.873 6.438 23.316 0l111.251-111.249c6.438-6.44 6.438-16.887 0-23.324" fill="#DE4C36" />
                        </svg>
                      );
                    case 'github':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <path d="M128 0C57.3 0 0 57.3 0 128c0 56.6 36.7 104.5 87.5 121.5 6.4 1.2 8.7-2.8 8.7-6.2 0-3-.1-11.1-.2-21.8-35.6 7.7-43.1-17.2-43.1-17.2-5.8-14.8-14.2-18.7-14.2-18.7-11.6-7.9.9-7.7.9-7.7 12.8.9 19.5 13.1 19.5 13.1 11.4 19.5 29.9 13.9 37.1 10.6 1.2-8.3 4.5-13.9 8.1-17.1-28.3-3.2-58.1-14.2-58.1-63.1 0-13.9 5-25.3 13.1-34.2-1.3-3.2-5.7-16.2 1.2-33.7 0 0 10.7-3.4 35 13 10.2-2.8 21-4.2 31.8-4.3 10.8.1 21.6 1.5 31.8 4.3 24.3-16.4 35-13 35-13 6.9 17.5 2.5 30.5 1.2 33.7 8.2 8.9 13.1 20.3 13.1 34.2 0 49-29.8 59.8-58.2 62.9 4.6 4 8.7 11.8 8.7 23.8 0 17.2-.2 31.1-.2 35.3 0 3.4 2.3 7.4 8.8 6.2C219.3 232.5 256 184.6 256 128 256 57.3 198.7 0 128 0z" fill="#ffffff" />
                        </svg>
                      );
                    case 'firebase':
                      return (
                        <svg className="w-16 h-16" viewBox="0 0 256 256" fill="none">
                          <path d="M46.08 145.84l29.12-185.28c.96-6.08 9.28-8 12.8-2.88l24 35.2-65.92 152.96z" fill="#FFC24A" />
                          <path d="M173.28 23.68l-29.44-23.04c-4.16-3.2-10.08-.96-11.52 4.48L46.08 145.84l82.24 101.76 98.56-54.4-53.6-169.52z" fill="#FFA712" />
                          <path d="M228.88 193.2l-98.56 54.4-82.24-101.76L75.2 36.64c1.92-3.84 7.04-4.16 9.6-.96l144.08 157.52z" fill="#F4BD62" />
                          <path d="M128.32 247.6L46.08 145.84 18.72 164c-5.12 3.52-5.44 10.88-.64 14.72l110.24 76.48c3.52 2.4 8.16 2.4 11.68 0l110.24-76.48c4.8-3.84 4.48-11.2-.64-14.72l-121.28-16z" fill="#FFA712" />
                        </svg>
                      );
                    default:
                      return null;
                  }
                };

                return (
                  <motion.div
                    key={index}
                    className='bg-[#1e293b]/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700 hover:border-[#2F73F2] transition-all duration-300 flex flex-col items-center justify-center text-center group'
                    variants={fadeInUp}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px rgba(47, 115, 242, 0.2)",
                      y: -5
                    }}
                  >
                    <motion.div
                      className="mb-4"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {getIcon(skill.name)}
                    </motion.div>
                    <span className='text-white font-semibold text-sm mb-2'>{skill.name}</span>
                    <div className='w-full bg-slate-800 rounded-full h-2 overflow-hidden'>
                      <motion.div
                        className='bg-gradient-to-r from-[#2F73F2] to-[#f9c78f] h-2 rounded-full'
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
                      />
                    </div>
                    <motion.span
                      className='text-[#2F73F2] font-bold text-xs mt-1'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.3 }}
                    >
                      {skill.level * 10}%
                    </motion.span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section id="projects" className="py-20 px-4 bg-[#0f172a]/30 relative z-10">
          <div className="max-w-7xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Featured <span className="text-[#2F73F2]">Projects</span>
            </motion.h2>

            <motion.div
              className="grid md:grid-cols-2 gap-8 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer}
            >
              {project.map((proj, index) => (
                <motion.div
                  key={proj.id}
                  className="bg-[#1e293b]/50 backdrop-blur-sm h-full rounded-lg overflow-hidden border border-slate-700 hover:border-[#2F73F2] transition-all duration-300 shadow-md group"
                  variants={scaleIn}
                  whileHover={{
                    y: -10,
                    boxShadow: "0 20px 40px rgba(47, 115, 242, 0.2)"
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="h-48 bg-gradient-to-br from-[#2F73F2]/10 to-[#f9c78f]/10 flex items-center justify-center relative overflow-hidden group">
                    <Image
                      src={proj.image_url || "/placeholder.png"}
                      alt={proj.title}
                      width={400}
                      height={192}
                      className="object-cover h-full w-full group-hover:scale-110 transition-transform duration-500"
                      priority
                    />
                    <div className="absolute inset-0 bg-[#2F73F2]/0 group-hover:bg-[#2F73F2]/10 transition-colors duration-300" />
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{proj.title}</h3>
                    <p className="text-gray-400 mb-4 line-clamp-3">{proj.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {proj.tech_stack?.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          className="bg-[#2F73F2]/20 text-[#2F73F2] px-3 py-1 rounded-full text-sm font-medium"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex space-x-4">
                      <motion.a
                        href={proj.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F73F2] hover:text-[#f9c78f] transition-colors"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </motion.a>
                      <motion.a
                        href={proj.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2F73F2] hover:text-[#f9c78f] transition-colors"
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </motion.a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              className="text-4xl font-bold text-white mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
            >
              Get In <span className="text-[#2F73F2]">Touch</span>
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Work Together</h3>
                <p className="text-gray-400 mb-6 leading-relaxed">
                  I&apos;m always interested in new opportunities and exciting projects.
                  Whether you have a question or just want to say hi, I&apos;ll get back to you!
                </p>
                <div className="space-y-4">
                  <motion.div
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2F73F2]/20 flex items-center justify-center mr-3 group-hover:bg-[#2F73F2]/30 transition-colors">
                      <svg className="w-5 h-5 text-[#2F73F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">ojehonmonisrael008@gmail.com</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2F73F2]/20 flex items-center justify-center mr-3 group-hover:bg-[#2F73F2]/30 transition-colors">
                      <svg className="w-5 h-5 text-[#2F73F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">+234 906 579 8272</span>
                  </motion.div>

                  <motion.div
                    className="flex items-center group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#2F73F2]/20 flex items-center justify-center mr-3 group-hover:bg-[#2F73F2]/30 transition-colors">
                      <svg className="w-5 h-5 text-[#2F73F2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="text-gray-300">Lagos, Nigeria</span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.form
                className="space-y-6"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2F73F2] focus:ring-2 focus:ring-[#2F73F2]/20 transition-all"
                  />
                  <ValidationError
                    prefix='Name'
                    field='name'
                    errors={state.errors} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <input
                    type="email"
                    name='email'
                    required
                    placeholder="Your Email"
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2F73F2] focus:ring-2 focus:ring-[#2F73F2]/20 transition-all"
                  />
                  <ValidationError
                    prefix='Email'
                    field='email'
                    errors={state.errors} />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <textarea
                    rows={4}
                    name="message"
                    placeholder="Your Message"
                    required
                    className="w-full bg-[#1e293b] border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#2F73F2] focus:ring-2 focus:ring-[#2F73F2]/20 transition-all resize-none"
                  />
                  <ValidationError
                    prefix="Message"
                    field="message"
                    errors={state.errors}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-[#2F73F2] hover:bg-[#2F73F2]/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg shadow-[#2F73F2]/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(47, 115, 242, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-slate-800 bg-[#030712] relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              className="text-gray-400"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              © 2025 Ojehonmon Israel. Built with Next.js, TypeScript, and Tailwind CSS.
            </motion.p>
          </div>
        </footer>

        {/* Back to Top Button */}
        {scrollProgress > 20 && (
          <motion.button
            onClick={() => scrollToSection('home')}
            className="fixed bottom-8 right-8 z-50 bg-[#2F73F2] hover:bg-[#2F73F2]/90 text-white p-3 rounded-full shadow-lg shadow-[#2F73F2]/40 transition-colors"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </motion.button>
        )}
      </div>
    </>
  );
}