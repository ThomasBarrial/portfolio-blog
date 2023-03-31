'use client';
import React, { useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import urlFor from '../../lib/urlFor';
import { Post } from '../../typings';
import SlideUp from '../animated/SlideUp';
import ClientSideRoute from '../ClientSideRoute';

function Header({ post }: { post: Post }) {
  const { scrollY } = useViewportScroll();
  const y2 = useTransform(scrollY, [0, 1500], [0, -350]);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <section className=" relative w-screen lg:w-full lg:px-10  lg:max-w-[90rem]  h-screen mx-auto lg:flex">
      <div className=" w-screen px-5 lg:px-0 pb-5 lg:pt-20 z-10 absolute bottom-0 lg:top-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1B1B1B] via-[#1B1B1B] lg:via-transparent ">
        <SlideUp duration={2}>
          <h2 className="font-black uppercase max-w-2xl lg:w-1/2  font-montserrat text-3xl lg:text-7xl">
            {post.title}
          </h2>
        </SlideUp>

        <>
          <SlideUp duration={2}>
            <h3 className="font-bold lg:hidden font-benchnine text-xl lg:text-3xl mt-2">
              {post.title}
            </h3>
          </SlideUp>
          <SlideUp duration={2}>
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
          </SlideUp>
          <SlideUp duration={2}>
            <p className=" lg:hidden font-benchnine lg:mt-5 mt-1">
              {post.description}
            </p>
          </SlideUp>
        </>
      </div>

      <div className="hidden font-benchnine text-2xl  w-4/12 lg:flex z-10 flex-col absolute bottom-52 right-1/2 translate-x-[130%]">
        <SlideUp duration={2}>
          <p className="lg:mt-5 mt-2">{post.description}</p>
        </SlideUp>
      </div>

      <div className="absolute  left-10 z-20 bottom-28">
        <SlideUp
          duration={2}
          className="hidden font-benchnine uppercase text-xl lg:flex  "
        >
          <p>{post.author.name} . </p>
          <p>
            {' '}
            {new Date(post._createdAt).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </SlideUp>
      </div>

      <div className="lg:flex top-1/2 animate-fadeIn -translate-y-1/2 absolute h-screen lg:h-[40rem] w-screen lg:w-[55rem] overflow-hidden  left-1/2 -translate-x-1/2 ">
        <motion.div
          animate={{
            width: ['0%', '100%'],
          }}
          style={{ y: y2 }}
          transition={{ type: 'spring', duration: 2, bounce: 0 }}
          className="relative  h-[150%] w-[100%]"
        >
          <Image
            className="object-cover opacity-60 object-center"
            src={urlFor(post.mainImage).url()}
            alt={post.author.name}
            fill
          />
        </motion.div>
      </div>
    </section>
  );
}

export default Header;
