import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/dist/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);
}

const ConcentricCircles = ({ isActive }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!isActive || !svgRef.current) return;

    const totalLayers = 8;
    const baseRadius = 15;
    const radiusIncrement = 12;
    
    const colors = [
      '#C084FC',
      '#A855F7',
      '#9333EA',
      '#7E22CE',
      '#6B21A8',
      '#581C87',
      '#4C1D95',
      '#3B0764'
    ];

    const svg = svgRef.current;
    svg.innerHTML = '';

    // Create gradient
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    svg.appendChild(defs);

    for (let i = 0; i < totalLayers; i++) {
      const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      gradient.id = `trail-gradient-${i}`;
      gradient.innerHTML = `
        <stop offset="0%" stop-color="${colors[i]}" stop-opacity="1"/>
        <stop offset="50%" stop-color="${colors[i]}" stop-opacity="0.5"/>
        <stop offset="100%" stop-color="${colors[i]}" stop-opacity="0"/>
      `;
      defs.appendChild(gradient);
    }

    // master timeline
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: svg,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        markers: false
      }
    });

    // circles and animations
    for (let i = 0; i < totalLayers; i++) {
      const radius = baseRadius + (i * radiusIncrement);
      const dotsCount = i + 1;

      const circlePath = `M ${150 + radius} 150 A ${radius} ${radius} 0 1 1 ${150 - radius} 150 A ${radius} ${radius} 0 1 1 ${150 + radius} 150`;

      for (let j = 0; j < dotsCount; j++) {
        const startOffset = (i * 0.1) + (j * (1 / dotsCount));

        // trail path
        const trail = document.createElementNS("http://www.w3.org/2000/svg", "path");
        trail.setAttribute("stroke", `url(#trail-gradient-${i})`);
        trail.setAttribute("stroke-width", "8");
        trail.setAttribute("fill", "none");
        trail.setAttribute("stroke-linecap", "round");
        trail.style.filter = "brightness(1.5)";
        svg.appendChild(trail);

        // animation function
        const updatePath = (progress) => {
          const currentAngle = (startOffset + progress) * Math.PI * 2;
          const trailStartAngle = currentAngle - 1;
          
          const getPoint = (angle) => ({
            x: 150 + radius * Math.cos(angle),
            y: 150 + radius * Math.sin(angle)
          });

          const start = getPoint(trailStartAngle);
          const end = getPoint(currentAngle);
          
          trail.setAttribute("d", `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${
            (currentAngle - trailStartAngle > Math.PI) ? 1 : 0
          } 1 ${end.x} ${end.y}`);
        };

        // Initial position
        updatePath(0);

        // Add to master timeline
        masterTimeline.to({}, {
          progress: 1,
          duration: 1,
          ease: "none",
          onUpdate: function() {
            updatePath(this.progress());
          }
        }, 0);
      }
    }

    return () => {
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf("*");
    };
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 300 300"
        className="w-full h-full"
        style={{ maxWidth: '250px', maxHeight: '250px' }}
      />
    </div>
  );
};

export default ConcentricCircles;