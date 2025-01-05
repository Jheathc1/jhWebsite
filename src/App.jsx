import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import "./styles/App.css";
import portPhoto from "./assets/portPhoto.jpeg";
import { GitHub, Linkedin, Mail, FileText } from "react-feather";
import resumePDF from "./assets/jacob_heathcoat_resume.pdf";
import PDFViewer from "./components/PDFViewer";
import CareerSection from "./components/CareerSection";
import SkillsSection from './components/SkillsSection';
import RaindropTransition from "./components/RaindropTransition";

const App = () => {
  const gridRef = useRef(null);
  const contentRef = useRef(null);
  const gradientTextRef = useRef(null);
  const orbGlowRef = useRef(null);
  const orbInnerRef = useRef(null);
  const [isOrbActive, setIsOrbActive] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPDFOpen, setIsPDFOpen] = useState(false);

  const gradients = [
    { from: "#FF6B6B", to: "#4ECDC4" },
    { from: "#A78BFA", to: "#EC4899" },
    { from: "#60A5FA", to: "#34D399" },
    { from: "#F59E0B", to: "#EC4899" },
  ];

  useEffect(() => {
    setIsLoaded(true);
    const grid = gridRef.current;
    const content = contentRef.current;
    const gradientText = gradientTextRef.current;

    // Initial animation
    gsap.fromTo(
      content,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );

    const handleMouseMove = (e) => {
      const rect = grid.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      gsap.to(grid, {
        "--mouse-x": `${x}%`,
        "--mouse-y": `${y}%`,
        "--gradient-angle": `${Math.atan2(y - 50, x - 50) * (180 / Math.PI)}deg`,
        duration: 0.5,
        ease: "power2.out",
      });

      if (gradientText) {
        const gradientAngle = Math.atan2(y - 50, x - 50) * (180 / Math.PI);
        gsap.to(gradientText, {
          "--gradient-angle": `${gradientAngle}deg`,
          duration: 0.5,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(grid, {
        "--mouse-x": "50%",
        "--mouse-y": "50%",
        "--gradient-angle": "0deg",
        duration: 0.6,
        ease: "power2.out",
      });

      if (gradientText) {
        gsap.to(gradientText, {
          "--gradient-angle": "0deg",
          duration: 0.6,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (orbGlowRef.current && orbInnerRef.current) {
      // glow effect
      gsap.to(orbGlowRef.current, {
        background: isOrbActive 
          ? 'linear-gradient(to right, rgb(192, 132, 252), rgb(236, 72, 153))'
          : 'rgb(75, 85, 99)',
        opacity: isOrbActive ? 0.5 : 0,
        scale: isOrbActive ? 1 : 0.95,
        duration: 1,
        ease: "power2.inOut"
      });

      // inner orb
      gsap.to(orbInnerRef.current, {
        background: isOrbActive 
          ? 'linear-gradient(to right, rgb(192, 132, 252), rgb(236, 72, 153))'
          : 'rgb(55, 65, 81)',
        scale: isOrbActive ? 1 : 0.95,
        duration: 1,
        ease: "power2.inOut"
      });
    }
  }, [isOrbActive]);

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Fixed background elements */}
      <div className="fixed inset-0">
        {/* Grid with mouse interaction */}
        <div
          ref={gridRef}
          className="absolute inset-0 bg-grid opacity-90 transition-opacity duration-500 z-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
            mask: "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 60%)",
            WebkitMask:
              "radial-gradient(circle at var(--mouse-x) var(--mouse-y), black 20%, transparent 60%)",
          }}
        />

        {/* Background gradient */}
        <div
          className="absolute inset-0 opacity-30 z-0"
          style={{
            background: `linear-gradient(var(--gradient-angle, 0deg), 
              rgba(147, 51, 234, 0.5),
              rgba(59, 130, 246, 0.5),
              rgba(236, 72, 153, 0.5)
            )`,
          }}
        />
      </div>

      {/* Scrollable content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div
          ref={contentRef}
          className={`container mx-auto px-6 py-32 transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex flex-col md:flex-row items-start gap-16 max-w-6xl mx-auto">
            {/* Left Side */}
            <div className="flex flex-col items-center md:items-start space-y-6">
              <div className="relative">
                <img
                  src={portPhoto}
                  alt="Portrait"
                  className="w-96 h-[500px] object-cover rounded-2xl shadow-xl"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-white/20" />
              </div>
            </div>

            {/* Right Side */}
            <div className="flex-1 text-center md:text-left space-y-8 pt-8">
              <div className="space-y-4">
                <h2 className="text-2xl text-white">
                  I'm Jacob Heathcoat, and I enjoy
                </h2>
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">
                  creating digital <br />
                  <span
                    ref={gradientTextRef}
                    className={`gradient-text transition-colors duration-300 ${
                      isOrbActive ? "text-transparent" : "text-white"
                    }`}
                    style={{
                      background: `linear-gradient(var(--gradient-angle, 45deg), ${gradients[0].from}, ${gradients[0].to})`,
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                    }}
                  >
                    experiences
                  </span>{" "}
                  <button
                    onClick={() => setIsOrbActive(!isOrbActive)}
                    className="relative inline-flex items-center justify-center w-10 h-10 focus:outline-none transform-gpu"
                  >
                    <div className="absolute w-full h-full">
                      <div
                        ref={orbGlowRef}
                        className="absolute inset-0 rounded-full blur-lg"
                      />
                      <div
                        ref={orbInnerRef}
                        className="absolute inset-2 rounded-full"
                      />
                    </div>
                  </button>
                </h1>
                <p className="text-3xl text-white font-medium mt-6">
                  Full-Stack Developer
                </p>
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-6 pt-8 relative z-10">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg backdrop-blur-sm bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg backdrop-blur-sm bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
                >
                  <GitHub className="w-6 h-6" />
                </a>
                <a
                  href="mailto:contact@example.com"
                  className="p-3 rounded-lg backdrop-blur-sm bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
                >
                  <Mail className="w-6 h-6" />
                </a>
                <button
                  onClick={() => setIsPDFOpen(true)}
                  className="p-3 rounded-lg backdrop-blur-sm bg-gray-800/80 hover:bg-gray-700/80 transition-colors"
                >
                  <FileText className="w-6 h-6" />
                </button>
                
                <PDFViewer
                  isOpen={isPDFOpen}
                  onClose={() => setIsPDFOpen(false)}
                  pdfUrl={resumePDF}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Career Section */}
        <CareerSection />
        {/* Skills Section */}
        <RaindropTransition />
      </div>
    </div>
  );
};

export default App;