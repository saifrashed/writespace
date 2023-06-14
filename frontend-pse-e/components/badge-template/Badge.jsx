// Component for a badge that on click shows a pop-up with its info.
// Works best on pngs with same width as height and at least 1000x1000 pixels.
// Simply editing the png is currently more time-efficient than changing code.

// TO DO:
// - Show title, description, comment, xp from database.
// - Prettier popup.
import React, { useState, useEffect, useRef } from 'react';
import BadgeTemplate from '@/components/badge-template/badgeTemplate';
import CloseButton from '@/components/closeButton';

const ScaledBadge = ({ resizeFactor, pictureUrl, title,
                       description, commentary, xp}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
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

  const smallBadge = {
    transform: 'scale(0.3)',
    position: 'relative',
    top: '-7.5pt',  // To center badge.
    left: '-7.5pt',
  };


    {/* Window for title and description */}
    const PopupWindow = () => {
      return (
        <>
          <div className="flex items-start">
            <div className="ml-4">
              <br/>
              <h2 className="text-3xl mb-4">{title}</h2>
              <p><em>"{description}"</em></p>
              <p><b>Commentary:</b> {commentary}</p>
              <p style={{ textAlign: 'right' }}><b>XP:</b> {xp}</p>
            </div>
          </div>
          <CloseButton onClick={togglePopup}>Close</CloseButton>
        </>
      )
    }


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

    if (typeof window !== 'undefined') {
      setIsLargeScreen(window.innerWidth > 768);
      window.addEventListener('resize', handleWindowResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleWindowResize);
      }
    };
  }, []);

  const SmallScreenBadgePopup = () => {
    if (!showPopup) {
      return null;
    }
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="flex flex-row">

          {/* Badge image on top */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-20 h-20">
              <div style={{ display: 'flex' }}>
                <div style={smallBadge}>
                  <BadgeTemplate pictureUrl={pictureUrl} />
                </div>
              </div>
            </div>
          </div>

          {/* Popup window for title and description */}
          <div ref={popupRef} className="bg-white rounded-lg p-8 shadow-lg ml-5 mr-5">
            <PopupWindow />
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
          {/* Show badge on left side */}
          <div style={{ width: '200pt' }}>
            <div style={{
                height: '300px', position: 'relative',
                top: '-10px', left: '-10px', // Adjust positioning to taste
            }}>
              <BadgeTemplate pictureUrl={pictureUrl} />
            </div>
          </div>
          {/* Window for title and description */}
          <div ref={popupRef} style={{ maxWidth: '400pt' }} className="bg-white rounded-lg p-8 shadow-lg ml-5 mr-5">
            <PopupWindow />
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
      {/* Make pop-up responsive to window size. */}
      {isLargeScreen ? <LargeScreenBadgePopup /> : <SmallScreenBadgePopup />}
    </>
  );
};

export default ScaledBadge;
