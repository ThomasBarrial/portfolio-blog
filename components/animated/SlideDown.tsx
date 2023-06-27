'use client';
import { motion } from 'framer-motion';

interface IProps {
  children?: React.ReactNode;
  className?: string;
  duration: number;
  scaleInit?: number;
  scaleFinish?: number;
  delay?: number;
}

function SlideDown({
  children,
  className,
  duration,
  scaleFinish = 1,
  scaleInit = 1,
  delay = 0,
}: IProps): JSX.Element {
  const variants = {
    open: {
      y: 0,
      scale: scaleFinish,
      transition: { duration, bounce: 0, delay },
    },
    closed: {
      y: '-300px',
      scale: scaleInit,
      transition: { duration, bounce: 0, delay },
    },
  };
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        variants={variants}
        initial="closed"
        animate="open"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default SlideDown;
