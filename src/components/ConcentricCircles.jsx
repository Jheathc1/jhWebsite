import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const ConcentricCircles = ({ isActive, isTransitioning, tabDirection }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  // Handle spin animation on tab change
  useEffect(() => {
    if (isTransitioning && svgRef.current) {
      const direction = tabDirection === 'career' ? 360 : -360;
      gsap.to(svgRef.current, {
        rotation: `+=${direction}`,
        duration: 0.8,
        ease: "power2.inOut"
      });
    }
  }, [isTransitioning, tabDirection]);

  useEffect(() => {
    // Cleanup function for previous animations
    const cleanupAnimations = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === svgRef.current) {
          st.kill();
        }
      });
    };

    // Initialize the animation
    const initAnimation = () => {
      if (!svgRef.current) return;

      cleanupAnimations();

      const totalLayers = 8;
      const baseRadius = 20;
      const radiusIncrement = 15;
      const centerCircleRadius = 8;
      const SVG_CENTER = 200;
      
      const colorPalette = {
        whites: ['#F8FAFC', '#F1F5F9', '#E2E8F0'],
        blues: ['#DBEAFE', '#93C5FD', '#3B82F6', '#1D4ED8'],
        purples: ['#F3E8FF', '#C084FC', '#7E22CE', '#581C87'],
        indigos: ['#EEF2FF', '#818CF8', '#4F46E5', '#3730A3']
      };

      const getRandomColorSet = () => {
        const getRandomFromArray = (arr) => arr[Math.floor(Math.random() * arr.length)];
        return [
          getRandomFromArray([...colorPalette.whites, ...colorPalette.blues.slice(0, 2)]),
          getRandomFromArray([...colorPalette.blues.slice(1), ...colorPalette.purples.slice(1)]),
          getRandomFromArray([...colorPalette.purples.slice(2), ...colorPalette.indigos.slice(2)])
        ];
      };

      const getTrailCount = (layerIndex) => {
        if (layerIndex <= 2) return 2 + layerIndex;
        return 1 + layerIndex;
      };

      const getLayerProperties = (layerIndex) => {
        const direction = layerIndex % 2 === 0 ? 1 : -1;
        const speedMultiplier = 1 + (totalLayers - layerIndex) * 0.2;
        return { direction, speedMultiplier };
      };

      const svg = svgRef.current;
      svg.innerHTML = '';

      const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
      svg.appendChild(defs);

      // Center circle gradient
      const centerGradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
      centerGradient.id = `center-gradient-${Math.random()}`;
      centerGradient.innerHTML = `
        <stop offset="0%" stop-color="${colorPalette.whites[0]}" />
        <stop offset="50%" stop-color="${colorPalette.blues[2]}" />
        <stop offset="100%" stop-color="${colorPalette.purples[2]}" />
      `;
      defs.appendChild(centerGradient);

      const centerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      centerCircle.setAttribute("cx", String(SVG_CENTER));
      centerCircle.setAttribute("cy", String(SVG_CENTER));
      centerCircle.setAttribute("r", String(centerCircleRadius));
      centerCircle.setAttribute("fill", `url(#${centerGradient.id})`);
      centerCircle.style.filter = "brightness(1.2) blur(0.5px)";
      svg.appendChild(centerCircle);

      timelineRef.current = gsap.timeline({ paused: true });
      const tl = timelineRef.current;

      // Create scroll-triggered animation
      ScrollTrigger.create({
        trigger: svg,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: function(self) {
          if (tl && typeof self.progress === 'number') {
            tl.progress(self.progress);
          }
        }
      });

      for (let i = 0; i < totalLayers; i++) {
        const radius = baseRadius + (i * radiusIncrement);
        const dotsCount = getTrailCount(i);
        const { direction, speedMultiplier } = getLayerProperties(i);

        for (let j = 0; j < dotsCount; j++) {
          const gradient = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
          const gradientId = `trail-gradient-${i}-${j}-${Math.random()}`;
          gradient.id = gradientId;
          
          const colors = getRandomColorSet();
          gradient.innerHTML = `
            <stop offset="0%" stop-color="${colors[0]}" stop-opacity="1"/>
            <stop offset="85%" stop-color="${colors[1]}" stop-opacity="0.9"/>
            <stop offset="95%" stop-color="${colors[2]}" stop-opacity="0.8"/>
            <stop offset="100%" stop-color="${colors[2]}" stop-opacity="0.7"/>
          `;
          defs.appendChild(gradient);

          const startOffset = (i * 0.1) + (j * (1 / dotsCount));
          const trail = document.createElementNS("http://www.w3.org/2000/svg", "path");
          trail.setAttribute("stroke", `url(#${gradientId})`);
          trail.setAttribute("stroke-width", "8");
          trail.setAttribute("fill", "none");
          trail.setAttribute("stroke-linecap", "round");
          trail.style.filter = "brightness(1.2) blur(0.5px)";

          svg.appendChild(trail);

          const updatePath = (progress) => {
            const currentAngle = (startOffset + progress * speedMultiplier) * Math.PI * 2 * direction;
            const trailStartAngle = currentAngle - 1.5;
            
            const getPoint = (angle) => ({
              x: SVG_CENTER + radius * Math.cos(angle),
              y: SVG_CENTER + radius * Math.sin(angle)
            });

            const start = getPoint(trailStartAngle);
            const end = getPoint(currentAngle);
            
            trail.setAttribute("d", `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${
              (currentAngle - trailStartAngle > Math.PI) ? 1 : 0
            } 1 ${end.x} ${end.y}`);
          };

          updatePath(0);

          if (timelineRef.current) {
            timelineRef.current.to({}, {
              duration: 1,
              ease: "none",
              onUpdate: function() {
                updatePath(this.progress());
              }
            }, 0);
          }
        }
      }
    };

    if (isActive) {
      initAnimation();
    }

    return () => {
      cleanupAnimations();
    };
  }, [isActive]);

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden" ref={containerRef}>
      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        className="w-full h-full"
        style={{ 
          width: '100%',
          height: '100%',
          maxWidth: '400px', 
          maxHeight: '400px',
          aspectRatio: '1/1',
          transformOrigin: 'center',
          overflow: 'hidden'
        }}
      />
    </div>
  );
};

export default ConcentricCircles;