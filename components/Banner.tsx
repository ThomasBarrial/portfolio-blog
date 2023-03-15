import React from "react";

function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-bold px-10 py-5 mb-10">
      <div>
        <h1 className="text-6xl">Boby's Daily Blog</h1>
        <h2 className="mt-5 md:mt-2">
          Welcome to
          <span className="underline decoration-4 decoration-purple-600">
            Every Developers
          </span>{" "}
          favourite blog in surf universe
        </h2>
      </div>
      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm">
        New product feature | the latest in technology | the weekly debiugging
        nightmares & more
      </p>
    </div>
  );
}

export default Banner;
