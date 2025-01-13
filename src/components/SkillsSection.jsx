import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { Server, Layout, Cloud, Users } from 'lucide-react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Import backend icons
import GithubIcon from '../assets/icons/backend/GithubIcon.svg';
import GitIcon from '../assets/icons/backend/GitIcon.svg';
import JavaIcon from '../assets/icons/backend/JavaIcon.svg';
import JavascriptIcon from '../assets/icons/backend/JavascriptIcon.svg';
import MongoDBIcon from '../assets/icons/backend/MongoDBIcon.svg';
import NodejsIcon from '../assets/icons/backend/NodejsIcon.svg';
import PostgreSQLIcon from '../assets/icons/backend/PostgreSQLIcon.svg';
import PythonIcon from '../assets/icons/backend/PythonIcon.svg';
import TypescriptIcon from '../assets/icons/backend/TypescriptIcon.svg';

// Import frontend icons
import AngularIcon from '../assets/icons/frontend/AngularIcon.svg';
import FigmaVectorIcon from '../assets/icons/frontend/FigmaVectorIcon.svg';
import FlutterSVGIcon from '../assets/icons/frontend/FlutterSVGIcon.svg';
import ReactJSIcon from '../assets/icons/frontend/ReactJSIcon.svg';
import TailwindCSSIcon from '../assets/icons/frontend/TailwindCSSIcon.svg';
import Vue9Logo from '../assets/icons/frontend/Vue9Logo.svg';

// Import cloud icons
import AWSVectorIcon from '../assets/icons/cloud/AWSVectorIcon.svg';
import AzureDevOpsIcon from '../assets/icons/cloud/AzureDevOpsIcon.svg';
import DockerSVGIcon from '../assets/icons/cloud/DockerSVGIcon.svg';
import LinuxVectorIcon from '../assets/icons/cloud/LinuxVectorIcon.svg';
import VercelFillIcon from '../assets/icons/cloud/VercelFillIcon.svg';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Create a global event system for ScrollTrigger refreshes
const refreshEvent = new CustomEvent('refreshSkillsSection');

const IconWithTooltip = ({ src, alt }) => (
  <div className="relative inline-block group">
    <img
      src={src}
      alt={alt}
      className="w-8 h-8 object-contain hover:scale-110 transition-transform duration-200"
    />
    <div className="invisible group-hover:visible absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 
      bg-purple-600 text-white text-xs rounded-lg px-3 py-1.5 whitespace-nowrap z-50
      before:content-[''] before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 
      before:border-4 before:border-transparent before:border-t-purple-600">
      {alt}
    </div>
  </div>
);

const Rectangle = ({ label }) => (
  <div className="px-4 py-2 rounded bg-purple-500/20 text-purple-400 text-sm font-medium">
    {label}
  </div>
);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  const skillsData = [
    {
      title: "Backend Development",
      icon: Server,
      text: "Experienced in building robust server-side applications using Node.js, Python, and SQL/NoSQL databases. Proficient in RESTful API design.",
      icons: [
        { src: GithubIcon, alt: "Github" },
        { src: GitIcon, alt: "Git" },
        { src: JavaIcon, alt: "Java" },
        { src: JavascriptIcon, alt: "JavaScript" },
        { src: MongoDBIcon, alt: "MongoDB" },
        { src: NodejsIcon, alt: "Node.js" },
        { src: PostgreSQLIcon, alt: "PostgreSQL" },
        { src: PythonIcon, alt: "Python" },
        { src: TypescriptIcon, alt: "TypeScript" }
      ]
    },
    {
      title: "Frontend Development",
      icon: Layout,
      text: "Skilled in modern frontend frameworks like React and Next.js. Experienced with responsive design and creating engaging user interfaces.",
      icons: [
        { src: AngularIcon, alt: "Angular" },
        { src: FigmaVectorIcon, alt: "Figma" },
        { src: FlutterSVGIcon, alt: "Flutter" },
        { src: ReactJSIcon, alt: "React" },
        { src: TailwindCSSIcon, alt: "Tailwind CSS" },
        { src: Vue9Logo, alt: "Vue" }
      ]
    },
    {
      title: "Cloud & DevOps",
      icon: Cloud,
      text: "Proficient in AWS services, Docker containerization, and CI/CD pipelines. Experienced in automated deployment workflows.",
      icons: [
        { src: AWSVectorIcon, alt: "AWS" },
        { src: AzureDevOpsIcon, alt: "Azure" },
        { src: DockerSVGIcon, alt: "Docker" },
        { src: LinuxVectorIcon, alt: "Linux" },
        { src: VercelFillIcon, alt: "Vercel" }
      ]
    },
    {
      title: "Team Collaboration",
      icon: Users,
      text: "Strong communicator and team player with experience in Agile methodologies. Proven track record of successful project delivery.",
      rectangles: [
        { label: "Agile" },
        { label: "Scrum" },
        { label: "Jira" }
      ]
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
      const cards = gsap.utils.toArray('.skill-card');
      
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: 50 });
        
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom-=100',
            end: 'top center',
            toggleActions: 'play none none none'
          }
        });
      });

      ScrollTrigger.refresh();
    });

    return () => ctx.revert();
  }, [isReady]);

  return (
    <div ref={sectionRef} className="w-full py-24 -mt-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {skillsData.map((skill, index) => (
            <div
              key={index}
              className="skill-card relative w-full rounded-xl bg-gray-800/80 backdrop-blur-sm p-8 
                overflow-visible shadow-lg transform transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
              }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-lg bg-purple-500/20">
                  <skill.icon className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">{skill.title}</h3>
              </div>
              
              <p className="text-gray-300 mb-6">{skill.text}</p>
              
              <div className="flex flex-wrap gap-4 items-center justify-start relative z-10">
                {skill.icons ? (
                  skill.icons.map((icon, iconIndex) => (
                    <IconWithTooltip
                      key={iconIndex}
                      src={icon.src}
                      alt={icon.alt}
                    />
                  ))
                ) : skill.rectangles && (
                  skill.rectangles.map((rect, rectIndex) => (
                    <Rectangle
                      key={rectIndex}
                      label={rect.label}
                    />
                  ))
                )}
              </div>

              <div className="absolute inset-0 border border-purple-500/20 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const refreshSkillsSection = () => {
  window.dispatchEvent(refreshEvent);
};

export default SkillsSection;