'use client';
import React from 'react';
import Image from 'next/image';
import { MotionValue } from 'framer-motion';
import { Reference } from '../../typings';
import urlFor from '../../lib/urlFor';
import { motion } from 'framer-motion';

interface IProps {
  yPosition: MotionValue<number>;
  array: {
    _type: 'image';
    asset: Reference;
  }[];
}

function PictureColmn({ yPosition, array }: IProps) {
  return (
    <motion.div
      style={{ y: yPosition }}
      className="flex flex-col w-full space-y-4 translate-y-96"
    >
      {array.map((image) => {
        return (
          <div
            key={image.asset._ref}
            className="h-[35rem] group relative w-full overflow-hidden"
          >
            <div className="absolute h-full transform group-hover:opacity-0 duration-1000 w-full bottom-0 left-0 opacity-20 bg-[#1B1B1B] z-10" />
            <Image
              className="object-cover object-center group-hover:scale-110 duration-1000"
              src={urlFor(image).url()}
              alt=""
              fill
              loading="lazy"
            />
          </div>
        );
      })}
    </motion.div>
  );
}

export default PictureColmn;
