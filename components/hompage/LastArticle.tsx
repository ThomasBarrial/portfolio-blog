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
import ClientSideRoute from '../ClientSideRoute';

function LastArticle({ post }: { post: Post }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { scrollY } = useViewportScroll();
  const y2 = useTransform(scrollY, [0, 1500], [0, -350]);

  return (
    <section
      ref={ref}
      className=" relative w-screen mt-40 lg:w-full lg:max-w-[90rem] max-h-[55em]  h-screen mx-auto lg:flex"
    >
      <div className=" w-screen px-5 lg:px-0 pb-5 lg:pt-20 z-10 absolute bottom-0 lg:top-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#1B1B1B] via-[#1B1B1B] lg:via-transparent ">
        {isInView && (
          <SlideUp duration={2}>
            <h2 className="font-black  font-montserrat text-3xl lg:text-8xl">
              DERNIER ARTICLE
            </h2>
          </SlideUp>
        )}
        {isInView && (
          <>
            <SlideUp duration={2}>
              <h3 className="font-bold lg:hidden font-poppins text-xl lg:text-3xl mt-2">
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
              <p className=" lg:hidden font-poppins lg:mt-5 mt-1">
                {post.description}
              </p>
              <div className="flex justify-between items-end text-sm">
                <ClientSideRoute route={`/post/${post.slug.current}`}>
                  <button className="border lg:hidden w-6/12 border-white px-5 py-2 mt-5">
                    Lire l'article
                  </button>
                </ClientSideRoute>
              </div>
            </SlideUp>
          </>
        )}
      </div>

      <Image
        className="object-cover object-center lg:object-right flex lg:hidden"
        src={urlFor(post.mainImage).url()}
        alt={post.author.name}
        fill
      />

      {isInView && (
        <div className="hidden font-benchnine text-2xl  w-4/12 lg:flex z-10 flex-col absolute bottom-52 right-1/2 translate-x-[130%]">
          <SlideUp duration={2}>
            <p className="lg:mt-5 mt-2">{post.description}</p>
            <ClientSideRoute route={`/post/${post.slug.current}`}>
              <button className="btn  px-5 py-2 w-6/12 mt-5">
                Lire l'article
              </button>
            </ClientSideRoute>
          </SlideUp>
        </div>
      )}

      {isInView && (
        <div className="absolute  left-1/2 -translate-x-[250%] z-20 bottom-36">
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
      )}

      {isInView && (
        <div className="lg:flex absolute h-[45rem] w-[30rem] overflow-hidden opacity-80 left-1/2 -translate-x-1/2 bg-blue-200">
          <motion.div
            style={{ y: y2 }}
            className="hidden relative lg:flex h-[150%] w-[100%]"
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
