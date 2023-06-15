// #a855f7 (paars)
// #62ca54 (green)
// #70bbff (blauw)
// #706f7d (grijs)

// The badge background svg.
// This component should only be called in badgeTemplate.jsx
// The colors can be changed by editing the stop-color="#<hexcode>" attributes.
import React from "react";
import { useState, useEffect } from "react";

const BadgeBg = ({ unlocked }) => {

  const [isUnlocked, setIsUnlocked] = useState(true);
  const gradientId = isUnlocked ? "gradientBgUnlocked" : "gradientBgLocked";
  const color = isUnlocked ? "#a855f7" : "#706f7d";

  useEffect(() => {
    setIsUnlocked(unlocked);
  }, []);

  return (
    <div>

      <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="245.76pt"
      height="245.76pt"
      viewBox="0 0 245.76 245.76"
    >
      <defs>
        <radialGradient id={gradientId} gradientUnits="objectBoundingBox" cx="0" cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
          <stop stopColor={color} offset="0" stopOpacity="1" />
          <stop stopColor="#f2f2f2" offset="0.5" stopOpacity="1" />
          <stop stopColor={color} offset="1" stopOpacity="1" />
        </radialGradient>
      </defs>
      <rect
        id="shape0"
        transform="matrix(-0.577337840861106 -0.577337840861106 0.577337840861106 -0.577337840861106 126.991834848926 231.994954097084)"
        fill={`url(#${gradientId})`}
        fillRule="evenodd"
        stroke="#706f7d"
        strokeWidth="7.2"
        strokeLinecap="square"
        strokeLinejoin="miter"
        strokeMiterlimit="1.92"
        width="186.24"
        height="186.48"
      />
    </svg>
    </div>
  );
};

export default BadgeBg;
