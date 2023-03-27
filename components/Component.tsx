'use client';
import React from 'react';
import { motion, useScroll, useSpring, MotionValue } from 'framer-motion';
import { useScrollYContext } from '../app/context/scrollYContext';

function Component() {
  const scrollContext = useScrollYContext();

  const scaleX = useSpring(
    scrollContext?.scrollYContext as MotionValue<number>,
    {
      stiffness: 100,
      damping: 30,
      restDelta: 0.001,
    }
  );
  return (
    <div>
      <motion.div
        className="h-10 w-full fixed top-20 bg-blue-400"
        style={{ scaleX }}
      />
    </div>
  );
}

export default Component;
