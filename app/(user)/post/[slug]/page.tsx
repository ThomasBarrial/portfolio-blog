import { client } from '../../../../lib/sanity.client';
import { Post } from '../../../../typings';
import Header from '../../../../components/post/Header';
import { getAllPosts, getPost, getPostSlug } from '../../../../lib/queries';
import Gallery from '../../../../components/post/Gallery';
import TextSection from '../../../../components/post/TextSection';
import PostFooter from '../../../../components/post/PostFooter';

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
  const allPosts = await client.fetch(getAllPosts);
  const post: Post = await client.fetch(getPost, { slug });

  return (
    <article>
      <Header post={post} />
      <TextSection post={post} allPosts={allPosts} />
      {post.gallery && <Gallery post={post} />}
      <PostFooter post={post} allPosts={allPosts} />
    </article>
  );
}

export default OnePost;
