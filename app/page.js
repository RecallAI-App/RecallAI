"use client";

import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import { useEffect } from 'react';

const Hero = dynamic(() => import("./components/Hero"), { ssr: false });
const Features = dynamic(() => import("./components/Features"), { ssr: false });
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: false });
const Team = dynamic(() => import("./components/Team"), { ssr: false });
const Testimonials = dynamic(() => import("./components/Testimonials"), { ssr: false });

export default function Home() {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      const createUserQuota = async () => {
        const id = user?.id;
        const publicMetaData = user?.publicMetadata;
        if (Object.keys(publicMetaData || {}).length === 0) {
          const createUserQuotaResponse = await fetch(`/api/createUserQuota`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: id }),
          });

          const data = await createUserQuotaResponse.json();
          // console.log("DATA", data);
        }
      }
      createUserQuota();
    }
  }, [isSignedIn, user]);

  return (
    <main>
      <Hero/>
      <Features/>
      <Testimonials/>
      <Team/>
      <FAQ/>
    </main>
  );
}