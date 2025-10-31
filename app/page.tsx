"use client";
import React, {useState, useEffect} from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {useForm, ValidationError} from '@formspree/react'
import { Github, Globe } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { error } from 'console';


interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  image?: string
  github?: string
  demo?: string
}

interface Projects{
  id: string;
  title: string;
  description: string;
  image_url: string;
  tech_stack: string[];
  live_url?: string;
  github_url?: string;
}

interface Skill{
  name: string;
  level: number;
}


export default function Home() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const[project, setProject] = useState<Projects[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    const fetchProjects = async() =>{
     
      try{
        const {data, error} = await supabase.from("projects")
        .select("*")
        .order("created_at", {ascending:false})

       if (!error) setProject(data || []);
      setLoading(false);
       
      } catch(err){
        console.error("Unable to fetch data:", err)

      }finally{
        setLoading(false)
      }
    }
    fetchProjects();
  },[])

 
  const skills: Skill[] = [
    { name: "JavaScript", level: 8 },
    { name: "TypeScript", level: 7 },
    { name: "Next.js", level: 8 },
    { name: "Tailwind CSS", level: 7 },
   
    { name: "firebase", level: 6 },
  
    { name: "Git", level: 8 },
    { name: "CSS", level: 7 },
    { name: "HTML", level: 8 }
  ]

  useEffect (() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills' ,'projects' ,'contacts'];
      const current = sections.find(section =>{
        const element = document.getElementById(section)
        if (element){
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100

        }
        return false;

      })
      if (current) {
        setActiveSection(current);
      }
    }
    window.addEventListener('scroll' , handleScroll);
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element){
      element.scrollIntoView({behavior: 'smooth'})
    }
    setIsMenuOpen(false)
  }

  const router = useRouter()

  const [state, handleSubmit] = useForm('mzzvpgjq')
    if (state.succeeded) {
      useEffect(() => {
        const timer = setTimeout(() => {
          router.back()
        }, 2000);

        return () => clearTimeout(timer)
      },[router])
      
      return(
        <div className=' h-screen flex gap-3 flex-col items-center justify-center p-3'>
            <div className='bg-white  p-6 text-center  justify-center  justify-center align-center rounded-lg shadow-lg'>
           
              <Image className='mx-auto' src={'/icons8-check-50 (1).png'} alt=''width={40} height={40} />
                 <p className='text-black font-bold text-[26px]  '>Thank you for Reaching Out</p>
                 <p className='text-black font-semibold'>We Will Get Back Soon</p>
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

      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
         <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="text-2xl font-bold text-white">
                <span className="text-purple-400">{'<'}</span>
                Ojehonmon Israel
                <span className="text-purple-400">{'/>'}</span>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-8">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className={`capitalize transition-colors duration-300 hover:text-purple-400 ${
                      activeSection === item ? 'text-purple-400' : 'text-white'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-white"
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
            <div className="md:hidden bg-black/90 backdrop-blur-md">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {['home', 'about', 'skills', 'projects', 'contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item)}
                    className="block w-full text-left px-3 py-2 text-white hover:text-purple-400 capitalize"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}
        </nav>

          <section id='home' className='min-h-screen flex items-center justify-center px-4'>
            <div className="text-center max-w-4xl mx-auto">
            <div className="mb-8">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-white">
                OI
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Frontend
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                {' '}Developer
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              I craft beautiful, responsive web applications using modern technologies. 
              Passionate about creating exceptional user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Get In Touch
              </button>
            </div>
          </div>
          </section>

           <section id="about" className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">About Me</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-gray-300 text-lg mb-6">
                  I&apos;m a passionate frontend developer with 5+ years of experience creating 
                  modern web applications. I love turning complex problems into simple, 
                  beautiful designs.
                </p>
                <p className="text-gray-300 text-lg mb-6">
                  When I&apos;m not coding, you can find me exploring new technologies, 
                  contributing to open source projects, or sharing knowledge with the 
                  developer community.
                </p>
                <div className="flex space-x-4">
                  <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </Link>
                  <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </Link>
                  <Link href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
                <h3 className="text-2xl font-bold text-white mb-4">Quick Facts</h3>
                <div className="space-y-3">
                 {/*  <div className="flex items-center">
                    <span className="text-purple-400 mr-3">📍</span>
                    <span className="text-gray-300">Based in Lagos, Nigeria</span>
                  </div> */}
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-3">💼</span>
                    <span className="text-gray-300">1+ Years Experience</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-3">🎓</span>
                    <span className="text-gray-300">Computer Science Degree</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-purple-400 mr-3">☕</span>
                    <span className="text-gray-300">Coffee Enthusiast</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section id='skills' className='py-20 px-4 bg-black/20'>
           <div className='max-w-4xl mx-auto'>
             <h2 className='text-4xl font-bold text-white mb-12 text-center'>Skill</h2>    
             <div className='grid md:grid-cols-2 gap-6'>
               {skills.map((skill, index)=>(
                <div key={index} className='bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20'>
                  <div className='flex justify-between items-center mb-2'>
                    <span className='text-white font-semibold'>{skill.name}</span>
                    <span className='text-purple-400'>{skill.level}/10</span>
                  </div>
                  <div className='w-full bg-gray-700 rounded-full h-2'>
                    <div className='bg-gradient-to-r from-purple-500- to-pink-500 h-2 rounded-full transition-all duration-1000' 
                    style={{width: `${skill.level}/10`}} />
                  </div>
                </div>
               ))}   
             </div>  
           </div>        
        </section>

        <section id="projects" className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Featured Projects</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
              {project.map((project) => (
  <div
    key={project.id}
    className="bg-white/10 h-full backdrop-blur-sm rounded-lg overflow-hidden border border-white/20 hover:border-purple-400/50 transition-all duration-300 transform hover:scale-105"
  >
    <div className="h-64 bg-gradient-to-br from-purple-400/20 to-pink-400/20 flex items-center justify-center">
      <Image
        src={project.image_url || "/placeholder.png"}
        alt={project.title}
        width={400}
        height={192}
        className="object-cover h-full w-full"
        priority
      />
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description} </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech_stack?.map((tech, index) => (
          <span
            key={index}
            className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm"
          >
            {tech}
          </span>
        ))}
      </div>
       <div className="flex space-x-4">
                      <a href={project.github_url} className="text-purple-400 hover:text-purple-300 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                      </a>
                      <a href={project.live_url} className="text-purple-400 hover:text-purple-300 transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                    <div className='hidden'>{project.id}</div>
    </div>
  </div>
))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-4 bg-black/20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-12 text-center">Get In Touch</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Let&apos;s Work Together</h3>
                <p className="text-gray-300 mb-6">
                  I&apos;m always interested in new opportunities and exciting projects. 
                  Whether you have a question or just want to say hi, I&apos;ll get back to you!
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-300">ojehonmonisrael008@gmail.com</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-300">+234 906 579 8272</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-purple-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-300">Lagos, Nigeria</span>
                  </div>
                </div>
              </div>
              <form className="space-y-6"
               onSubmit={handleSubmit}
                >
                <div>
                  <input
                    type="text"
                    
                    required
                    placeholder="Your Name"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                  <ValidationError 
                  prefix='Name'
                  field='name'
                  errors={state.errors} />
                </div>
                <div>
                  <input
                    type="email"
                    
                    name='email'
                    required
                    placeholder="Your Email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                    <ValidationError 
                  prefix='Email'
                  field='email'
                  errors={state.errors} />
                </div>
                <div>
                  <textarea
                    rows={4}
                    name="message" // <-- Add this
                    
                    placeholder="Your Message"
                    required
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                  />
                   <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
      />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-4 border-t border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-gray-400">
              © 2025 Ojehonmon Israel. Built with Next.js, TypeScript, and Tailwind CSS.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}