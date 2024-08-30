"use client";

import { useSearchParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Navbar from "../components/Navbar";

export default function Flashcard() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [userData, setUserData] = useState(null);

    const searchParams = useSearchParams();
    const search = searchParams.get("id");

    const { user, isSignedIn } = useUser();
    // console.log("user", user);

    useEffect(() => {
        if (!search || !user) {
            setIsLoaded(true);
            return;
        }

        const subCollectionRef = collection(db, "users", user.id, search);
        getDocs(subCollectionRef)
            .then((subCollectionSnap) => {
                const fetchedFlashcards = [];
                subCollectionSnap.forEach((doc) => {
                    fetchedFlashcards.push({ id: doc.id, ...doc.data() });
                });
                setFlashcards(fetchedFlashcards);
                // console.log("Fetched Flashcards:", fetchedFlashcards);
            })
            .catch((error) => {
                console.error("Error fetching flashcards:", error);
            })
            .finally(() => {
                setIsLoaded(true);
            });
    }, [user, search]);

    const handleCardClick = (index) => {
        const card = document.querySelector('.card');
        
    }

    if (!isLoaded) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1 className="text-4xl font-bold text-black">Loading...</h1>
            </div>
        )
    }

    if (!isSignedIn) {
        return (
            <div className="flex h-screen justify-center items-center">
                <h1 className="text-4xl font-bold text-black">Please sign in to view your flashcards.</h1>
            </div>
        )
    }

    return (
       <section>
            <Navbar page="flashcard"/>
            <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
                {flashcards.length > 0 && (
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">{search} </h2>
                        <p className="mb-4 text-lg text-gray-500">&nbsp;Here&apos;s a few flashcards generated for you&nbsp;</p>
                    </div>
                )}
                <div className="w-full">
                    <div className="flex flex-col w-full mb-10 sm:flex-row">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {flashcards.map((flashcard, index) => (
                                <div
                                    key={index}
                                    className="card-container relative lg:w-[350px] h-[500px]"
                                >
                                    <div className="card">
                                        <div className="card-front bg-white border-2 border-blue-400 rounded-lg shadow-lg">
                                            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 rounded-lg bg-[#06b6d4]"></span>
                                            <div className="relative h-full p-8 flex flex-col justify-center items-center">
                                                <p className="text-4xl text-gray-100 font-bold text-center">{flashcard.front}</p>
                                            </div>
                                        </div>
                                        <div className="card-back bg-gray-100 border-2 border-blue-400 rounded-lg shadow-lg">
                                            <div className="relative h-full p-8 flex flex-col justify-center items-center">
                                                <p className="text-xl text-gray-800 font-bold text-center">{flashcard.back}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
       </section>
    )
}