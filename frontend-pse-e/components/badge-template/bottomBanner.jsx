// The svg for the bottom banner of the badge.
// This component should only be called in badgeTemplate.jsx
// The colors can be changed by editing the stop-color="#<hexcode>" attributes
import React from "react";

const BottomBanner = ({unlocked, count}) => {
  let text = '';
  if (unlocked) {
    text = `${count}X`
  }

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
    <linearGradient id="gradientBB" gradientUnits="objectBoundingBox" x1="0" y1="0"
     x2="1.38339781255396" y2="-0.227571673726306" spreadMethod="pad">
      <stop stop-color="#70bbff" offset="0" stop-opacity="1"/>
      <stop stop-color="#a855f7" offset="0.728571428571429" stop-opacity="1"/>
    </linearGradient>
   </defs>
  <path id="shape0" transform="matrix(-1 0 0 -1 212.519677736637 166.640521212607)" fill="#4c4c4c"
   fill-rule="evenodd" stroke="none" stroke-width="1.9584" stroke-linecap="square"
   stroke-linejoin="bevel" d="M0 0L8.28965 7.78498L15.8523 0.0986897Z" sodipodi:nodetypes="cccc"/>
  <path id="shape1" transform="matrix(-1 0 0 -1 212.404435595649 199.422117054518)"
   fill="url(#gradientBB)" fill-rule="evenodd" stroke="none" stroke-width="2.4"
   stroke-linecap="square" stroke-linejoin="bevel" d="M151.873 16.2639C155.34 13.0285 161.119
   7.63611 169.209 0.0868178C169.189 0.0463028 169.175 0.0173636 169.167 0C135.34 0.0387324
   86.8563 0.275298 23.7164 0.709696C7.91191 15.7614 0.00643095 26.5863 0 33.1844C33.7532 33.2136
   90.0085 33.2622 168.766 33.3302C160.882 25.3659 155.251 19.6771 151.873 16.2639Z"
   sodipodi:nodetypes="ccccccc"/>
   <text x="50%" y="77%" font-size="20" text-anchor="middle" fill="white" style="
    font-weight: 500;
    color: white;">
      ${text}
    </text>
  </svg>
  `;
  return (
    <div dangerouslySetInnerHTML={{ __html: svgCode }} />
  );
};

export default BottomBanner;