'use client';
import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { ImageGallery } from '../../typings';
import Image from 'next/image';
import urlFor from '../../lib/urlFor';

interface Props {
  galleryPictures: ImageGallery[];
}

function GallerySection({ galleryPictures }: Props) {
  const ref = useRef(null);
  return (
    <div className="h-screen relative flex flex-col justify-center w-full max-w-[90rem] mx-auto bg-red-200 font-benchnine">
      <div className="w-8/12">
        <h2 className="ext-3xl xl:text-8xl font-montserrat font-black">
          GALLERIE PHOTO
        </h2>
        <p className="text-2xl font-bold w-6/12 mt-5">
          Photographe professionnel, Corentin est l'un des fondateur de
          l'associations et l'actuel président. Aujourd'hui il voyage autour de
          l'Europe à bord de son van, à la recherche de nouvelles histoires
          inspirantes à raconter ou en quête de nouveaux projets
        </p>
      </div>
      <div>
        <div>
          {galleryPictures.map((img, index) => {
            return (
              <div
                className={`absolute h-[35rem] top-10 rotate-[${
                  index + 10
                }] right-44 w-96`}
                key={img._id}
              >
                <Image
                  className="object-cover object-center"
                  alt=""
                  src={urlFor(img.image).url()}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GallerySection;
