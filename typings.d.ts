import { Reference } from 'sanity';

type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

interface ImageGallery extends Base {
  author: Author;
  image: Image;
  title: string;
}

interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: string;
  slug: Slug;
  title: string;
  url: string;
  gallery: Image[];
  description: string;
  publishedAt: string;
}

interface Author extends Base {
  bio: Block[];
  image: Image;
  name: string;
  slug: Slug;
}

interface Image {
  _type: 'image';
  asset: Reference;
}

interface Reference {
  _ref: string;
  _type: string;
}

interface Slug {
  _type: 'slug';
  current: string;
}

interface Block {
  _key: string;
  _type: 'block';
  children: Span[];
  markDefs: any[];
  style: 'normal' | 'h1' | 'h2' | 'h3' | 'h4' | 'bloclquote';
}

interface Span {
  _key: string;
  _type: 'span';
  marks: string[];
  text: string;
}

interface Category extends Base {
  description: string;
  title: string;
}
