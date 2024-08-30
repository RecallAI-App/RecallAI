"use client";

import { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';

export default function Loading() {
    const { user } = useUser();
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (user?.id) {
            setIsLoading(true);
            fetch('/api/checkUserQuota', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: user.id }),
            })
            .then(response => response.json())
            .then(updateData => {
                const quota = updateData.quota;
                if (updateData.success) {
                    setIsLoading(false);
                    setIsError(false);
                } else {
                    // console.log("User Quota:", quota);
                    setIsLoading(false);
                    setIsError(true);
                }
            })
            .catch(error => {
                console.error('Error fetching user quota:', error);
                setIsLoading(false);
                setIsError(true);
            });
        }
    }, [user]);

    return (
        <div className="container relative flex flex-col justify-between h-full max-w-6xl px-10 mx-auto xl:px-0 mt-5 animate-pulse">
        {isError || isLoading ? (
            <div className="flex flex-col justify-center items-center mb-16">
                <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
            </div>
        ) : (
            <div className="w-full">
                <div className="flex flex-col justify-center items-center mb-16">
                    <div className="h-8 w-48 bg-gray-300 rounded mb-2"></div>
                    <div className="h-6 w-64 bg-gray-200 rounded mb-4"></div>
                    <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
                </div>
                <div className="flex flex-col w-full mb-10 sm:flex-row">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {[...Array(10)].map((_, index) => (
                            <div
                                key={index}
                                className="card-container relative lg:w-[350px] h-[500px] bg-gray-200 rounded-lg shadow-lg"
                            >
                                <div className="card-front bg-gray-300 border-2 border-gray-400 rounded-lg h-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )}
    </div>
    );
}
