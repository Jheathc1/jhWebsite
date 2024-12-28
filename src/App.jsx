import React, { useEffect } from 'react';
import { gsap } from 'gsap';

function App() {
  useEffect(() => {
    gsap.fromTo(
      '.animated-text',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1 }
    );
  }, []);

  return (
    <div className="App p-10">
      <h1 className="animated-text text-4xl font-bold text-gray-800">
        Welcome to My Portfolio
      </h1>
    </div>
  );
}

export default App;
