import React, { useLayoutEffect, useRef, useState } from 'react';
import { Server, Layout, Cloud, Users } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const accordionsRef = useRef(null);
  const accordionRefs = useRef([]);
  const [isReady, setIsReady] = useState(false);

  const skillsData = [
    {
      title: "Backend Development",
      icon: Server,
      text: "Experienced in building robust server-side applications using Node.js, Python, and SQL/NoSQL databases. Proficient in RESTful API design and microservices architecture.",
      iconContainer: "future-icons-here-1"
    },
    {
      title: "Frontend Development",
      icon: Layout,
      text: "Skilled in modern frontend frameworks like React and Next.js. Experienced with state management, responsive design, and creating engaging user interfaces.",
      iconContainer: "future-icons-here-2"
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      text: "Proficient in AWS services, Docker containerization, and CI/CD pipelines. Experienced in infrastructure as code and automated deployment workflows.",
      iconContainer: "future-icons-here-3"
    },
    {
      title: "Team Collaboration",
      icon: Users,
      text: "Strong communicator and team player with experience in Agile methodologies. Proven track record of successful project delivery and mentoring junior developers.",
      iconContainer: "future-icons-here-4"
    }
  ];

  useLayoutEffect(() => {
    if (!isReady) return; // Prevent animations from running until ready

    const ctx = gsap.context(() => {
      const container = accordionsRef.current;
      const accordions = accordionRefs.current;
      
      // Initial state setup
      gsap.set(container, { y: -350, opacity: 0.1 });
      
      accordions.forEach(accordion => {
        gsap.set(accordion, {
          height: "5rem",
          marginBottom: "-4.5rem",
          opacity: 0.1,
        });
        
        const content = accordion.querySelector('.accordion-content');
        gsap.set(content, { opacity: 0 });
      });

      // Create timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "+=800",
          scrub: 1,
        }
      });

      // Initial movement and fade-in
      tl.to([container, accordions], {
        opacity: 1,
        duration: 0.5,
        ease: "none",
      })
        .to(container, {
          y: 0,
          duration: 0.5,
          ease: "none",
        }, "<");

      // Expand accordions
      accordions.forEach((accordion, index) => {
        const content = accordion.querySelector('.accordion-content');
        const fullHeight = content.scrollHeight + 80;

        const startPosition = 0.25 + index * 0.2;

        tl.to(accordion, {
          height: fullHeight,
          marginBottom: "1.5rem",
          duration: 0.5,
          ease: "none",
        }, startPosition);

        tl.to(content, {
          opacity: 1,
          duration: 0.3,
          ease: "none",
        }, startPosition + 0.05);
      });
    }, sectionRef);

    ScrollTrigger.refresh(); // Refresh after setup

    return () => ctx.revert(); // Cleanup
  }, [isReady]); // Run animation only when `isReady` is true

  useLayoutEffect(() => {
    // Delay to ensure DOM is fully rendered before initializing animations
    const timeout = setTimeout(() => {
      setIsReady(true); // Trigger GSAP initialization
    }, 100);

    return () => clearTimeout(timeout); // Cleanup timeout on unmount
  }, []);

  return (
    <div ref={sectionRef} className="w-full py-24 -mt-32 relative -z-10">
      <div className="max-w-4xl mx-auto px-6">
        <div ref={accordionsRef} className="relative space-y-0">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              ref={el => (accordionRefs.current[index] = el)}
              className="rounded-xl bg-gray-800/50 backdrop-blur-sm p-8 shadow-lg 
                transition-all duration-300 ease-in-out border border-transparent 
                hover:border-purple-500/50 relative overflow-hidden group"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
              }}
            >
              <div className="accordion-title flex items-center gap-4">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <skill.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
              </div>
              
              <div className="accordion-content mt-4 space-y-4">
                <p className="text-gray-300">{skill.text}</p>
                <div className="h-16 flex items-center justify-center">
                  <div className="text-gray-500">{skill.iconContainer}</div>
                </div>
              </div>

              <div className="absolute inset-0 border border-purple-500/20 rounded-xl 
                group-hover:border-purple-500/50 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 
                  to-blue-500/10 rounded-xl blur-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
