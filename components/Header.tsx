import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

function Header() {
  return (
    <header className="flex items-center justify-between space-x-2  py-5 ">
      <div className="flex items-center justify-between space-x-2 ">
        <Link href="/">
          <Image
            src="https://media.istockphoto.com/id/810778830/fr/vectoriel/%C3%A9t%C3%A9-paradise-surf-club-ic%C3%B4ne-mod%C3%A8le-noir-et-blanc-vector-illustration.jpg?s=612x612&w=0&k=20&c=7TOuQJq2NTS5N18ojUghJQotvM66xaQSOASXkffiE3w="
            alt="logo"
            height={100}
            width={100}
          />
        </Link>
      </div>
      <div>
        <Link
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold px-5 bg-gray-900  text-sm md:text-base text-purple-300 py-3 rounded-full"
          href="https://portfolio-thomas-barrial.vercel.app/"
        >
          Back to the portfolio
        </Link>
      </div>
    </header>
  );
}

export default Header;
