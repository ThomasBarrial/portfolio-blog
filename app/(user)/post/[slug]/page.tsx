import { groq } from 'next-sanity';

import { client } from '../../../../lib/sanity.client';

import { Post } from '../../../../typings';
import { PortableText } from '@portabletext/react';
import RichTextComponents from '../../../../components/RichTextComponents';
import Header from '../../../../components/post/Header';
import LastArticle from '../../../../components/hompage/LastArticle';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const query = groq`
  *[_type == "post"] {
 slug
  }`;

  const slugs: Post[] = await client.fetch(query);
  const slugRoute = slugs.map((slug) => slug.slug.current);

  return slugRoute.map((slug) => ({
    slug,
  }));
}

async function OnePost({ params: { slug } }: Props) {
  const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    author->,
    categories[]->,
  }`;

  const post: Post = await client.fetch(query, { slug });

  console.log(post.url);

  return (
    <article>
      <Header post={post} />

      <div className="lg:max-w-[90rem] mx-auto px-5 lg:px-10">
        <div className=" mx-auto w-full">
          <PortableText value={post.body} components={RichTextComponents} />
        </div>
      </div>
    </article>
  );
}

export default OnePost;
