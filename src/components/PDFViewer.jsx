import React, { useEffect } from 'react';
import { X } from 'react-feather';

const PDFViewer = ({ isOpen, onClose, pdfUrl }) => {
  useEffect(() => {
    // Find the content container and toggle its visibility
    const contentRef = document.querySelector('[ref="contentRef"]');
    if (contentRef) {
      if (isOpen) {
        contentRef.style.opacity = '0';
        contentRef.style.transition = 'opacity 0.3s ease';
      } else {
        contentRef.style.opacity = '1';
      }
    }

    return () => {
      if (contentRef) {
        contentRef.style.opacity = '1';
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        style={{
          backgroundColor: 'rgba(17, 24, 39, 0.7)',
        }}
        onClick={onClose}
      />

      {/* PDF Container */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
        <div className="relative w-full max-w-4xl">
          <button
            onClick={onClose}
            className="absolute -top-4 -right-4 p-2 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors z-10 shadow-lg"
            aria-label="Close PDF viewer"
          >
            <X size={20} />
          </button>
          <iframe
            src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            className="w-full h-[85vh]"
            title="Resume PDF"
            style={{
              border: 'none',
              display: 'block'
            }}
          />
        </div>
      </div>
    </>
  );
};

export default PDFViewer;