import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import websiteImage from '../assets/icons/projectimages/websiteImage.png';
import appImage1 from '../assets/icons/projectimages/appImage1.png';
import appImage2 from '../assets/icons/projectimages/appImage2.png';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ProjectCard = ({ project }) => {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    let st;
    
    gsap.set(card, { opacity: 0, y: 50 });

    st = ScrollTrigger.create({
      trigger: card,
      start: 'top bottom-=100',
      end: 'top center',
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          onComplete: () => gsap.set(card, { clearProps: 'transform' }) // Only clear transform
        });
      },
      once: true,
      markers: false
    });

    return () => {
      if (st) st.kill();
    };
  }, []);

  const handleProjectClick = (url) => {
    if (url) {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  return (
    <div 
      ref={cardRef}
      className="rounded-xl bg-gray-800/80 backdrop-blur-sm p-8 relative overflow-hidden opacity-0"
      style={{
        boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
      }}
    >
      <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
        {project.images ? (
          // Split image layout
          <div className="flex gap-4 h-full">
            <div className="flex-1 relative">
              <img 
                src={project.images[0]}
                alt={`${project.title} - View 1`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="flex-1 relative">
              <img 
                src={project.images[1]}
                alt={`${project.title} - View 2`}
                className="w-full h-full object-cover rounded-lg transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        ) : (
          // Single image layout
          <img 
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800/90" />
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-white">{project.title}</h3>
        <p className="text-gray-300">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Links */}
        <div className="flex gap-4 pt-4 relative z-50">
          <a
            href={project.primaryLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-500 hover:bg-purple-600 text-white transition-all duration-200 cursor-pointer relative z-50"
          >
            <span>{project.primaryText}</span>
            <ArrowUpRight className="w-5 h-5" />
          </a>
          
          {project.showGithub && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-all duration-200 cursor-pointer relative z-50"
            >
              <Github className="w-5 h-5" />
              <span>View Code</span>
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 border border-purple-500/20 rounded-xl" />
    </div>
  );
};

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const projects = [
    {
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website built with React. Features smooth GSAP animations, interactive elements, and a dark theme interface.",
      image: websiteImage,
      technologies: ["React", "Tailwind CSS", "GSAP"],
      primaryLink: "https://jheathcoat.vercel.app/",
      githubLink: "https://github.com/Jheathc1/jhWebsite",
      showGithub: true,
      primaryText: "View Project"
    },
    {
      title: "Island of Shared Meaning",
      description: "A custom mobile therapy application developed through client consultation and requirement analysis. Built with React Native and SQL, providing specialized therapeutic tools and features.",
      images: [appImage1, appImage2],
      technologies: ["React Native", "SQL", "Javascript"],
      primaryLink: "https://apps.apple.com/us/app/island-of-shared-meaning/id6738144776",
      showGithub: false,
      primaryText: "View on App Store"
    }
  ];

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  useLayoutEffect(() => {
    if (!isReady) return;

    const ctx = gsap.context(() => {
      // Animate heading and description separately
      gsap.fromTo(
        [sectionRef.current.querySelector('.section-title'), sectionRef.current.querySelector('.section-description')],
        { 
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none none'
          }
        }
      );

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={sectionRef} className="w-full py-24 relative z-0">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <h2 className="section-title text-4xl font-bold text-white">Featured Projects</h2>
          <p className="section-description text-gray-400 font-bold mt-2">Here are some of the projects I've worked on</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-0">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;