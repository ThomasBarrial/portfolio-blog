import { previewData } from 'next/headers';
import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';
import PreviewSuspense from '../../components/PreviewSuspense';
import PreviewBlogList from '../../components/PreviewBlogList';
import { cache } from 'react';
import HomeBanner from '../../components/hompage/HomeBanner';
import LastArticle from '../../components/hompage/LastArticle';
import ListArticles from '../../components/hompage/ListArticles';

const query = groq`
*[_type == "post"] {
    ...,
    author->,
    categories[]->
} | order(_createdAt desc)
`;

const categoriesQuery = groq`
*[_type == "category"] {
    ...
} | order(_createdAt desc)`;
// Enable NextJS to cache and dedupe queries
const clientFetch = cache(client.fetch.bind(client));

export const revalidate = 30;

type AppPreviewData = { token: string };

export default async function HomePage() {
  if ((previewData() as AppPreviewData)?.token) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            {/* CREATE A LOADER */}
            <p className="text-center text-lg animate-pulse text-purple-800">
              Loading Preview data....
            </p>
          </div>
        }
      >
        <PreviewBlogList
          query={query}
          categorieQuery={categoriesQuery}
          token={(previewData() as AppPreviewData).token}
        />
      </PreviewSuspense>
    );
  }

  const posts = await clientFetch(query);
  const categories = await clientFetch(categoriesQuery);

  return (
    <>
      <HomeBanner />
      {/* <GetScrollPosition /> */}
      <LastArticle post={posts[0]} />
      <ListArticles posts={posts} categories={categories} />
    </>
  );
}
