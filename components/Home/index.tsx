"use client";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-brand-black text-brand-white flex min-h-screen flex-col items-center justify-center px-4">
      <section className="flex flex-col md:flex-row items-center justify-center gap-2 w-full max-w-4xl">
        {/* Step 1 */}
        <div className="flex flex-col items-center w-full">
          <div className="flex flex-row items-center justify-between w-full gap-4 flex-wrap">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
              <span className="text-5xl md:text-6xl font-extrabold leading-none font-headline">
                YOU
                <br />
                BUY
                <br />
                TREE.
              </span>
            </div>
            <Image
              src="/images/tree-3.png"
              alt="Tree"
              width={125}
              height={125}
              className="mb-2 md:mb-0"
            />
          </div>
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex flex-row items-center justify-between w-full gap-4 flex-wrap">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
              <span className="text-5xl md:text-6xl font-extrabold leading-none font-headline">
                TREE
                <br />
                GROWS
                <br />
                PEACH.
              </span>
            </div>
            <Image
              src="/images/home_peach.png"
              alt="Peach"
              width={140}
              height={140}
              className="mb-2 md:mb-0"
            />
          </div>
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center gap-2 w-full">
          <div className="flex flex-row items-center justify-between w-full gap-1 flex-wrap">
            <div className="flex flex-col items-center md:flex-row md:items-center gap-4">
              <span className="text-5xl md:text-6xl font-extrabold leading-none font-headline">
                YOU
                <br />
                EAT<span className="align-super text-2xl">*</span>
                <br />
                PEACH.
              </span>
            </div>
            <Image
              src="/images/home_peach_bite.png"
              alt="Peach Bite"
              width={140}
              height={140}
              className="mb-0 md:mb-0"
            />
          </div>
          <p className="text-xs mt-0 text-brand-white/70 w-full">
            *or sell to the marketplace for others to enjoy.
          </p>
        </div>
      </section>

      <div className="flex flex-row items-center justify-center gap-1 mt-6 mb-1">
        <Image
          src="/images/peach_title.png"
          alt="Peach Title"
          width={50}
          height={100}
        />
        <Image
          src="/images/tycoon_title.png"
          alt="Tycoon Title"
          width={100}
          height={100}
        />
      </div>
      <p className="text-xs text-brand-orange">Buy now, munch later.</p>

      <Link
        href="/orchard"
        className="my-6 px-12 py-6 text-2xl font-headline text-brand-red bg-brand-black border-2 border-brand-orange rounded-full hover:bg-orange-500/10 transition-colors duration-200"
      >
        GET TREES
      </Link>

      <Link
        href="/about"
        className="my-3 text-lg font-headline text-brand-orange hover:bg-red-500/10 transition-colors duration-200 underline"
      >
        HOW DOES THIS WORK?
      </Link>
    </div>
  );
}
