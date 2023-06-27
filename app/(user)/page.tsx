import { previewData } from 'next/headers';
import { groq } from 'next-sanity';
import { client } from '../../lib/sanity.client';
import PreviewSuspense from '../../components/PreviewSuspense';
import PreviewBlogList from '../../components/PreviewBlogList';
import { cache } from 'react';
import HomeBanner from '../../components/hompage/HomeBanner';
import LastArticle from '../../components/hompage/LastArticle';
import ListArticles from '../../components/hompage/ListArticles';
import {
  getAllCategories,
  getAllPosts,
  homeGalleryPictures,
} from '../../lib/queries';
import Footer from '../../components/hompage/Footer';
import GallerySection from '../../components/hompage/GallerySection';

// Enable NextJS to cache and dedupe queries
const clientFetch = cache(client.fetch.bind(client));

export const revalidate = 60;

type AppPreviewData = { token: string };

export default async function HomePage() {
  if ((previewData() as AppPreviewData)?.token) {
    return (
      <PreviewSuspense
        fallback={
          <div role="status">
            {/* CREATE A LOADER */}
            <p className="text-center text-lg animate-pulse">
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
  const galleryPictures = await clientFetch(homeGalleryPictures);

  return (
    <>
      <HomeBanner />
      <LastArticle post={posts[0]} />
      <ListArticles posts={posts} categories={categories} />
      {/* <GallerySection galleryPictures={galleryPictures} /> */}
      <Footer />
    </>
  );
}
