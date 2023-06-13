import React, { useState, useEffect, useRef } from 'react';
import BadgeTemplate from '@/components/badge-template/badgeTemplate';
import CloseButton from '@/components/closeButton';

const ScaledBadge = ({ resizeFactor, pictureUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const badgeScale = {
    transition: 'transform 0.3s ease',
    transformOrigin: 'bottom',
    transform: isHovered
      ? `scale(${resizeFactor + 0.1}) translateY(-40px)`
      : `scale(${resizeFactor})`,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // So that a click outside of the popup also closes it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('touchstart', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  const BadgePopup = () => {

    if (!showPopup) {
      return null;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div ref={popupRef} className="bg-white rounded-lg p-8 shadow-lg">
          <div style={badgeScale}>
            <BadgeTemplate pictureUrl={pictureUrl} />
          </div>
          <div className="flex items-start">
            <div className="ml-4">
              <h2 className="text-3xl mb-4">Badge Title</h2>
              <p>
                Hier placeholder text: "Awarded for providing insightful and well-supported
                interpretations of data, texts, or research findings in their academic writing
                assignments."
              </p>
              <p>Placeholder text voor de comment van de teacher.</p>
            </div>
          </div>
          <CloseButton onClick={togglePopup}>Close</CloseButton>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div
          style={badgeScale}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={togglePopup}
        >
          <BadgeTemplate pictureUrl={pictureUrl} />
        </div>
      </div>
      <BadgePopup />
    </>
  );
};

export default ScaledBadge;
