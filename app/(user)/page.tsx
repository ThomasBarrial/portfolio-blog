import { previewData } from 'next/headers';
import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';
import PreviewSuspense from '../../components/PreviewSuspense';
import PreviewBlogList from '../../components/PreviewBlogList';
import { cache } from 'react';
import HomeBanner from '../../components/hompage/HomeBanner';
import LastArticle from '../../components/hompage/LastArticle';
import ListArticles from '../../components/hompage/ListArticles';
import { getAllCategories, getAllPosts } from '../../lib/queries';

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
          query={getAllPosts}
          categorieQuery={getAllCategories}
          token={(previewData() as AppPreviewData).token}
        />
      </PreviewSuspense>
    );
  }

  const posts = await clientFetch(getAllPosts);
  const categories = await clientFetch(getAllCategories);

  return (
    <>
      <HomeBanner />
      {/* <GetScrollPosition /> */}
      <LastArticle post={posts[0]} />
      <ListArticles posts={posts} categories={categories} />
    </>
  );
}
