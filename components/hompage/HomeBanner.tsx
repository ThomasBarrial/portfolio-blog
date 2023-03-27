'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import img from '../../public/images/imagebanner.webp';
import SlideDown from '../animated/SlideDown';
import { motion } from 'framer-motion';
import downArrow from '../../public/icons/downarrow.svg';
import SlideUp from '../animated/SlideUp';
import { useScroll, useTransform, useViewportScroll } from 'framer-motion';

function HomeBanner() {
  const { scrollYProgress } = useScroll();
  const { scrollY } = useViewportScroll();

  const y1 = useTransform(scrollY, [0, 700], [0, -100]);
  const y2 = useTransform(scrollY, [0, 700], [0, -200]);
  const fadeInVariants = {
    open: {
      opacity: 1,
      transition: { type: 'spring', duration: 3.5, bounce: 0, delay: 1 },
    },
    closed: {
      opacity: 0,
      transition: { type: 'spring', duration: 3.5, bounce: 0, delay: 1 },
    },
  };

  const variants = {
    open: {
      y: 0,
      scale: 1,
      transition: { type: 'spring', duration: 2, bounce: 0, delay: 1 },
    },
    closed: {
      y: '300px',
      scale: 0.8,
      transition: { type: 'spring', duration: 2, bounce: 0, delay: 1 },
    },
  };

  // scrollYProgress.onChange(() => {
  //   console.log(scrollYProgress.get());
  // });

  // console.log(scale);
  return (
    <div className="h-screen w-screen">
      {/* <motion.div className="h-10 w-full absolute z-20 top-72 bg-red-400" /> */}
      <div
        className={`flex items-center justify-center overflow-hidden w-full  lg:w-6/12 mx-auto  h-[50%] lg:mt-24`}
      >
        <motion.div
          animate={{
            y: ['400%', '400%', '0%'],
            width: ['0%', '100%', '100%'],
          }}
          style={{ y: y1 }}
          transition={{ type: 'spring', duration: 2.5, bounce: 0 }}
          className="h-full  relative"
        >
          <Image
            src={img}
            className={`object-cover object-center transform`}
            style={{ scale: `${scrollYProgress.get() + 1}` }}
            fill
            alt=""
          />
        </motion.div>
      </div>

      <div className="font-montserrat overflow-hidden h-96 flex items-end justify-center z-10  text-6xl md:text-7xl xl:text-9xl w-10/12 md:w-full mx-auto font-black -translate-y-80 lg:-translate-y-80  text-center">
        <motion.div
          variants={variants}
          initial="closed"
          animate="open"
          style={{ y: y2 }}
        >
          RAKONTO STORIES
        </motion.div>
      </div>

      <div className="-translate-y-[37rem]  h-96 justify-end overflow-hidden lg:translate-y-20 lg:absolute lg:bottom-0 lg:left-1/2 lg:-translate-x-1/2 w-11/12 text-2xl font-benchnine font-bold flex flex-col items-center lg:flex-row lg:justify-between mx-auto">
        <motion.div
          className="text-center lg:text-left"
          variants={variants}
          initial="closed"
          animate="open"
          style={{ y: y1 }}
        >
          <p className="uppercase">Rakonto agit pour l'éducation des jeunes</p>
        </motion.div>
        <motion.div
          className="text-center lg:text-right"
          variants={variants}
          initial="closed"
          animate="open"
          style={{ y: y1 }}
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
        style={{ y: y2, x: '-50%' }}
        className="group absolute border border-white px-5 py-8 rounded-full bottom-[5%] lg:bottom-[20%] left-1/2"
      >
        <SlideDown duration={3}>
          <Image src={downArrow} alt="down" />
        </SlideDown>
      </motion.div>
    </div>
  );
}

export default HomeBanner;