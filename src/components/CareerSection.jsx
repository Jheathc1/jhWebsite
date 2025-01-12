import React, { useState, useCallback, memo } from 'react';
import DecodeText from './DecodeText';
import ConcentricCircles from './ConcentricCircles';

// Memoized version of ConcentricCircles
const MemoizedConcentricCircles = memo(ConcentricCircles);

const CareerSection = () => {
  const [activeSection, setActiveSection] = useState('education');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingSection, setPendingSection] = useState(null);

  const handleSectionClick = useCallback((section) => {
    if (section === activeSection || isTransitioning) return;
    setIsTransitioning(true);
    setPendingSection(section);
  }, [activeSection, isTransitioning]);

  const handleTransitionComplete = useCallback(() => {
    if (pendingSection) {
      setActiveSection(pendingSection);
      setPendingSection(null);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
  }, [pendingSection]);

  return (
    <div className="w-full py-12 md:py-24">
      <div className="w-full relative">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-4 transition-all duration-500 ease-in-out">
            {/* Education Section */}
            <div
              className={`relative rounded-2xl bg-gray-800 p-4 md:p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden 
                border border-transparent hover:border-purple-500/50
                w-full lg:${activeSection === 'education' ? 'w-[1500px]' : 'w-[500px]'}
                h-[425px]`}
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

              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-2xl md:text-4xl font-bold text-white">Education</h2>
              </div>

              <div
                className={`transition-opacity duration-500 ${
                  activeSection === 'education' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="space-y-4 md:space-y-8">
                  <div className="border-l-2 border-purple-500 pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      <DecodeText
                        text="Arizona State University"
                        isActive={activeSection === 'education'}
                        delay={300}
                      />
                    </h3>
                    <p className="text-sm md:text-base text-gray-400">
                      <DecodeText
                        text="Bachelor of Science in Software Engineering"
                        isActive={activeSection === 'education'}
                        delay={400}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-500">
                      <DecodeText
                        text="2020 - 2025"
                        isActive={activeSection === 'education'}
                        delay={500}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                      <DecodeText
                        text="GPA (Current): 4.0"
                        isActive={activeSection === 'education'}
                        delay={600}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                      <DecodeText
                        text="Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Software Design & Architecture, Web Development, Database Systems, Operating Systems, and Computer Networks."
                        isActive={activeSection === 'education'}
                        delay={700}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                      <DecodeText
                        text="Specialized courses: Cloud Computing, Agile Methodologies, Software Testing & Quality Assurance, Mobile App Development, Software Security and Machine Learning."
                        isActive={activeSection === 'education'}
                        delay={800}
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Collapsed View with Concentric Circles */}
              <div
                className={`absolute inset-0 flex items-center justify-center 
                ${
                  activeSection === 'education'
                    ? 'opacity-0 pointer-events-none transition-opacity duration-200'
                    : 'opacity-100 transition-opacity duration-700 delay-700'
                }`}
              >
                <div className="w-full h-full">
                  <MemoizedConcentricCircles
                    isActive={activeSection !== 'education'}
                    isTransitioning={isTransitioning && pendingSection === 'education'}
                    onTransitionComplete={handleTransitionComplete}
                  />
                </div>
              </div>
            </div>

            {/* Career Section */}
            <div
              className={`relative rounded-2xl bg-gray-800 p-4 md:p-8 transition-all duration-500 ease-in-out cursor-pointer overflow-hidden 
                border border-transparent hover:border-purple-500/50
                w-full lg:${activeSection === 'career' ? 'w-[1500px]' : 'w-[500px]'}
                h-[425px]`}
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

              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h2 className="text-2xl md:text-4xl font-bold text-white">Career</h2>
              </div>

              <div
                className={`transition-opacity duration-500 ${
                  activeSection === 'career' ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="space-y-4 md:space-y-8">
                  <div className="border-l-2 border-blue-500 pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      <DecodeText
                        text="Network Operations Engineer"
                        isActive={activeSection === 'career'}
                        delay={300}
                      />
                    </h3>
                    <p className="text-sm md:text-base text-gray-400">
                      <DecodeText
                        text="Cox Communications"
                        isActive={activeSection === 'career'}
                        delay={400}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-500">
                      <DecodeText
                        text="2021 - Present"
                        isActive={activeSection === 'career'}
                        delay={500}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                      <DecodeText
                        text="Leveraged network monitoring tools and technical expertise to redesign infrastructure and diagnose signal issues across RF and optical systems."
                        isActive={activeSection === 'career'}
                        delay={600}
                      />
                    </p>
                  </div>

                  <div className="border-l-2 border-blue-500 pl-4">
                    <h3 className="text-lg md:text-xl font-semibold text-white">
                      <DecodeText
                        text="Core Technology Technician"
                        isActive={activeSection === 'career'}
                        delay={700}
                      />
                    </h3>
                    <p className="text-sm md:text-base text-gray-400">
                      <DecodeText
                        text="Cox Communications"
                        isActive={activeSection === 'career'}
                        delay={800}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-500">
                      <DecodeText
                        text="2012 - 2021"
                        isActive={activeSection === 'career'}
                        delay={900}
                      />
                    </p>
                    <p className="text-sm md:text-base text-gray-400 mt-2">
                      <DecodeText
                        text="Installed and maintained residential broadband services while providing expert troubleshooting support and mentoring new technicians."
                        isActive={activeSection === 'career'}
                        delay={1000}
                      />
                    </p>
                  </div>
                </div>
              </div>

              {/* Collapsed View with Concentric Circles */}
              <div
                className={`absolute inset-0 flex items-center justify-center 
                ${
                  activeSection === 'career'
                    ? 'opacity-0 pointer-events-none transition-opacity duration-200'
                    : 'opacity-100 transition-opacity duration-700 delay-700'
                }`}
              >
                <div className="w-full h-full">
                  <MemoizedConcentricCircles
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

export default memo(CareerSection);