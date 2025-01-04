import React, { useEffect, useState } from 'react';

const DecodeText = ({ text, isActive, delay = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
  
  useEffect(() => {
    if (!isActive) {
      setDisplayText('');
      return;
    }

    const maxIterations = 10;
    let characterProgress = new Array(text.length).fill(0);
    let isCompleted = new Array(text.length).fill(false);
    
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(current => {
          return text.split('')
            .map((char, index) => {
              if (char === ' ' || char === '\n' || char === '.' || char === ',' || char === ':' || char === '(' || char === ')') {
                return char;
              }
              
              if (isCompleted[index]) {
                return char;
              }

              if (Math.random() < 0.3) {
                characterProgress[index]++;
              }

              if (characterProgress[index] >= maxIterations) {
                isCompleted[index] = true;
                return char;
              }
              
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join('');
        });

        if (isCompleted.every(Boolean)) {
          clearInterval(interval);
        }
      }, 50);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isActive, delay]);

  return (
    <span className="font-mono">
      {displayText || (isActive ? text.replace(/[^\s\n.,()]/g, '█') : '')}
    </span>
  );
};

export default DecodeText;