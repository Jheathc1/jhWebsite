import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const RaindropTransition = () => {
  const containerRef = useRef(null);
  const dropsContainerRef = useRef(null);
  const leftDropRef = useRef(null);
  const centerDropRef = useRef(null);
  const rightDropRef = useRef(null);
  const leftSplatRef = useRef(null);
  const centerSplatRef = useRef(null);
  const rightSplatRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    gsap.set([leftDropRef.current, centerDropRef.current, rightDropRef.current], {
      y: -50,
      opacity: 0
    });
    
    gsap.set([leftSplatRef.current, centerSplatRef.current, rightSplatRef.current], {
      opacity: 0,
      scale: 0,
      y: 100
    });

    const updateDropPositions = () => {
      const splats = [leftSplatRef.current, centerSplatRef.current, rightSplatRef.current];
      const drops = [leftDropRef.current, centerDropRef.current, rightDropRef.current];
      
      splats.forEach((splat, index) => {
        if (splat && drops[index]) {
          const splatRect = splat.getBoundingClientRect();
          const containerRect = dropsContainerRef.current.getBoundingClientRect();
          const leftPosition = splatRect.left - containerRect.left;
          drops[index].style.left = `${leftPosition}px`;
        }
      });
    };

    updateDropPositions();
    window.addEventListener('resize', updateDropPositions);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        end: "+=200",
        scrub: 0.5,
        markers: false,
      }
    });

    tl.to([leftDropRef.current, centerDropRef.current, rightDropRef.current], {
      opacity: 1,
      duration: 0.1
    })
    .to([leftDropRef.current, centerDropRef.current, rightDropRef.current], {
      y: 100,
      ease: "power2.in",
      duration: 0.7
    }, "<")
    .to([leftDropRef.current, centerDropRef.current, rightDropRef.current], {
      opacity: 0,
      scale: 0.5,
      duration: 0.1
    })
    .to([leftSplatRef.current, centerSplatRef.current, rightSplatRef.current], {
      opacity: 1,
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    })
    .to([leftSplatRef.current, centerSplatRef.current, rightSplatRef.current], {
      borderRadius: "12px",
      width: "450px",
      height: "200px",
      backgroundColor: "rgb(17, 24, 39)",  // bg-gray-900
      backdropFilter: "blur(4px)",
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to(".section-title", {
      opacity: 1,
      y: 0,
      duration: 0.3
    });

    return () => {
      window.removeEventListener('resize', updateDropPositions);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="h-[40vh] relative -mt-20"
      style={{ zIndex: -1 }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full">
        {/* Drops container */}
        <div ref={dropsContainerRef} className="relative w-full">
          {[leftDropRef, centerDropRef, rightDropRef].map((ref, index) => (
            <svg
              key={index}
              ref={ref}
              width="40"
              height="60"
              viewBox="0 0 40 60"
              className="absolute top-0"
              style={{
                transform: 'translate(-50%, -50%)',
              }}
            >
              <path
                d="M20 0 C20 0 40 30 40 45 C40 53.28 31.05 60 20 60 C8.95 60 0 53.28 0 45 C0 30 20 0 20 0Z"
                fill="rgb(17, 24, 39)"  // bg-gray-900
                style={{ filter: 'blur(0.5px)' }}
              />
            </svg>
          ))}
        </div>
        
        {/* Splats/containers */}
        <div className="flex justify-between px-20 absolute w-full" style={{ top: '100px' }}>
          <div 
            ref={leftSplatRef} 
            className="w-16 h-16 rounded-full relative"
            style={{ 
              backgroundColor: "rgb(17, 24, 39)",
              backdropFilter: "blur(4px)"
            }}
          >
            <div className="section-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl opacity-0">
              Backend
            </div>
          </div>

          <div 
            ref={centerSplatRef}
            className="w-16 h-16 rounded-full relative"
            style={{ 
              backgroundColor: "rgb(17, 24, 39)",
              backdropFilter: "blur(4px)"
            }}
          >
            <div className="section-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl opacity-0">
              Frontend
            </div>
          </div>

          <div 
            ref={rightSplatRef}
            className="w-16 h-16 rounded-full relative"
            style={{ 
              backgroundColor: "rgb(17, 24, 39)",
              backdropFilter: "blur(4px)"
            }}
          >
            <div className="section-title absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl opacity-0">
              Cloud/DevOps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RaindropTransition;