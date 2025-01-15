import React, { useState, useCallback, memo } from 'react';
import DecodeText from './DecodeText';
import ConcentricCircles from './ConcentricCircles';

const MemoizedConcentricCircles = memo(ConcentricCircles);

const TabButton = ({ isActive, onClick, children }) => (
  <button
    onClick={onClick}
    className={`relative px-3 sm:px-6 py-2 sm:py-3 text-base sm:text-lg font-semibold rounded-t-lg transition-all duration-300
      ${isActive 
        ? 'text-white bg-gray-800 border-t border-l border-r border-purple-500/20' 
        : 'text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800/100'}`}
  >
    {children}
    {isActive && (
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-blue-500" />
    )}
  </button>
);

const CareerSection = () => {
  const [activeTab, setActiveTab] = useState('education');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [tabDirection, setTabDirection] = useState('education');

  const handleTabChange = useCallback((tab) => {
    if (tab === activeTab || isTransitioning) return;
    setIsTransitioning(true);
    setTabDirection(tab);
    setActiveTab(tab);
    setTimeout(() => setIsTransitioning(false), 500);
  }, [activeTab, isTransitioning]);

  return (
    <div className="w-full py-12 sm:py-24">
      <div className="w-full relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Tabs */}
          <div className="flex gap-1 sm:gap-2 mb-[-1px] relative z-10 ml-2 sm:ml-4">
            <TabButton 
              isActive={activeTab === 'education'} 
              onClick={() => handleTabChange('education')}
            >
              Education
            </TabButton>
            <TabButton 
              isActive={activeTab === 'career'} 
              onClick={() => handleTabChange('career')}
            >
              Career
            </TabButton>
          </div>

          {/* Content Container */}
          <div 
            className="relative rounded-xl bg-gray-800 p-4 sm:p-8 min-h-[400px] overflow-hidden
              border border-purple-500/20 transition-all duration-500"
            style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.15)',
            }}
          >
            {/* Background Decoration */}
            <div className="hidden xl:block absolute right-8 w-64 h-64 top-1/2 -translate-y-1/2 overflow-hidden">
              <MemoizedConcentricCircles
                isActive={true}
                isTransitioning={isTransitioning}
                tabDirection={tabDirection}
              />
            </div>

            {/* Education Content */}
            <div
              className={`transition-all duration-500 absolute inset-4 sm:inset-8
                ${activeTab === 'education' 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 -translate-x-8 pointer-events-none'}`}
            >
              <div className="space-y-4 sm:space-y-8 max-w-3xl relative z-10">
                <div className="border-l-2 border-purple-500 pl-4">
                  <h3 className="text-base lg:text-xl font-semibold text-white">
                    <DecodeText
                      text="Arizona State University"
                      isActive={activeTab === 'education'}
                      delay={300}
                    />
                  </h3>
                  <p className="text-sm lg:text-base text-gray-400">
                    <DecodeText
                      text="Bachelor of Science in Software Engineering"
                      isActive={activeTab === 'education'}
                      delay={400}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    <DecodeText
                      text="2020 - 2025"
                      isActive={activeTab === 'education'}
                      delay={500}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mt-2">
                    <DecodeText
                      text="GPA (Current): 4.0"
                      isActive={activeTab === 'education'}
                      delay={600}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mt-2">
                    <DecodeText
                      text="Core coursework: Data Structures & Algorithms, Object-Oriented Programming, Software Design & Architecture, Web Development, Database Systems, Operating Systems, and Computer Networks."
                      isActive={activeTab === 'education'}
                      delay={700}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mt-2">
                    <DecodeText
                      text="Specialized courses: Cloud Computing, Agile Methodologies, Software Testing & Quality Assurance, Mobile App Development, Software Security and Machine Learning."
                      isActive={activeTab === 'education'}
                      delay={800}
                    />
                  </p>
                </div>
              </div>
            </div>

            {/* Career Content */}
            <div
              className={`transition-all duration-500 absolute inset-4 sm:inset-8
                ${activeTab === 'career' 
                  ? 'opacity-100 translate-x-0' 
                  : 'opacity-0 translate-x-8 pointer-events-none'}`}
            >
              <div className="space-y-4 sm:space-y-8 max-w-3xl relative z-10">
                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    <DecodeText
                      text="Network Operations Technician"
                      isActive={activeTab === 'career'}
                      delay={300}
                    />
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    <DecodeText
                      text="Cox Communications"
                      isActive={activeTab === 'career'}
                      delay={400}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    <DecodeText
                      text="2021 - Present"
                      isActive={activeTab === 'career'}
                      delay={500}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mt-2">
                    <DecodeText
                      text="Leveraged network monitoring tools and technical expertise to redesign infrastructure and diagnose signal issues across RF and optical systems."
                      isActive={activeTab === 'career'}
                      delay={600}
                    />
                  </p>
                </div>

                <div className="border-l-2 border-blue-500 pl-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-white">
                    <DecodeText
                      text="Core Technology Technician"
                      isActive={activeTab === 'career'}
                      delay={700}
                    />
                  </h3>
                  <p className="text-sm sm:text-base text-gray-400">
                    <DecodeText
                      text="Cox Communications"
                      isActive={activeTab === 'career'}
                      delay={800}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-500">
                    <DecodeText
                      text="2012 - 2021"
                      isActive={activeTab === 'career'}
                      delay={900}
                    />
                  </p>
                  <p className="text-sm sm:text-base text-gray-400 mt-2">
                    <DecodeText
                      text="Installed and maintained residential broadband services while providing expert troubleshooting support and mentoring new technicians."
                      isActive={activeTab === 'career'}
                      delay={1000}
                    />
                  </p>
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