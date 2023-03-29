import { groq } from 'next-sanity';

import { client } from '../../../../lib/sanity.client';

import { Post } from '../../../../typings';
import { PortableText } from '@portabletext/react';
import RichTextComponents from '../../../../components/RichTextComponents';
import Header from '../../../../components/post/Header';

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
  console.log(slug);
  const query = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    author->,
    categories[]->,
  }`;

  const post: Post = await client.fetch(query, { slug });

  console.log(post);

  return (
    <article>
      <Header post={post} />
      {/* <section className="sapce-y-2 border border-purple-800 text-white">
        <div className="relative min-h-56 flex flex-col md:flex-row justify-between">
          <div className="absolute top-0 w-full h-full opacity-20 blur-sm p-10">
            <Image
              className="object-cover object-center mx-auto"
              src={urlFor(post.mainImage).url()}
              alt={post.author.name}
              fill
            />
          </div>

          <section className="p-5 bg-purple-800 w-full">
            <div className="flex flex-col md:flex-row justify-between gap-y-5">
              <div>
                <h1 className="text-4xl font-extrabold">{post.title}</h1>
                <p>
                  {new Date(post._createdAt).toLocaleDateString('fr', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Image
                  className="rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt={post.author.name}
                  height={40}
                  width={40}
                />

                <div className="w-64">
                  <h3 className="text-lg font-bold">{post.author.name}</h3>
                  
                </div>
              </div>
            </div>

            <div>
              <h2 className="italic pt-10">{post.description}</h2>
              <div className="flex items-center justify-end mt-auto space-x-2">
                {post.categories.map((category) => (
                  <p
                    className="bg-white text-purple-800 rounded-full py-1 px-3 text-sm font-semibold mt-5"
                    key={category._id}
                  >
                    {category.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </div>
      </section> */}
      Hello
      {/* <PortableText value={post.body} components={RichTextComponents} /> */}
    </article>
  );
}

export default OnePost;
