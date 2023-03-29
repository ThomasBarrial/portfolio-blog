'use client';
import { motion } from 'framer-motion';

interface IProps {
  children?: React.ReactNode;
  className?: string;
  duration: number;
  scaleInit?: number;
  scaleFinish?: number;
  delay?: number;
  style?: Object;
}

function SlideUp({
  children,
  className,
  duration,
  scaleFinish = 1,
  scaleInit = 1,
  delay = 0,
  style = {},
}: IProps): JSX.Element {
  const variants = {
    open: {
      y: 0,
      scale: scaleFinish,
      transition: { type: 'spring', duration, bounce: 0, delay },
    },
    closed: {
      y: '300px',
      scale: scaleInit,
      transition: { type: 'spring', duration, bounce: 0, delay },
    },
  };
  return (
    <div className="overflow-hidden">
      <motion.div
        className={className}
        variants={variants}
        style={style}
        initial="closed"
        animate="open"
      >
        {children}
      </motion.div>
    </div>
  );
}

export default SlideUp;
