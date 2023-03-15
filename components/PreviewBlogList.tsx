'use client';

import { usePreview } from '../lib/sanity.preview';
import BlogList from './BlogList';

type Props = {
  query: string;
  token: string;
};

export default function PreviewBlogList({ query, token }: Props) {
  console.log(query);

  const posts = usePreview(token, query);

  return (
    <div>
      <BlogList posts={posts} />
    </div>
  );
  // return <div>preview</div>;
}
