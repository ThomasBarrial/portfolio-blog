'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SlideDown from './animated/SlideDown';
import SlideUp from './animated/SlideUp';
import ClientSideRoute from './ClientSideRoute';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen((prev) => !prev);
  };

  const pagesLink = [
    {
      name: 'Acceuil',
      route: '/',
    },
    {
      name: 'Youtube',
      route: 'https://www.youtube.com/channel/UCRDYUwd5BPa860_en7u4WkQ',
    },
    {
      name: 'Instagram',
      route: 'https://www.instagram.com/rakonto_ngo/',
    },
    {
      name: 'Facebook',
      route: 'https://www.facebook.com/rakontoassociation',
    },
  ];

  return (
    <header
      className={`py-5  px-5 lg:px-10 bg-gradient-to-b from-[#1B1B1B] fixed top-0  font-benchnine text-xl overflow-x-hidden  w-screen z-50`}
    >
      <div className="flex mx-auto items-center justify-between">
        <ClientSideRoute route={`/`}>
          <SlideDown delay={1} duration={2}>
            <button className="font-black text-2xl">RAKONTO</button>
          </SlideDown>
        </ClientSideRoute>
        {/* DESKTOP COMPONENT  */}

        <div className="hidden  lg:flex flex-row space-x-10">
          {pagesLink.map((item) => {
            return (
              <SlideDown
                key={item.name}
                scaleInit={0.2}
                scaleFinish={1}
                delay={1}
                duration={2}
                className="group"
              >
                <Link
                  href={item.route}
                  target={item.name !== 'Acceuil' ? '_blank ' : ''}
                >
                  {item.name}
                  <hr className="h-1 transform  group-hover:translate-x-0 -translate-x-[105%] duration-300" />
                </Link>
              </SlideDown>
            );
          })}
        </div>

        {/* MOBILE COMPONENTS */}
        <div
          className={`fixed bg-[#1B1B1B] lg:hidden z-20  px-8 py-10 h-screen w-screen top-0 transition-transform  left-0 ${
            isOpen ? 'translate-x-0 bg-opacity-100' : 'translate-x-full'
          } duration-700 ease-in-out`}
        >
          <button
            onClick={onClick}
            className="  text-lg w-full flex justify-end font-bold"
          >
            Close
          </button>
          {isOpen && (
            <div className=" h-full flex flex-col justify-between">
              <div className="font-black text-6xl uppercase space-y-10 mt-20">
                {pagesLink.map((item, index) => {
                  return (
                    <SlideUp
                      key={item.name}
                      scaleInit={0.2}
                      scaleFinish={1}
                      duration={2 + index * 0.2}
                    >
                      <Link href={item.route}>
                        {' '}
                        <button
                          className="uppercase"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.name}{' '}
                        </button>
                      </Link>
                    </SlideUp>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClick}
          className=" flex items-center lg:hidden justify-center border border-white rounded-full h-10 w-10"
        >
          <div className="space-y-1 mx-auto">
            <hr
              className={`bg-white h-[2px] w-5 transition-transform ${
                isOpen && 'rotate-45 translate-y-[6px]'
              } duration-300 ease-in rounded-full`}
            />
            <hr
              className={`bg-white h-[2px] w-5 transition-transform  ${
                isOpen && 'opacity-0 duration-300 ease-in'
              }   rounded-full`}
            />
            <hr
              className={`bg-white h-[2px] w-5 transition-transform ${
                isOpen && '-rotate-45 -translate-y-[6px]'
              } duration-300 ease-in rounded-full`}
            />
          </div>
        </button>
      </div>
    </header>
  );
}

export default Header;
