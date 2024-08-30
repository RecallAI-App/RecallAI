"use client";

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';

const ResultPage = () => {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');

    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!sessionId) {
            setLoading(false);
            return;
        }

        fetch(`/api/checkout_sessions/?session_id=${sessionId}`)
            .then(response => response.json())
            .then(sessionData => {
                if (sessionData.error) {
                    throw new Error(sessionData.error);
                }
                setSession(sessionData);
            })
            .catch(err => {
                setError(err.message || "An Error Occurred");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [sessionId]);

    if (loading) {
        return (
            <section>
                <div className="flex h-screen justify-center items-center">
                    <h1 className="text-4xl font-bold text-black">Loading...</h1>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section>
                <div className="flex h-screen justify-center items-center">
                    <h1 className="text-4xl font-bold text-black">{error}</h1>
                </div>
            </section>
        );
    }

    return (
        <section>
            <Navbar page={"payment"}/>
            {session && session.payment_status === "paid" ? (
                <div>
                   <div className="flex flex-col gap-4 h-screen justify-center items-center">
                        <h1 className="text-4xl font-bold text-green-500 p-4">Payment Successful!</h1>
                        <h1 className="text-3xl font-bold text-black text-center p-4">We have received your payment. <br/>
                        You will receive an email with the order details shortly.</h1>
                    </div>
                </div>
            ) : (
                <div>
                    <div className="flex h-screen justify-center items-center">
                        <h1 className="text-4xl font-bold text-black">Payment Failed!</h1>
                    </div>
                    <div className="flex h-screen justify-center items-center">
                        <h1 className="text-4xl font-bold text-black">Your payment was not successful. Please try again.</h1>
                    </div>
                </div>
            )}
        </section>
    );
};

export default ResultPage;