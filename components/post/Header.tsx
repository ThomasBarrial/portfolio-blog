'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import urlFor from '../../lib/urlFor';
import { Post } from '../../typings';

function Header({ post }: { post: Post }) {
  const variants = {
    open: {
      x: 100,
      scale: 1,
      transition: { type: 'spring', duration: 2, bounce: 0 },
    },
    close: {
      x: 0,
      scale: 1.5,
      transition: { type: 'spring', duration: 2, bounce: 0 },
    },
  };
  return (
    <div className="w-screen h-screen flex items-center overflow-hidden">
      <motion.div
        animate={{
          scale: [1.5, 1.2],
        }}
        transition={{
          duration: 4,
          ease: 'easeInOut',
        }}
        className="relative  h-screen w-[100%]"
      >
        <Image
          className="object-cover opacity-80 object-center flex"
          src={urlFor(post.mainImage).url()}
          alt={post.author.name}
          fill
        />
      </motion.div>
      <div className="absolute bottom-0 h-screen w-screen z-20 bg-gradient-to-t from-[#1b1b1bcd] via-[#1b1b1ba9]" />
    </div>
  );
}

export default Header;
