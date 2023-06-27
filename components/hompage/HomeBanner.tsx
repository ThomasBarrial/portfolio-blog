'use client';
import Image from 'next/image';
import React from 'react';
import img from '../../public/images/imagebanner.webp';
import SlideDown from '../animated/SlideDown';
import { motion } from 'framer-motion';
import downArrow from '../../public/icons/downarrow.svg';
import { useTransform, useScroll } from 'framer-motion';

function HomeBanner() {
  const { scrollY, scrollYProgress } = useScroll();

  const y1 = useTransform(scrollY, [0, 700], [0, -100]);
  const y2 = useTransform(scrollY, [0, 700], [0, -200]);

  const fadeInVariants = {
    open: {
      opacity: 1,
      transition: { duration: 3.5, bounce: 0, delay: 1 },
    },
    closed: {
      opacity: 0,
      transition: { duration: 3.5, bounce: 0, delay: 1 },
    },
  };

  const variants = {
    open: {
      y: 0,
      scale: 1,
      transition: { duration: 2, bounce: 0, delay: 1 },
    },
    closed: {
      y: '300px',
      scale: 0.8,
      transition: { duration: 2, bounce: 0, delay: 1 },
    },
  };

  return (
    <div className="h-screen max-w-[90rem] mx-auto">
      <div
        className={`flex items-center justify-center  w-full  lg:w-8/12 mx-auto overflow-hidden  h-[50%] lg:mt-24`}
      >
        <motion.div
          animate={{
            y: ['50%', '50%', '0%'],
            width: ['0%', '100%', '100%'],
          }}
          style={{ y: y2 }}
          transition={{ duration: 2.5 }}
          className="h-[180%]  relative"
        >
          <Image
            loading="lazy"
            src={img}
            className={`object-cover object-center transform`}
            style={{ scale: `${scrollYProgress.get() + 1}` }}
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            alt=""
          />
        </motion.div>
      </div>

      <div className="font-montserrat overflow-hidden h-96 flex items-end justify-center z-10  text-6xl md:text-9xl  w-full mx-auto font-black lg:-translate-y-80 -translate-y-[22rem] text-center">
        <motion.div variants={variants} initial="closed" animate="open">
          RAKONTO
        </motion.div>
      </div>

      <div className="-translate-y-[37rem]  h-96 justify-end overflow-hidden lg:translate-y-20 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-11/12  max-w-[90rem] text-2xl font-benchnine font-bold flex flex-col items-center lg:flex-row lg:justify-between mx-auto">
        <motion.div
          className="text-center lg:text-left"
          variants={variants}
          initial="closed"
          animate="open"
        >
          <p className="uppercase">Rakonto agit pour l'éducation des jeunes</p>
        </motion.div>
        <motion.div
          className="text-center lg:text-right"
          variants={variants}
          initial="closed"
          animate="open"
        >
          <p className="uppercase">
            Nous proposons des projets Erasmus+ AC1 et AC2.
          </p>
        </motion.div>
      </div>
      <motion.div
        variants={fadeInVariants}
        animate="open"
        initial="closed"
        className="group absolute border  border-white lg:px-5 lg:py-8 py-4 px-3 rounded-full bottom-[5%] lg:bottom-[10%] left-1/2 -translate-x-1/2"
      >
        <SlideDown duration={3}>
          <Image src={downArrow} alt="down" />
        </SlideDown>
      </motion.div>
    </div>
  );
}

export default HomeBanner;
