'use client';
import { PortableText } from '@portabletext/react';
import { Post } from '../../typings';
import SlideUp from '../animated/SlideUp';
import RichTextComponents from '../RichTextComponents';
import StickyNavComponent from './StickyNavComponent';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface Props {
  post: Post;
  allPosts: Post[];
}

function TextSection({ post, allPosts }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 100px -50px 0px',
  });

  return (
    <div className="lg:max-w-[90rem] mx-auto lg:flex pb-32">
      <div
        ref={ref}
        className=" mx-auto w-10/12 font-benchnine px-5 text-xl lg:text-2xl lg:px-10"
      >
        {isInView && (
          <SlideUp duration={2} scaleInit={0.8} scaleFinish={1}>
            <PortableText value={post.body} components={RichTextComponents} />
          </SlideUp>
        )}
      </div>
      {isInView && <StickyNavComponent post={post} allPost={allPosts} />}
    </div>
  );
}

export default TextSection;
