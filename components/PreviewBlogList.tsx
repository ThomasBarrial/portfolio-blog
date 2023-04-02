'use client';
import { usePreview } from '../lib/sanity.preview';
import ListArticles from './hompage/ListArticles';

type Props = {
  query: string;
  token: string;
  categorieQuery: string;
};

export default function PreviewBlogList({
  query,
  token,
  categorieQuery,
}: Props) {
  const posts = usePreview(token, query);
  const categories = usePreview(token, categorieQuery);

  return (
    <div>
      <ListArticles categories={categories} posts={posts} />
    </div>
  );
}
