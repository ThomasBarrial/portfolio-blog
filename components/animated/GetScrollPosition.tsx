'use client';
import React, { useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
  ScrollYContextProvider,
  useScrollYContext,
} from '../../app/context/scrollYContext';

function GetScrollPosition() {
  const { scrollYProgress } = useScroll();

  //   const scrollContext = useScrollYContext();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  //   useEffect(() => {
  //     scrollContext?.setScrollYContext(scrollYProgress);
  //   }, [scrollYProgress]);

  return (
    <div>
      <motion.div
        className="h-10 w-full absolute top-72 bg-red-400"
        style={{ scaleX }}
      />
    </div>
  );
}

export default GetScrollPosition;
