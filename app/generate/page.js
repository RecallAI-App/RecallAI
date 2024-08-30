"use client";

import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { collection, writeBatch } from 'firebase/firestore';
import { db, setDoc, doc, getDoc } from '../../firebase';
import { useState, useEffect, Suspense } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Loading from './loading';
import 'react-toastify/dist/ReactToastify.css';

export default function Generate(){
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [flashcards, setFlashcards] = useState([]);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [flashcardName, setFlashcardName] = useState('');
    const [quotaData, setquotaData] = useState([]);
    const [flipped, setFlipped] = useState(false);
    const [text, setText] = useState('');
    const [name, setName] = useState('');
    const [open, setOpen] = useState(false);
    const user = useUser();
    const router = useRouter();
    const [quota, setQuota] = useState(user?.publicMetadata?.quota);

    const notify = (type, message) => 
        toast.success(message, {
            type: type,
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }
    );

    useEffect(() => {
        if (user?.publicMetadata?.quota) {
          setQuota(Number(user.publicMetadata.quota));
        }
    }, [user]);
    
    const checkUserQuota = () => {
        return fetch('/api/checkUserQuota', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: user.user.id }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setQuota(data.quota);
                return data.quota;
            } else {
                console.error('Error checking user quota:', data.error);
                return null;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            return null;
        });
    };
    
    const apiPost = () => {
        if (quota <= 0) {
          setquotaData({ success: false, error: 'You have reached your quota for today. Please try again tomorrow.' });
          return;
        }
    
        setIsLoading(true);
        // console.log("Text", text);
    
        checkUserQuota()
            .then(currentQuota => {
                if (currentQuota === null || currentQuota <= 0) {
                    setquotaData({ success: false, error: 'You have reached your quota for today. Please try again tomorrow.' });
                    setIsLoading(false);
                    return;
                }
    
                const newQuota = currentQuota - 1;
    
                return fetch('/api/updateUserQuota', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quota: newQuota, userId: user.user.id }),
                });
            })
            .then(updateQuotaResponse => updateQuotaResponse.json())
            .then(updateData => {
                if (updateData.success) {
                    if (updateData.updatedQuota > 0) {
                        notify('success', `${updateData.updatedQuota} more generations remaining for today`);
                    } else {
                        notify('error', 'You have reached your generation limit for today.');
                    }
    
                    return fetch('/api/generate', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ text }),
                    });
                } else {
                    // console.log("Error updating user quota:", updateData);
                    throw new Error("Failed to update quota");
                }
            })
            .then(generateResponse => generateResponse.json())
            .then(data => {
                // console.log("API Response Data:", data);
                setFlashcards(data.flashcards);
            })
            .catch(error => {
                console.error("Error:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleOpen = () => {
        setIsDialogOpen(true);
    };

    const handleClose = () => {
        setIsDialogOpen(false);
    };

    const handleSave = () => {
        setName(flashcardName);
        saveFlashCards();
        handleClose();
    }

    const saveFlashCards = async () => {
        if (!flashcardName) {
            notify('error','Please enter a name');
            return;
        }

        const batch = writeBatch(db);
        const userDocRef = doc(collection(db, 'users'), user.user.id);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
            const data = docSnap.data() || {};
            const collections = data.flashcards || [];
            
            if (collections.find((f) => f.flashcardName === flashcardName)) {
                notify('error','Flashcard collection with that name already exists')
                return;
            } else {
                collections.push({ flashcardName });
                batch.set(userDocRef, { flashcards: collections }, { merge: true });
                notify('success','Flashcard collection created successfully');
            }
        } else {
            batch.set(userDocRef, { flashcards: [{ flashcardName }] });
        }

        const colRef = collection(userDocRef, flashcardName);
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef, flashcard);
        });

        await batch.commit();
        handleClose();
        // router.push('/flashcards');
    }

    return (
        <section>
            <Navbar page="generate" />
                <div className="relative overflow-hidden">
                    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-24">
                        <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl font-bold text-gray-800">
                            Generate Flashcards
                        </h1>
                    
                        <p className="mt-3 text-gray-600 dark:text-neutral-400">
                            Transform your learning experience with RecallAI
                        </p>

                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            />
                    
                        <div className="mt-7 sm:mt-12 mx-auto max-w-xl relative">
                            <div className="relative z-10 flex gap-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-gray-900/20">
                                <div className="w-full">
                                    <label htmlFor="hs-search-article-1" className="block text-sm text-gray-700 font-medium dark:text-white"><span className="sr-only">Enter Text</span></label>
                                    <input value={text} onChange={(e) => setText(e.target.value)} className="py-2.5 px-4 block w-full border-transparent rounded-lg focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-transparent dark:text-white dark:placeholder-neutral-500 outline-none	" placeholder="Enter Text"/>
                                </div>
                                <div>
                                    <button
                                        onClick={apiPost}
                                        disabled={isLoading}
                                        className="size-[46px] inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                                    >
                                        <svg
                                            className="shrink-0 size-5"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <circle cx="11" cy="11" r="8" />
                                            <path d="m21 21-4.3-4.3" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                    
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
                </div>
            </div>


            <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5">
                {isLoading || quotaData.success === false && (
                    <div className="flex flex-col justify-center items-center">
                        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Error</h2>
                        <p className="mb-4 text-lg text-gray-500">{quotaData.error}</p>
                    </div>
                )}
                {isLoading || quotaData.success === true ? (
                    <Loading />
                ) : (
                    <>
                    {flashcards.length > 0 && (
                        <div className="flex flex-col justify-center items-center">
                        <h2 className="mb-1 text-3xl font-extrabold leading-tight text-gray-900">Flashcards Preview</h2>
                        <p className="mb-4 text-lg text-gray-500">&nbsp;Here&apos;s a few flashcards generated for you&nbsp;</p>
                        
                        <button
                            onClick={handleOpen}
                            className="mb-16 inline-flex justify-center items-center gap-x-2 px-6 py-3 text-sm font-medium text-white bg-[#353538] rounded-lg hover:bg-[#353538]/80 focus:outline-none"
                        >
                            Save Flashcards
                        </button>
                        </div>
                    )}

                    {isDialogOpen && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                <h3 className="text-xl font-semibold mb-4">Save Flashcards</h3>
                                <input
                                    type="text"
                                    placeholder="Enter a name for your flashcards"
                                    value={flashcardName}
                                    onChange={(e) => setFlashcardName(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                                />
                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        className="px-4 py-2 bg-[#353538] text-white rounded-lg hover:bg-[#353538]/80 mr-2"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={handleClose}
                                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
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
                    </>
                )}
            </div>
                    
    </section>
    )
}