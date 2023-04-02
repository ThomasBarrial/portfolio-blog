'use client';
import React, { useEffect, useRef, useState } from 'react';
import SlideUp from '../animated/SlideUp';
import {
  useInView,
  useViewportScroll,
  useTransform,
  motion,
} from 'framer-motion';
import { Category, Post } from '../../typings';
import Image from 'next/image';
import urlFor from '../../lib/urlFor';
import ClientSideRoute from '../ClientSideRoute';

interface IProps {
  posts: Post[];
  categories: Category[];
}

function ListArticles({ posts, categories }: IProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
  });
  const [animate, setAnimate] = useState(true);
  const [categorySelected, setCategorySelected] = useState('All');
  const { scrollY } = useViewportScroll();
  const [postList, setPostList] = useState(posts);

  const y2 = useTransform(scrollY, [200, 16000], [0, -1500]);

  useEffect(() => {
    if (categorySelected === 'All') {
      setPostList(posts);
    } else {
      const newPostList = [];
      for (let i = 0; i < posts.length; i++) {
        const postCategory = posts[i].categories.filter(
          (c) => c.title === categorySelected
        );

        if (postCategory.length > 0) {
          newPostList.push(posts[i]);
        }
      }

      setPostList(newPostList);
    }
  }, [categorySelected]);

  const handleClick = () => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 10);
  };

  return (
    <div
      ref={ref}
      className="md:w-screen mx-auto  max-w-[90rem] xl:mt-32 h-full w-screen"
    >
      <div className="sticky top-0  z-20">
        {isInView && (
          <>
            <SlideUp
              className=" px-5 bg-[#1B1B1B] flex items-end h-32 xl:h-44 pb-5 xl:px-0"
              duration={2}
            >
              <h2 className="font-black  font-montserrat  text-3xl xl:text-8xl">
                TOUS NOS ARTICLES
              </h2>
            </SlideUp>
          </>
        )}
      </div>
      <div className="xl:w-3/12 px-5 xl:px-0 bg-[#1B1B1B] flex sticky z-10 top-28 xl:top-44">
        {isInView && (
          <div className="flex xl:flex-col items-start xl:space-x-0 space-x-1 w-full flex-wrap">
            <SlideUp duration={1.8}>
              <button
                onClick={() => {
                  setAnimate(false);
                  setTimeout(() => {
                    setAnimate(true);
                  }, 100);
                  setCategorySelected('All'), handleClick;
                }}
                className={`${
                  categorySelected === 'All'
                    ? 'opacity-100'
                    : 'opacity-60  transform hover:opacity-100 duration-500'
                } font-benchnine text-xl xl:text-5xl font-bold mx-1 uppercase flex`}
              >
                TOUS <span className="flex xl:hidden"> / </span>
              </button>
            </SlideUp>
            {categories.map((category, index) => {
              return (
                <SlideUp key={category._id} duration={2 + index * 0.8}>
                  <button
                    onClick={() => {
                      setAnimate(false);
                      setTimeout(() => {
                        setAnimate(true);
                      }, 100);
                      setCategorySelected(category.title);
                    }}
                    className={`font-benchnine text-xl xl:text-5xl font-bold uppercase ${
                      categorySelected === category.title
                        ? 'opacity-100'
                        : 'opacity-50  transform hover:opacity-100 duration-500'
                    }`}
                    key={category._id}
                  >
                    <p>
                      {category.title}
                      <span className="xl:hidden"> / </span>
                    </p>
                  </button>
                </SlideUp>
              );
            })}
          </div>
        )}
      </div>
      <div className="hidden xl:flex justify-end ">
        <div className="flex min-h-screen  space-x-14 flex-wrap w-9/12 -translate-y-80 ">
          {animate && isInView && (
            <>
              {postList.map((post, index) => {
                return (
                  <SlideUp duration={1}>
                    <div
                      className={`w-[26rem] font-benchnine relative overflow-hidden mt-28 ${
                        index % 2 !== 0
                          ? `translate-y-14 ${
                              postList.length <= 2 ? 'h-[35rem]' : 'h-[40rem]'
                            }`
                          : 'h-[35rem]'
                      }`}
                    >
                      <div
                        className={`absolute p-5 w-full z-20 bg-gradient-to-t bg-opacity-50 from-[#1b1b1bcd] via-[#1b1b1ba9]  ${
                          index % 2 !== 0
                            ? ` ${
                                postList.length <= 2 ? 'bottom-0' : 'bottom-14'
                              }`
                            : 'bottom-0'
                        }`}
                      >
                        <SlideUp duration={1}>
                          <h3 className="font-bold  font-benchnine text-2xl lg:text-3xl mt-1">
                            {post.title}
                          </h3>
                        </SlideUp>
                        <SlideUp duration={1}>
                          <p className="mt-2 font-benchnine text-xl">
                            <span>{post.author.name}</span>.
                            <span>
                              {' '}
                              {new Date(post.publishedAt).toLocaleDateString(
                                'fr-FR',
                                {
                                  day: 'numeric',
                                  month: 'long',
                                  year: 'numeric',
                                }
                              )}
                            </span>
                          </p>
                        </SlideUp>
                        <SlideUp duration={1}>
                          <p className="text-xl font-benchnine mt-1">
                            {post.description}
                          </p>
                          <div className="flex justify-between items-end text-sm">
                            <ClientSideRoute
                              route={`/post/${post.slug.current}`}
                            >
                              <button className=" w-full font-benchnine btn px-20 py-2 mt-5">
                                Lire l'article
                              </button>
                            </ClientSideRoute>
                          </div>
                        </SlideUp>
                      </div>

                      <motion.div
                        style={{ y: y2 }}
                        className="h-[150%] translate-y-96 z-10 relative w-[100%] "
                      >
                        <Image
                          className="object-cover object-center flex"
                          src={urlFor(post.mainImage).url()}
                          alt={post.author.name}
                          fill
                        />
                      </motion.div>
                    </div>
                  </SlideUp>
                );
              })}
            </>
          )}
        </div>
      </div>

      {postList.map((post) => {
        return (
          <>
            <div className="h-screen xl:hidden relative " key={post._id}>
              <div className="w-screen   h-3/4 flex flex-col justify-end px-5 pb-10 z-10 absolute bottom-0  bg-gradient-to-t  from-[#1B1B1B] via-[#1B1B1B]">
                <SlideUp duration={1}>
                  <h3 className="font-bold font-benchnine text-3xl mt-2">
                    {post.title}
                  </h3>
                </SlideUp>
                <SlideUp duration={1}>
                  <p className="mt-2 font-benchnine text-xl">
                    <span>{post.author.name}</span>.
                    <span>
                      {' '}
                      {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </p>
                </SlideUp>
                <SlideUp duration={1}>
                  <p className="font-benchnine text-xl w-full mt-1">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-end text-sm">
                    <ClientSideRoute route={`/post/${post.slug.current}`}>
                      <button className="border font-benchnine text-xl  w-full border-white px-10 py-2 mt-5">
                        Lire l'article
                      </button>
                    </ClientSideRoute>
                  </div>
                </SlideUp>
              </div>

              <Image
                className="object-cover object-center flex "
                src={urlFor(post.mainImage).url()}
                alt={post.author.name}
                fill
              />
            </div>
          </>
        );
      })}

      <div></div>
    </div>
  );
}

export default ListArticles;
