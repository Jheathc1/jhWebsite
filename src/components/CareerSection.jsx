import React, { useState } from 'react';
import DecodeText from './DecodeText';
import ConcentricCircles from './ConcentricCircles';

const CareerSection = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);

  const handleSectionClick = (section) => {
    if (section === activeSection || isTransitioning) return;
    
    setIsTransitioning(true);
    setPendingSection(section);
  };

  const handleTransitionComplete = () => {
    if (pendingSection) {
      setActiveSection(pendingSection);
      setPendingSection(null);
      // Increased delay to ensure section expansion completes first
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Increased from 100ms to 500ms
    }
  };

  return (
    <div className="w-full py-24">
      <div className="w-full bg-gray-900/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="flex gap-4 transition-all duration-500 ease-in-out">
          {/* Education Section */}
          <div 
            className={`relative rounded-2xl bg-gray-800/50 p-8 transition-all duration-500 ease-in-out cursor-pointer min-h-[400px] overflow-hidden
              ${activeSection === 'education' ? 'w-[1500px]' : 'w-[500px]'}
              min-h-[400px] h-[400px]`}
            onClick={() => handleSectionClick('education')}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold text-white">Education</h2>
            </div>
            
            <div className={`transition-opacity duration-500 ${
              activeSection === 'education' ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="space-y-8">
                <div className="border-l-2 border-purple-500 pl-4">
                  <h3 className="text-xl font-semibold text-white">
                    <DecodeText 
                      text="Arizona State University"
                      isActive={activeSection === 'education'}
                      delay={300}
                    />
                  </h3>
                  <p className="text-gray-400">
                    <DecodeText 
                      text="Bachelor of Science in Software Engineering"
                      isActive={activeSection === 'education'}
                      delay={400}
                    />
                  </p>
                  <p className="text-gray-500">
                    <DecodeText 
                      text="2020 - 2025"
                      isActive={activeSection === 'education'}
                      delay={500}
                    />
                  </p>
                  <p className="text-gray-400 mt-2">
                    <DecodeText 
                      text="GPA (Current): 4.0"
                      isActive={activeSection === 'education'}
                      delay={600}
                    />
                  </p>
                  <p className="text-gray-400 mt-2">
                    <DecodeText 
                      text="Relevant coursework in algorithms, data structures, and software engineering."
                      isActive={activeSection === 'education'}
                      delay={700}
                    />
                  </p>
                </div>
              </div>
            </div>
            
            {/* Collapsed View with Circles */}
            <div className={`absolute inset-0 flex items-center justify-center 
              ${activeSection === 'education' 
                ? 'opacity-0 pointer-events-none transition-opacity duration-200' 
                : 'opacity-100 transition-opacity duration-700 delay-700'}`}
            >
              <div className="w-full h-full">
                <ConcentricCircles 
                  isActive={activeSection !== 'education'} 
                  isTransitioning={isTransitioning && pendingSection === 'education'}
                  onTransitionComplete={handleTransitionComplete}
                />
              </div>
            </div>
          </div>

          {/* Career Section */}
          <div 
            className={`relative rounded-2xl bg-gray-800/50 p-8 transition-all duration-500 ease-in-out cursor-pointer min-h-[400px] overflow-hidden
              ${activeSection === 'career' ? 'w-[1500px]' : 'w-[500px]'}
              min-h-[400px] h-[400px]`}
            onClick={() => handleSectionClick('career')}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold text-white">Career</h2>
            </div>

            <div className={`transition-opacity duration-500 ${
              activeSection === 'career' ? 'opacity-100' : 'opacity-0'
            }`}>
              <div className="space-y-8">
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-white">
                    <DecodeText 
                      text="Network Operations Engineer"
                      isActive={activeSection === 'career'}
                      delay={300}
                    />
                  </h3>
                  <p className="text-gray-400">
                    <DecodeText 
                      text="Cox Communications"
                      isActive={activeSection === 'career'}
                      delay={400}
                    />
                  </p>
                  <p className="text-gray-500">
                    <DecodeText 
                      text="2021 - Present"
                      isActive={activeSection === 'career'}
                      delay={500}
                    />
                  </p>
                  <p className="text-gray-400 mt-2">
                    <DecodeText 
                      text="Leveraged network monitoring tools and technical expertise to redesign infrastructure, diagnose signal issues across RF and optical systems, create comprehensive documentation, and train team members while maintaining high network reliability through proactive maintenance and strategic upgrades."
                      isActive={activeSection === 'career'}
                      delay={600}
                    />
                  </p>
                </div>
                
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="text-xl font-semibold text-white">
                    <DecodeText 
                      text="Core Technology Technician"
                      isActive={activeSection === 'career'}
                      delay={700}
                    />
                  </h3>
                  <p className="text-gray-400">
                    <DecodeText 
                      text="Cox Communications"
                      isActive={activeSection === 'career'}
                      delay={800}
                    />
                  </p>
                  <p className="text-gray-500">
                    <DecodeText 
                      text="2012 - 2021"
                      isActive={activeSection === 'career'}
                      delay={900}
                    />
                  </p>
                  <p className="text-gray-400 mt-2">
                    <DecodeText 
                      text="Installed and maintained residential broadband services while providing expert troubleshooting support, mentoring new technicians, and staying current with emerging technologies to ensure optimal service delivery across internet, security, TV, and phone systems."
                      isActive={activeSection === 'career'}
                      delay={1000}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Collapsed View with Circles */}
            <div className={`absolute inset-0 flex items-center justify-center 
              ${activeSection === 'career' 
                ? 'opacity-0 pointer-events-none transition-opacity duration-200' 
                : 'opacity-100 transition-opacity duration-700 delay-700'}`}
            >
              <div className="w-full h-full">
                <ConcentricCircles 
                  isActive={activeSection !== 'career'} 
                  isTransitioning={isTransitioning && pendingSection === 'career'}
                  onTransitionComplete={handleTransitionComplete}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default CareerSection;