'use client';

import { motion } from 'framer-motion';

export const ExploreCard = ({ id, imgUrl, title, active, handleClick }) => (
  <motion.div
    className={`relative overflow-hidden ${active === id ? 'lg:flex-[3.5] flex-[10]' : 'lg:flex-[0.5] flex-[2]'
      } flex items-center justify-center min-w-[170px] h-[32rem] transition-[flex] duration-[0.7s] ease-out-flex cursor-pointer`}
    onClick={() => handleClick(id)}
  >
    <img
      src={imgUrl}
      alt="planet-04"
      className="absolute w-full h-full object-cover rounded-[1rem]"
    />
    {active !== id ? (
      <h3 className="font-semibold sm:text-[26px] text-[18px] text-white absolute z-0 lg:bottom-20 lg:rotate-[-90deg] lg:origin-[0,0]">
        {title}
      </h3>
    ) : (
      <div className="absolute bottom-0 p-8 flex justify-center items-center w-full h-full flex-col backdrop-blur-[3rem] rounded-[1rem]">
        <div
          className="flex justify-center items-center w-[60px] h-[60px] rounded-[1rem] glassmorphism mb-[16px]"
        >
          <img
            src="/headset.svg"
            alt="headset"
            className="w-1/2 h-1/2 object-contain"
          />
        </div>
        <p className="text-[16px] leading-[20.16px] text-white uppercase font-bold">
          Enter Course
        </p>
        <h2 className="mt-[24px] font-semibold sm:text-[32px] text-[24px] text-white">
          {title}
        </h2>
      </div>
    )}
  </motion.div >
);
