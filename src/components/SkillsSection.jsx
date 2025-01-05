import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const containerRef = useRef(null);
  const backendRef = useRef(null);
  const frontendRef = useRef(null);
  const devopsRef = useRef(null);

  const skillSets = {
    backend: {
      title: 'Backend',
      description: 'I love problem-solving and building complex systems.',
      icons: Array(8).fill(null).map((_, i) => (
        <div key={i} className="p-4 bg-gray-800/50 rounded-lg w-16 h-16" />
      ))
    },
    frontend: {
      title: 'Frontend & Design',
      description: "I'm passionate about design, animation, and interactions.",
      icons: Array(8).fill(null).map((_, i) => (
        <div key={i} className="p-4 bg-gray-800/50 rounded-lg w-16 h-16" />
      ))
    },
    devops: {
      title: 'Cloud & DevOps',
      description: 'I have deployed and managed various applications.',
      icons: Array(8).fill(null).map((_, i) => (
        <div key={i} className="p-4 bg-gray-800/50 rounded-lg w-16 h-16" />
      ))
    }
  };

  useEffect(() => {
    const sections = [backendRef, frontendRef, devopsRef];
    
    sections.forEach((sectionRef, index) => {
      const iconsContainer = sectionRef.current.querySelector('.icons-container');
      const section = sectionRef.current;
      
      // Set initial state - icons off screen
      gsap.set(iconsContainer, { x: '100%' });

      // Create a timeline for each section
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: '+=150%',
          pin: true,
          scrub: 1,
          markers: true,
          anticipatePin: 1,
          pinSpacing: true,
        }
      });

      // Add horizontal scroll animation to timeline
      tl.to(iconsContainer, {
        x: 0,
        duration: 1,
        ease: 'none'
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="py-24">
      <div className="max-w-[2000px] mx-auto px-6" style={{ width: 'calc(500px + 1500px)' }}>
        {Object.entries(skillSets).map(([key, section], index) => (
          <div
            key={key}
            ref={index === 0 ? backendRef : index === 1 ? frontendRef : devopsRef}
            className="mb-96" // Increased vertical spacing between sections
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-white">{section.title}</h2>
              <p className="text-gray-400 text-lg mb-8">{section.description}</p>
              
              <div className="icons-container overflow-hidden">
                <div className="flex gap-4 py-8">
                  {section.icons}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsSection;