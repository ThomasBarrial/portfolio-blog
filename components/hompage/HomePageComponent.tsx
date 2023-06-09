'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useOnScroll } from 'sanity';
import { Post } from '../../typings';
import HomeBanner from './HomeBanner';
import Header from '../Header';
import { motion, useScroll, useSpring } from 'framer-motion';

type Props = {
  posts: Post[];
};

function HomePageComponent({ posts }: Props) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    container: ref,
  });

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {}, [scrollYProgress]);

  return (
    <div className="h-screen w-screen bg-blue-200 pt-20">
      <motion.div className="h-10 w-full bg-red-400" style={{ scaleX }} />
      <div
        ref={ref}
        className=" h-96 bg-blue-400 w-[40rem] overflow-y-scroll mx-auto"
      >
        {/* <Header />
      <HomeBanner scrollYProgress={scrollYProgress} /> */}
      </div>
    </div>
  );
}

export default HomePageComponent;
