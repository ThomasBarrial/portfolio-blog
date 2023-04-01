import { groq } from 'next-sanity';
import { client } from '../../../../lib/sanity.client';
import { Post } from '../../../../typings';
import Header from '../../../../components/post/Header';
import { getAllPosts, getPostSlug } from '../../../../lib/queries';
import Gallery from '../../../../components/post/Gallery';
import TextSection from '../../../../components/post/TextSection';

type Props = {
  params: {
    slug: string;
  };
};

export const revalidate = 30;

export async function generateStaticParams() {
  const slugs: Post[] = await client.fetch(getPostSlug);
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

  const allPosts = await client.fetch(getAllPosts);

  const post: Post = await client.fetch(query, { slug });

  return (
    <article>
      <Header post={post} />
      <TextSection post={post} allPosts={allPosts} />
      {post.gallery && <Gallery post={post} />}
    </article>
  );
}

export default OnePost;
