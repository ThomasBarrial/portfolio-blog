import { groq } from 'next-sanity';

export const getAllPosts = groq`
*[_type == "post"] {
    ...,
    author->,
    categories[]->
} | order(_createdAt desc)
`;

export const getAllCategories = groq`
*[_type == "category"] {
    ...
} | order(_createdAt desc)`;

export const getPostSlug = groq`
*[_type == "post"] {
slug
}`;

export const getPost = groq`
*[_type == "post" && slug.current == $slug][0] {
  ...,
  author->,
  categories[]->,
}`;
