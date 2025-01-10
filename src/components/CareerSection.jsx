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

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  };

  return (
    <div className="w-full py-24">
      <div className="w-full relative">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col gap-6">
            {/* Education Section */}
            <div
              className={`relative rounded-2xl bg-gray-800 p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden
                border border-transparent hover:border-purple-500/50 w-full
                ${activeSection === 'education' ? '' : 'h-[200px]'}`}
              onClick={() => handleSectionClick('education')}
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
              }}
            >
              {/* Glowing purple border */}
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl group-hover:border-purple-500/50 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl" />
              </div>

              {/* Content Container */}
              <div className="relative h-full">
                {/* Title and Main Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-4xl font-bold text-white">Education</h2>
                  </div>

                  <div
                    className={`transition-all duration-500 ${
                      activeSection === 'education' ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
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
                </div>

                {/* Concentric Circles Container */}
                {activeSection !== 'education' && (
                  <div className="absolute top-1/2 right-0 w-[160px] h-[160px] -translate-y-1/2">
                    <ConcentricCircles
                      isActive={activeSection !== 'education'}
                      isTransitioning={isTransitioning && pendingSection === 'education'}
                      onTransitionComplete={handleTransitionComplete}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Career Section */}
            <div
              className={`relative rounded-2xl bg-gray-800 p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden
                border border-transparent hover:border-purple-500/50 w-full
                ${activeSection === 'career' ? '' : 'h-[200px]'}`}
              onClick={() => handleSectionClick('career')}
              style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
              }}
            >
              {/* Glowing purple border */}
              <div className="absolute inset-0 border border-purple-500/20 rounded-2xl group-hover:border-purple-500/50 transition-colors duration-300" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl blur-xl" />
              </div>

              {/* Content Container */}
              <div className="relative h-full">
                {/* Title and Main Content */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-4xl font-bold text-white">Career</h2>
                  </div>

                  <div
                    className={`transition-all duration-500 ${
                      activeSection === 'career' ? 'opacity-100 max-h-[1000px]' : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
                  >
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
                            text="Leveraged network monitoring tools and technical expertise to redesign infrastructure and diagnose signal issues across RF and optical systems."
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
                            text="Installed and maintained residential broadband services while providing expert troubleshooting support and mentoring new technicians."
                            isActive={activeSection === 'career'}
                            delay={1000}
                          />
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Concentric Circles Container */}
                {activeSection !== 'career' && (
                  <div className="absolute top-1/2 right-0 w-[160px] h-[160px] -translate-y-1/2">
                    <ConcentricCircles
                      isActive={activeSection !== 'career'}
                      isTransitioning={isTransitioning && pendingSection === 'career'}
                      onTransitionComplete={handleTransitionComplete}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerSection;