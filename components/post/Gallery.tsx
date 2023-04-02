'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Post } from '../../typings';
import { useTransform, useScroll, motion } from 'framer-motion';
import PictureColmn from './PictureColmn';
import Image from 'next/image';
import urlFor from '../../lib/urlFor';

function Gallery({ post }: { post: Post }) {
  const { scrollY } = useScroll();
  const [scrollYInView, setScrollYInView] = useState(0);
  const containerRef = useRef(null);

  const len = post.gallery.length;
  const chunkSize = Math.ceil(len / 3);

  const y2 = useTransform(scrollY, [scrollYInView + 5700, 1000], [400, -250]);
  const y1 = useTransform(scrollY, [scrollYInView + 4000, 700], [0, -200]);
  useEffect(() => {
    const element = containerRef.current as any;
    const { top } = element.getBoundingClientRect();

    setScrollYInView(top);
  }, []);

  return (
    <div ref={containerRef} className="w-screen   overflow-hidden">
      {/* MOBILE COMPONENT */}
      <div className="lg:hidden flex flex-col">
        {post.gallery.map((img) => {
          console.log(urlFor(img).url());
          return (
            <div
              key={img.asset._ref}
              className="h-[35rem] relative group w-full overflow-hidden"
            >
              <Image
                className="object-cover object-center"
                src={urlFor(img).url()}
                alt=""
                fill
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* DESKTOP COMPONENT  */}
      <div className="hidden lg:flex justify-between lg:max-w-[90rem] px-10 mx-auto space-x-4 pb-52">
        <PictureColmn yPosition={y1} array={post.gallery.slice(0, chunkSize)} />
        <PictureColmn
          yPosition={y2}
          array={post.gallery.slice(chunkSize, chunkSize * 2)}
        />
        <PictureColmn
          yPosition={y1}
          array={post.gallery.slice(chunkSize * 2)}
        />
      </div>
    </div>
  );
}

export default Gallery;
