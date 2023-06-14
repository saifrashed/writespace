// Works best on pngs with same width as height and at least 1000x1000 pixels.
// Simply editing the picture is more time-efficient then changing code.

// TO DO:
// - When clicked, show popup with titel, description and comment.

import React, { useState } from 'react';
import BadgeTemplate from '@/components/badge-template/badgeTemplate';

const ScaledBadge = ({ resizeFactor, pictureUrl }) => {
  const [isHovered, setIsHovered] = useState(false);

  const badgeScale = {
    transition: 'transform 0.3s ease',
    transform: isHovered ? `scale(${resizeFactor + 0.1}) translateY(-40px)`
                         : `scale(${resizeFactor})`,
    // zIndex: isHovered ? 1 : 0,  // Bring to foreground.
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
      <div
        style={badgeScale}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BadgeTemplate pictureUrl={pictureUrl} />
      </div>
  );
};

export default ScaledBadge;
