"use client";

import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import SplineWrapper from './SplineWrapper';

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
      setIsMounted(true);
  }, []);

  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative overflow-hidden bg-white">
        <div className="relative w-full mx-auto max-w-7xl">
          <div className="relative flex flex-col w-full p-5 mx-auto lg:px-16 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex flex-row items-center justify-between text-sm text-black lg:justify-start">
            <a href="/" className="text-black hover:text-[#0000ff]">
              <div>
                <p>RecallAI</p>
              </div>
            </a>
            <a
              onClick={() => setOpen(!open)}
              className="items-center justify-center focus:outline-none focus:text-black hover:text-[#0000ff] inline-flex md:hidden p-2 text-black"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  className={`${open ? 'hidden' : 'inline-flex'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
                <path
                  d="M6 18L18 6M6 6l12 12"
                  className={`${!open ? 'hidden' : 'inline-flex'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </a>
            </div>
            <div>
              
            <nav
              className={`flex-col gap-4 lg:gap-0 items-center flex-grow ${open ? 'flex' : 'hidden'} md:flex md:flex-row md:justify-end md:pb-0 md:space-x-6`}
              >
                    {isMounted && (
                        <>
                          <SignedOut>
                            <a className="py-2 text-sm font-medium text-black hover:text-black/50" href="#_">
                              Contact
                            </a>
                            <a className="py-2 text-sm font-medium text-black hover:text-black/50" href="/sign-in">
                                Sign in
                            </a>
                            <a
                                className="text-sm py-2 active:bg-fuchsia-50 active:text-black bg-[#353538] focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 focus:outline-none font-semibold group hover:bg-[#353538]/80 hover:text-[#ffffff] justify-center px-6 rounded-lg text-white"
                                href="/sign-up"
                            >
                                Sign up
                            </a>
                          </SignedOut>
                          <SignedIn>
                            <a
                                className="text-sm py-2 active:bg-fuchsia-50 active:text-black bg-[#353538] focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 focus:outline-none font-semibold group hover:bg-[#353538]/80 hover:text-[#ffffff] justify-center px-6 rounded-lg text-white"
                                href="/flashcards"
                            >
                                Flashcards
                            </a>
                            <a
                                  className="text-sm py-2 active:bg-fuchsia-50 active:text-black bg-[#353538] focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 focus:outline-none font-semibold group hover:bg-[#353538]/80 hover:text-[#ffffff] justify-center px-6 rounded-lg text-white"
                                  href="/generate"
                              >
                                  Generate
                              </a>
                              <UserButton />
                            </SignedIn>
                        </>
                    )}
                </nav>
            </div>
            
          </div>
        </div>
      </section>
      <section className="relative flex items-center justify-center">
        <div className="relative items-center w-full px-5 py-12 mx-auto max-w-7xl lg:px-16 lg:py-32 md:px-12">
          <div>
            <div className="text-center">
              <p className="mt-8 text-3xl font-extrabold tracking-tight text-black lg:text-6xl">
                Struggling to
                <span className="px-1 lg:block">retain what you study?</span>
              </p>
              <p className="max-w-xl mx-auto mt-4 text-base lg:text-xl text-slate-500">
                We help boost retention with personalized, adaptive flashcards for effective learning
              </p>
            </div>
          </div>
          <div className="">
          {isMounted && <SplineWrapper />}
            {/* <img
              alt=""
              className="relative object-cover w-full border rounded shadow-2xl lg:rounded-2xl"
              src="/thumbnail.png"
            /> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
