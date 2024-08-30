"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "@firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Flashcards() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const router = useRouter();
    const { user, isSignedIn } = useUser();
    // console.log("USER DETAILS", user);

    useEffect(() => {
        if (user) {
            const getFlashcards = async () => {
                try {
                    const userDocRef = doc(db, "users", user.id);
                    const docSnap = await getDoc(userDocRef);

                    if (docSnap.exists()) {
                        const collections = docSnap.data().flashcards || [];
                        setFlashcards(collections);
                    } else {
                        console.log("No such document!");
                    }
                } catch (error) {
                    console.error("Error fetching flashcards:", error);
                } finally {
                    setIsLoaded(true);
                }
            };
            getFlashcards();
        }
    }, [user]);

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1 className="text-4xl font-bold text-black">Loading...</h1>
            </div>
        );
    }

    const handleCardClick = (flashcardName) => {
        router.push(`/flashcard?id=${flashcardName}`);
    };

    const handleCardDelete = (flashcardName) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this flashcard?");
        if (confirmDelete && user) {
            const userDocRef = doc(db, "users", user.id);
            getDoc(userDocRef)
                .then((docSnap) => {
                    if (docSnap.exists()) {
                        const collections = docSnap.data().flashcards || [];
                        const updatedCollections = collections.filter(
                            (collection) => collection.flashcardName !== flashcardName
                        );
                        return setDoc(userDocRef, { flashcards: updatedCollections }, { merge: true });
                    } else {
                        console.log("No such document!");
                    }
                })
                .then(() => {
                    setFlashcards((prevFlashcards) =>
                        prevFlashcards.filter((flashcard) => flashcard.flashcardName !== flashcardName)
                    );
                })
                .catch((error) => {
                    console.error("Error deleting flashcard:", error);
                });
        }
    };

    return (
        <section>
            <Navbar page="flashcards" />
            <div className="relative overflow-hidden">
                <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
                            Welcome back, {user.firstName}!
                        </h1>
                    {flashcards.length === 0 ? (

                        <p className="mt-3 text-gray-600 dark:text-neutral-400">
                            You have not generated any flashcards yet.
                        </p>
                    ) : (
                        <p className="mt-3 text-gray-600 dark:text-neutral-400">
                            Here are the list of flashcards you have generated.
                        </p>
                    )}


                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            <div className="hidden md:block absolute top-0 end-0 -translate-y-12 translate-x-20">
                                <svg className="w-16 h-auto text-orange-500" width="121" height="135" viewBox="0 0 121 135" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 16.4754C11.7688 27.4499 21.2452 57.3224 5 89.0164" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                                    <path d="M33.6761 112.104C44.6984 98.1239 74.2618 57.6776 83.4821 5" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                                    <path d="M50.5525 130C68.2064 127.495 110.731 117.541 116 78.0874" stroke="currentColor" strokeWidth="10" strokeLinecap="round"/>
                                </svg>
                            </div>

                            <div className="hidden md:block absolute bottom-0 start-0 translate-y-10 -translate-x-32">
                                <svg className="w-40 h-auto text-cyan-500" width="347" height="188" viewBox="0 0 347 188" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4 82.4591C54.7956 92.8751 30.9771 162.782 68.2065 181.385C112.642 203.59 127.943 78.57 122.161 25.5053C120.504 2.2376 93.4028 -8.11128 89.7468 25.5053C85.8633 61.2125 130.186 199.678 180.982 146.248L214.898 107.02C224.322 95.4118 242.9 79.2851 258.6 107.02C274.299 134.754 299.315 125.589 309.861 117.539L343 93.4426" stroke="currentColor" strokeWidth="7" strokeLinecap="round"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {flashcards.map((flashcard, index) => (
                    <div key={flashcard.flashcardName} className="flex justify-center items-center">
                        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                            <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
                                    <div key={index} className="flex items-center justify-between p-3 py-1 pl-4 pr-1 rounded-lg transition-all hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900 hover:bg-[#f0f0f0]/80 focus:shadow-md focus:ring-2 focus:ring-blue-gray-500 focus:ring-opacity-50">
                                        <span role="button" onClick={() => handleCardClick(flashcard.flashcardName)} className="flex-grow text-start">
                                            {flashcard.flashcardName}
                                        </span>

                                        <button 
                                            onClick={() => handleCardDelete(flashcard.flashcardName)}
                                            className="relative h-10 w-10 max-h-[40px] max-w-[40px] rounded-lg text-blue-gray-500 hover:bg-blue-gray-500/10 active:bg-blue-gray-500/30 transition-all"
                                            type="button"
                                            aria-label="Delete flashcard"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                                <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                            </nav>
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
