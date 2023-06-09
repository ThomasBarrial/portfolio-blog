import Image from 'next/image';
import Link from 'next/link';
import urlFor from '../lib/urlFor';

const RichTextComponents = {
  types: {
    image: ({ value, isInLine }: any) => {
      return (
        <div className={'relative flex  h-96 m-10 mx-auto'}>
          <Image
            className="object-contain object-left"
            src={urlFor(value).fit('crop').crop('focalpoint').quality(80).url()}
            alt="Blog Post Image"
            fill
            sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="mt-lg list-decimal">{children}</ol>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-5xl  pb-5 pt-10 font-benchnine lg:text-4xl font-extrabold">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-4xl pb-5 pt-10 font-benchnine lg:text-4xl font-extrabold">
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-3xl  pb-5 pt-10 font-benchnine lg:text-4xl font-extrabold">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl  pb-5 pt-10 font-benchnine lg:text-4xl font-extrabold">
        {children}
      </h4>
    ),
  },

  blockquote: ({ children }: any) => {
    <blockquote className="border-l-white border-l-4 pl-5 py-5 my-5">
      {children}
    </blockquote>;
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/')
        ? 'noreferrer noopener'
        : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          target="_blank"
          className="underline decoration-white hover:font-bold"
        >
          {children}
        </Link>
      );
    },
  },
};

export default RichTextComponents;
