"use client";

import { useState, useEffect } from 'react';
import { SignedIn, SignedOut, UserButton, SignOutButton } from "@clerk/clerk-react";

const Navbar = ({page}) => {
    const [open, setOpen] = useState(false);
    return (
        <section className="relative overflow-hidden bg-white">
        <div className="relative w-full mx-auto max-w-7xl">
          <div className="relative flex flex-col w-full p-5 mx-auto lg:px-16 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex flex-row items-center justify-between text-sm text-black lg:justify-start">
              <a href="/">
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
              
            <nav
              className={`flex-col gap-4 lg:gap-0 items-center flex-grow ${open ? 'flex' : 'hidden'} md:flex md:flex-row md:justify-end md:pb-0 md:space-x-6`}
              >
              <a className="py-2 text-sm font-medium text-black hover:text-black/50" href="#_">
                Contact
              </a>
              <SignedOut>
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

               {(page === "flashcard") && (
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
              )}

              {(page === "generate") && (
                <SignedIn>
                  <a
                    className="text-sm py-2 active:bg-fuchsia-50 active:text-black bg-[#353538] focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 focus:outline-none font-semibold group hover:bg-[#353538]/80 hover:text-[#ffffff] justify-center px-6 rounded-lg text-white"
                    href="/flashcards"
                  >
                    Flashcards
                  </a>
                  <UserButton />
                </SignedIn>
              )}

              {page === "flashcards" && (
                <SignedIn>
                  <a
                    className="text-sm py-2 active:bg-fuchsia-50 active:text-black bg-[#353538] focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 focus:outline-none font-semibold group hover:bg-[#353538]/80 hover:text-[#ffffff] justify-center px-6 rounded-lg text-white"
                    href="/generate"
                  >
                    Generate
                  </a>
                  <UserButton />
                </SignedIn>
              )}
            </nav>
          </div>
        </div>
      </section>
    )
}

export default Navbar;