'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import { ExploreCard } from './ExploreCard'
import { TitleText, TypingText } from './CustomTexts'

const staggerContainer = (staggerChildren, delayChildren) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

const exploreCourses = [
  {
    id: 'course-1',
    imgUrl: 'https://img.parool.nl/c65801c8e90ae3484621391defddf267d62f4d7b/uva-stelt-onderzoek-in-na-klacht-docent-over-woke-gedachtegoed-op-universiteit',
    title: 'Automaten & Formele Talen',
  },
  {
    id: 'course-2',
    imgUrl: 'https://img.parool.nl/c65801c8e90ae3484621391defddf267d62f4d7b/uva-stelt-onderzoek-in-na-klacht-docent-over-woke-gedachtegoed-op-universiteit',
    title: 'Project Software Engineering',
  },
  {
    id: 'course-3',
    imgUrl: 'https://img.parool.nl/c65801c8e90ae3484621391defddf267d62f4d7b/uva-stelt-onderzoek-in-na-klacht-docent-over-woke-gedachtegoed-op-universiteit',
    title: 'Logic & Modeling',
  },
  {
    id: 'course-4',
    imgUrl: 'https://img.parool.nl/c65801c8e90ae3484621391defddf267d62f4d7b/uva-stelt-onderzoek-in-na-klacht-docent-over-woke-gedachtegoed-op-universiteit',
    title: 'Compiler Construction',
  },
  {
    id: 'course-5',
    imgUrl: 'https://img.parool.nl/c65801c8e90ae3484621391defddf267d62f4d7b/uva-stelt-onderzoek-in-na-klacht-docent-over-woke-gedachtegoed-op-universiteit',
    title: 'Programming Languages',
  },
];

const Explore = () => {
  const [active, setActive] = useState('course-2');

  return (
    <section className={'sm:p-16 xs:p-8 px-6 py-12'} id="explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={'2xl:max-w-[1280px] w-full mx-auto flex flex-col'}
      >
        <TitleText
          title={<>Choose the course you want <br className="md:block hidden" /> to explore</>}
          textStyles="text-center "
        />
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreCourses.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Explore;
