import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import MotionPathPlugin from 'gsap/MotionPathPlugin';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

const ConcentricCircles = ({ isActive, isTransitioning, onTransitionComplete }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    // Reset animation state when transitioning completes
    if (!isTransitioning && containerRef.current) {
      gsap.set(containerRef.current, {
        clearProps: "all"
      });
    }
  }, [isTransitioning]);

  useEffect(() => {
    // Cleanup function for previous animations
    const cleanupAnimations = () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
      ScrollTrigger.getAll().forEach(st => st.kill());
      gsap.killTweensOf(containerRef.current);
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
        if (layerIndex <= 2) {
          return 2 + layerIndex;
        } else {
          return 1 + layerIndex;
        }
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

      timelineRef.current = gsap.timeline({
        onComplete: () => {
          if (isTransitioning && onTransitionComplete) {
            onTransitionComplete();
          }
        }
      });

      if (isTransitioning) {
        timelineRef.current
          .to(containerRef.current, {
            scale: 3,
            duration: 0.8,
            ease: "power2.inOut"
          })
          .to(containerRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
          }, "-=0.2");
      } else if (isActive) {
        timelineRef.current.pause();
        const tl = timelineRef.current;
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
      }

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
            const currentSpeedMultiplier = isTransitioning ? 2 : speedMultiplier;
            const currentDirection = isTransitioning ? 1 : direction;
            
            const currentAngle = (startOffset + progress * currentSpeedMultiplier) * Math.PI * 2 * currentDirection;
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
              duration: isTransitioning ? 0.8 : 1,
              ease: isTransitioning ? "power2.in" : "none",
              onUpdate: function() {
                updatePath(this.progress());
              }
            }, 0);
          }
        }
      }
    };

    if (isActive || isTransitioning) {
      initAnimation();
    }

    return () => {
      cleanupAnimations();
    };
  }, [isActive, isTransitioning, onTransitionComplete]);

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