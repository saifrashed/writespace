// The svg for the top banner of the badge.
// This component should only be called in badgeTemplate.jsx
// The colors can be changed by editing the stop-color="#<hexcode>" attributes
import React from "react";

const TopBanner = () => {
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
    <linearGradient id="gradientTB" gradientUnits="objectBoundingBox" x1="0" y1="0"
     x2="1.20871550980016" y2="0.555831534029364" spreadMethod="pad">
      <stop stop-color="#62ca54" offset="0.1039" stop-opacity="1"/>
      <stop stop-color="#70bbff" offset="0.831168831168831" stop-opacity="1"/>
    </linearGradient>
   </defs>
  <path id="shape0" transform="matrix(1 0.0219987826959742 2.44929359829471e-16 1
   42.4288798364538 81.9572688078355)" fill="#000000" fill-rule="evenodd" stroke="none"
   stroke-width="1.9584" stroke-linecap="square" stroke-linejoin="bevel"
   d="M0 0L7.90489 7.29343L15.1165 0.0924583Z" sodipodi:nodetypes="cccc"/>
  <path id="shape1" transform="translate(42.6473538780217, 49.182009261271)"
   fill="url(#gradientTB)" fill-rule="evenodd" stroke="none" stroke-width="2.4"
   stroke-linecap="square" stroke-linejoin="bevel" d="M151.873 16.2639C155.34 13.0285
   161.119 7.63611 169.209 0.0868178C169.189 0.0463028 169.175 0.0173636 169.167 0C135.34
   0.0387324 86.8563 0.275298 23.7164 0.709696C7.91191 15.7614 0.00643095 26.5863 0
   33.1844C33.7532 33.2136 90.0085 33.2622 168.766 33.3302C160.882 25.3659 155.251 19.6771
   151.873 16.2639Z" sodipodi:nodetypes="ccccccc"/>
  </svg>

  `;

  return (
    <div dangerouslySetInnerHTML={{ __html: svgCode }} />
  );
};

export default TopBanner;
