import React from 'react';
import { GitHub, Linkedin, Mail, FileText } from 'react-feather';

const Footer = ({ onOpenPDF }) => {
  return (
    <div
      className="w-full bg-gray-800/80 backdrop-blur-sm relative"
      style={{
        boxShadow: '0 -2px 20px rgba(168, 85, 247, 0.15)',
      }}
    >
      {/* Purple glow border at top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-purple-500/20" />
      <div className="absolute top-[-1px] left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500/5 via-purple-500/20 to-purple-500/5" />
      
      <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col items-center">
        {/* Social Links */}
        <div className="flex gap-6 mb-6">
          <a
            href="https://www.linkedin.com/in/jacob-heathcoat-3b1627343/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300"
          >
            <Linkedin className="w-5 h-5 text-purple-400" />
          </a>
          <a
            href="https://github.com/Jheathc1"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300"
          >
            <GitHub className="w-5 h-5 text-purple-400" />
          </a>
          <a
            href="mailto:jh.heathcoat@gmail.com"
            className="p-3 rounded-lg bg-purple-500/20 hover:bg-purple-500/30 transition-all duration-300"
          >
            <Mail className="w-5 h-5 text-purple-400" />
          </a>
        </div>
        
        {/* Stylized text with gradient */}
        <div className="relative">
          <h3 className="text-lg font-medium bg-white bg-clip-text text-transparent">
            Created by Jacob Heathcoat
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Footer;