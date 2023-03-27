'use client';
import React from 'react';
import { Post } from '../../typings';
import Image from 'next/image';
import urlFor from '../../lib/urlFor';
import { useRef } from 'react';
import {
  useInView,
  motion,
  useScroll,
  useTransform,
  useViewportScroll,
} from 'framer-motion';
import SlideUp from '../animated/SlideUp';

function LastArticle({ post }: { post: Post }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useViewportScroll();

  const y1 = useTransform(scrollY, [0, 700], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1500], [0, -450]);
  return (
    <section
      ref={ref}
      className=" relative w-screen lg:w-10/12 lg:max-w-7xl max-h-[55em]  h-screen mx-auto lg:flex"
    >
      <div className=" lg:w-8/12 w-screen px-5 lg:px-0 pb-5 lg:pt-20 z-10 absolute bottom-0 lg:top-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1B1B1B] via-[#1B1B1B] lg:via-transparent ">
        {isInView && (
          <SlideUp delay={1} duration={3}>
            <h2 className="font-black  font-montserrat text-3xl lg:text-9xl">
              DERNIÈRE ARTICLE
            </h2>
          </SlideUp>
        )}
        <h3 className="font-bold lg:hidden font-poppins text-xl lg:text-3xl mt-2">
          {post.title}
        </h3>
        <p className="mt-2 lg:hidden">
          <span>{post.author.name}</span>.
          <span>
            {' '}
            {new Date(post._createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </p>
        <p className=" lg:hidden font-poppins text-lg lg:mt-5 mt-1">
          {post.description}
        </p>
        <div className="flex justify-between items-end text-sm">
          <button className="border lg:hidden w-6/12 border-white px-5 py-2 mt-5">
            Lire l'article
          </button>
        </div>
      </div>

      <Image
        className="object-cover object-center lg:object-right flex lg:hidden"
        src={urlFor(post.mainImage).url()}
        alt={post.author.name}
        fill
      />

      {isInView && (
        <div className="hidden w-4/12 lg:flex z-10 flex-col absolute bottom-40 right-1/2 translate-x-[130%]">
          <SlideUp delay={1} duration={3}>
            <p className="font-poppins text-lg lg:mt-5 mt-2">
              {post.description}
            </p>
            <button className="border border-white px-5 py-2 w-6/12 mt-5">
              Lire l'article
            </button>
          </SlideUp>
        </div>
      )}

      {isInView && (
        <SlideUp
          duration={3}
          className="hidden  z-20 lg:flex  absolute bottom-10"
        >
          <p>{post.author.name} .</p>
          <p>
            {' '}
            {new Date(post._createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </SlideUp>
      )}

      {isInView && (
        <div className="absolute opacity-50 transform translate-y-[25rem] left-1/2 -translate-x-1/2">
          <motion.div
            style={{ y: y2 }}
            className="hidden relative lg:flex h-[52rem] w-[30rem]"
          >
            <Image
              className="object-cover object-bottom"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}

export default LastArticle;
