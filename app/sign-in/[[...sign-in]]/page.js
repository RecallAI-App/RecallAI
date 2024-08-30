import { SignIn } from "@clerk/nextjs";
import Head from "next/head";

export const dynamic = 'force-dynamic'

export default async function SignIn_Page() {
    return (
        <>
            <Head>
                <title>SignIn</title>
            </Head>
            <main>
                <div className="flex h-screen justify-center items-center">
                    <div className="relative items-center py-12 pb-12 mx-auto mt-12 max-w-7xl">
                        <svg
                        className="absolute -mt-24 blur-3xl"
                        fill="none"
                        viewBox="0 0 400 400"
                        height="100%"
                        width="100%"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <g clipPath="url(#clip0_10_20)">
                            <g filter="url(#filter0_f_10_20)">
                            <path d="M128.6 0H0V322.2L106.2 134.75L128.6 0Z" fill="#03FFE0"></path>
                            <path d="M0 322.2V400H240H320L106.2 134.75L0 322.2Z" fill="#7C87F8"></path>
                            <path d="M320 400H400V78.75L106.2 134.75L320 400Z" fill="#4C65E4"></path>
                            <path d="M400 0H128.6L106.2 134.75L400 78.75V0Z" fill="#043AFF"></path>
                            </g>
                        </g>
                        <defs>
                            <filter
                            colorInterpolationFilters="sRGB"
                            filterUnits="userSpaceOnUse"
                            height="720.666"
                            id="filter0_f_10_20"
                            width="720.666"
                            x="-160.333"
                            y="-160.333"
                            >
                            <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                            <feBlend in="SourceGraphic" in2="BackgroundImageFix" mode="normal" result="shape"></feBlend>
                            <feGaussianBlur result="effect1_foregroundBlur_10_20" stdDeviation="80.1666"></feGaussianBlur>
                            </filter>
                        </defs>
                        </svg>
                        <SignIn/>
                    </div>
                </div>
            </main>
        </>
    );
}