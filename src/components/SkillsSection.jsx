import React, { useLayoutEffect, useRef, useState, useEffect, useCallback } from 'react';
import { Server, Layout, Cloud, Users } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Create a global event system for ScrollTrigger refreshes
const refreshEvent = new CustomEvent('refreshSkillsSection');

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const accordionsRef = useRef(null);
  const accordionRefs = useRef([]);
  const timelineRef = useRef(null);
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
    const ctx = gsap.context(() => {
      if (!isReady || !sectionRef.current || !accordionsRef.current) return;

      // Create a marker for the scroll position
      const marker = gsap.to({}, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "+=800",
          onToggle: (self) => {
            if (self.isActive && !timelineRef.current) {
              initAnimations();
            }
          }
        }
      });

      return () => {
        marker.kill();
      };
    });

    return () => ctx.revert();
  }, [isReady]);

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);


  return (
    <div ref={sectionRef} className="w-full py-24 -mt-32 relative -z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div ref={accordionsRef} className="grid grid-cols-2 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              ref={el => (accordionRefs.current[index] = el)}
              className="rounded-xl bg-gray-800 p-8 shadow-lg 
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

// Export the refresh event so other components can trigger it
export const refreshSkillsSection = () => {
  window.dispatchEvent(refreshEvent);
};

export default SkillsSection;