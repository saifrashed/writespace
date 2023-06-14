// The badge consisting of multiple components stacked on top of eachother.
// This component should not be called directly.
// Use ScaledBadge from Badge.jsx for more control.

import React from "react";
import BadgeBg from "@/components/badge-template/badgeBg"
import TopBanner from "@/components/badge-template/topBanner"
import BottomBanner from "@/components/badge-template/bottomBanner"

const BadgeTemplate = ({ pictureUrl, unlocked }) => {

  const containerStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const pictureStyle = {
    maxWidth: '120pt',
    maxHeight: '120pt',
    width: 'auto',  // Keep aspect ratio.
    height: 'auto',
    position: 'relative',
    top: '65pt',  // Image offset to position somewhat in middle of badge.
    left: '65pt',
  };

  const componentStyle = {  // So that the badge components align.
    position: 'absolute',
    top: 0,
    left: 0,
  };

  return (
    <div style={containerStyle}>
      <div style={componentStyle}>
        <BadgeBg/>
      </div>
      <div style={componentStyle}>
        <TopBanner/>
      </div>
      {/* Don't show image for badges that haven't been unlocked yet. */}
      {unlocked ? (
        <div style={componentStyle}>
          <img src={pictureUrl} alt="Badge Picture" style={pictureStyle} />
        </div>
        ) : null
      }
      <div style={componentStyle}>
        <BottomBanner/>
      </div>
    </div>
  );
}

export default BadgeTemplate;
