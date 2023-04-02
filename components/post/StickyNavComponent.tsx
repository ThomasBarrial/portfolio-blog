'use client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import { Post } from '../../typings';
import SlideUp from '../animated/SlideUp';
import ClientSideRoute from '../ClientSideRoute';

interface IProps {
  post: Post;
  allPost: Post[];
}

function StickyNavComponent({ post, allPost }: IProps) {
  const [postList, setPostList] = useState<Post[]>([]);

  function getSimilarPosts(posts: Post[], post: Post) {
    const similarPosts = [];

    for (const p of posts) {
      let array1: string[] = [];
      let array2: string[] = [];
      p.categories.forEach((c) => array1.push(c.title));
      post.categories.forEach((c) => array2.push(c.title));

      if (p.title !== post.title && array2.some((c) => array1.includes(c))) {
        similarPosts.push(p);
      }
    }
    return similarPosts;
  }

  useEffect(() => {
    setPostList(getSimilarPosts(allPost, post));
  }, []);

  return (
    <div className=" hidden  lg:flex flex-col border-l  border-white  w-5/12 h-full font-benchnine text-2xl sticky top-16">
      <div className="px-10">
        <SlideUp duration={2} scaleInit={0.8} scaleFinish={1}>
          <h3 className="uppercase text-4xl">A PROPOS DE CETTE ARTICLE</h3>
        </SlideUp>
        <div className="mt-3">
          <SlideUp duration={2} scaleInit={0.8} scaleFinish={1}>
            <h4>{post.title}</h4>
          </SlideUp>
          <SlideUp duration={2} scaleInit={0.8} scaleFinish={1}>
            <p className="text-xl opacity-70">
              {post.author.name} /
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
          <SlideUp duration={2} scaleInit={0.8} scaleFinish={1}>
            {post.url && (
              <div className="transform mt-10 underline cursor-pointer">
                <Link href={post.url} target="_blank">
                  Vidéo Youtube associée
                </Link>
              </div>
            )}
          </SlideUp>
        </div>
      </div>

      <div className="mt-12">
        <SlideUp duration={2} scaleInit={0.8} scaleFinish={1}>
          <h3 className="uppercase text-4xl px-10">Sur le même sujet</h3>
        </SlideUp>
        <div className="space-y-5 mt-3 flex flex-col px-5">
          {postList.slice(0, 3).map((p) => {
            return (
              <SlideUp key={p._id} duration={2} scaleInit={0.8} scaleFinish={1}>
                <div className="transform hover:scale-105 px-5  duration-300">
                  <ClientSideRoute route={`/post/${p.slug.current}`}>
                    <h4>{p.title}</h4>
                    <div className="flex text-lg opacity-70">
                      {' '}
                      <p>{post.author.name} . </p>
                      <p>
                        {' '}
                        {new Date(post.publishedAt).toLocaleDateString(
                          'fr-FR',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </p>
                    </div>
                    <button className="underline flex items-end w-full mt-2 text-lg">
                      Lire l'article
                    </button>
                  </ClientSideRoute>
                </div>
              </SlideUp>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default StickyNavComponent;
