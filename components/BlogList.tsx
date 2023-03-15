import { Post } from '../typings';
import Image from 'next/image';
import urlFor from '../lib/urlFor';
import category from '../schemas/category';
import { ArrowUpRightIcon } from '@heroicons/react/24/solid';
import ClientSideRoute from './ClientSideRoute';

type Props = {
  posts: Post[];
};

function BlogList({ posts }: Props) {
  return (
    <div>
      <hr className="border-purple-800 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 px-10 gap-10 gap-y-16 pb-24">
        {/* Posts */}

        {posts.map((post) => (
          <ClientSideRoute key={post._id} route={`/post/${post.slug.current}`}>
            <div className="group flex flex-col cursor-pointer">
              <div className="relative w-full h-80 drop-shadow-xl group-hover:scale-105 transition-transform duration-200 ease-out">
                <Image
                  className="object-cover object-left lg:object-center"
                  src={urlFor(post.mainImage).url()}
                  alt={post.author.name}
                  fill
                />
                <div className="absolute bottom-0 w-full  bg-opacity-20  bg-black drop-shadow-lg  rounded text-white flex p-5 justify-between">
                  <div>
                    <p className="font-bold">{post.title}</p>
                    <p>
                      {new Date(post._createdAt).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </p>
                  </div>

                  <div>
                    {post.categories.map((category) => (
                      <div
                        key={category._id}
                        className="bg-purple-800 text-center text-sm font-semibold px-3 py-1 rounded-full"
                      >
                        <p>{category.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex-1">
                <p className="underline text-lg font-bold">{post.title}</p>
                <p className="line-clamp-2 text-gray-500">{post.description}</p>
              </div>

              <p className="flex items-center mt-5 font-bold group-hover:underline">
                Read Post
                <ArrowUpRightIcon className="ml-2 h-4 w-4" />
              </p>
            </div>
          </ClientSideRoute>
        ))}
      </div>
    </div>
  );
}

export default BlogList;
