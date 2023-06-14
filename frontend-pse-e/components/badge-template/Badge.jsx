// Component for a badge that on click shows a pop-up with its info.
// Works best on pngs with same width as height and at least 1000x1000 pixels.
// Simply editing the png is currently more time-efficient than changing code.

// TO DO:
// - Show title, description etc from database.
// - Hoeveelheid xp gelinkt aan de badge.

import React, { useState, useEffect, useRef } from 'react';
import BadgeTemplate from '@/components/badge-template/badgeTemplate';
import CloseButton from '@/components/closeButton';

const ScaledBadge = ({ resizeFactor, pictureUrl }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);
  const popupRef = useRef(null);

  const handleMouseEnter = () => {setIsHovered(true);};
  const handleMouseLeave = () => {setIsHovered(false);};

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const badgeScale = {
    transition: 'transform 0.3s ease',
    transformOrigin: 'bottom',
    transform: isHovered
      ? `scale(${resizeFactor + 0.1}) translateY(-40px)`
      : `scale(${resizeFactor})`,
  };

  // So that a click outside of the pop-up also closes it.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // To make pop-up responsive to window size.
  useEffect(() => {
    const handleWindowResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);


  const SmallScreenBadgePopup = () => {

    if (!showPopup) {
      return null;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-rol">

          {/* Popup window for title and description. */}
          <div ref={popupRef} style={{width: '400pt'}}
               className="bg-white rounded-lg p-8 shadow-lg ml-5">
            <div className="flex items-start">
              <div className="ml-4">
                <h2 className="text-3xl mb-4">SMALL SCREEN</h2>
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
      </div>
    );
  };

  const LargeScreenBadgePopup = () => {

    if (!showPopup) {
      return null;
    }

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-rol">

          {/* Show badge on left side. */}
          <div style={{width: '200pt'}} >
            <div style={{height: '300px',position: 'relative',
              top: '-10px', left: '-10px' // Adjust positioning to taste.
            }}>
              <BadgeTemplate pictureUrl={pictureUrl} />
            </div>
          </div>

          {/* Window for title and description. */}
          <div ref={popupRef} style={{width: '400pt'}}
               className="bg-white rounded-lg p-8 shadow-lg ml-5">
            <div className="flex items-start">
              <div className="ml-4">
                <h2 className="text-3xl mb-4">BIG SCREEN</h2>
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
      {/* Make pop-up responsive to window size.  */}
      {isLargeScreen ? <LargeScreenBadgePopup /> : <SmallScreenBadgePopup />}
    </>
  );
};

export default ScaledBadge;
