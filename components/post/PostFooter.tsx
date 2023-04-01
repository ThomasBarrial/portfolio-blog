'use client';
import React, { useEffect, useState } from 'react';
import { Post } from '../../typings';
import ClientSideRoute from '../ClientSideRoute';

interface Props {
  post: Post;
  allPosts: Post[];
}

function PostFooter({ post, allPosts }: Props) {
  const [nextPost, setNextPost] = useState<Post>();

  useEffect(() => {
    let NextPostIndex = -1;

    for (let i = 0; i < allPosts.length; i++) {
      if (post._id === allPosts[i]._id) {
        NextPostIndex = i;
        break;
      }
    }

    if (NextPostIndex < allPosts.length) {
      setNextPost(allPosts[NextPostIndex + 1]);
    }
  }, []);

  return (
    <div className="w-full mb-10 px-5 lg:px-10 mt-20 lg:max-w-[90rem] mx-auto  uppercase font-benchnine text-2xl flex flex-col lg:flex-row lg:justify-between">
      <div className="flex space-x-2 mb-3 lg:mb-0 opacity-50">
        {post.categories.map((c) => {
          return <p>{c.title} |</p>;
        })}
      </div>
      {nextPost && (
        <ClientSideRoute route={`/post/${nextPost.slug.current}`}>
          <p>
            ARTICLE SUIVANT :{' '}
            <span className="uppercase underline font-benchnine text-xl">
              {nextPost.title}
            </span>
          </p>
        </ClientSideRoute>
      )}
    </div>
  );
}

export default PostFooter;
