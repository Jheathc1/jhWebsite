import React from 'react';

const Footer = () => {
  return (
    <div
      className="w-full bg-gray-900"
      style={{
        height: "200px",
        boxShadow: "0 -2px 8px rgba(0, 0, 0, 0.3)", // Optional shadow
      }}
    >
      <div
        className="max-w-4xl mx-auto px-6 py-8 h-full flex flex-col items-center justify-center"
      >
        <div className="text-gray-400 text-center">
          <p>Thanks for visiting my portfolio!</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
