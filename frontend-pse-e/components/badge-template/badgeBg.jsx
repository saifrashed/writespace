// The badge background svg.
// This component should only be called in badgeTemplate.jsx
// The colors can be changed by editing the stop-color="#<hexcode>" attributes.
import React from "react";

const BadgeBg = () => {
  const svgCode = `
    <?xml version="1.0" standalone="no"?>
    <!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN"
     "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd">
    <!-- Created using Krita: https://krita.org -->
    <svg xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         xmlns:krita="http://krita.org/namespaces/svg/krita"
         xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
         width="245.76pt"
         height="245.76pt"
         viewBox="0 0 245.76 245.76">
      <defs>
        <radialGradient id="gradientBg" gradientUnits="objectBoundingBox" cx="0"
         cy="0" fx="0" fy="0" r="1.4142135623731" spreadMethod="pad">
          <stop stop-color="#cccccc" offset="0" stop-opacity="1"/>
          <stop stop-color="#f2f2f2" offset="0.5" stop-opacity="1"/>
          <stop stop-color="#ffffff" offset="1" stop-opacity="1"/>
        </radialGradient>
      </defs>
      <rect id="shape0" transform="matrix(-0.577337840861106 -0.577337840861106 0.577337840861106
        -0.577337840861106 126.991834848926 231.994954097084)" fill="url(#gradientBg)"
        fill-rule="evenodd" stroke="#666666" stroke-width="7.2" stroke-linecap="square"
        stroke-linejoin="miter" stroke-miterlimit="1.92" width="186.24" height="186.48"/>
    </svg>
  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: svgCode }} />
  );
};

export default BadgeBg;
