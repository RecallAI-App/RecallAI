"use client"

import { useState } from 'react';

const FAQ = () => {
    const [activeAccordion, setActiveAccordion] = useState('');

    const toggleAccordion = (id) => {
        setActiveAccordion(activeAccordion === id ? '' : id);
    };

    return (
        <section>
            <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
                <div className="grid grid-cols-1 gap-6 lg:gap-12 lg:grid-cols-3">
                    <div className="text-center lg:text-left">
                        <div>
                            <p className="text-4xl font-semibold tracking-tighter text-gray-900">
                                Frequent questions and answers
                            </p>
                            <p className="mt-4 text-base font-medium text-gray-500">
                                Answers to commonly asked questions about our platform
                            </p>
                        </div>
                    </div>
                    <div className="w-full lg:col-span-2">
                        {[
                            {
                                "question": "What do RecallAI do?",
                                "answer": "RecallAI helps you learn and retain information more effectively by generating personalized flashcards using advanced AI technology. Whether you're studying for exams, learning a new language, or simply wanting to improve your knowledge in a specific area, our platform creates tailored flashcards that adapt to your learning needs."
                            },
                            {
                                "question": "How does it work?",
                                "answer": "Our platform uses OpenAI's GPT to understand your study material and generate relevant flashcards. These flashcards are stored and organized using Pinecone, allowing you to access them anytime. You can input topics or questions, and our AI will create flashcards with key points, questions, and answers to help you study efficiently."
                            },
                            {
                                "question": "How much can I use as a free user?",
                                "answer": "As a free user, you can create and access a limited number of flashcards each month. This allows you to explore the platform's capabilities and decide if you want to upgrade to a paid subscription for unlimited access, advanced features, and more personalized study experiences."
                            },
                            {
                                "question": "What are the benefits of upgrading to a paid subscription?",
                                "answer": "Upgrading to a paid subscription unlocks unlimited flashcard creation and personalized learning insights. Paid users can also organize flashcards into custom decks, track progress, and enjoy an ad-free experience. This ensures a more in-depth and focused study session tailored to your learning goals."
                            },
                            {
                                "question": "Is my data secure on the AI Flashcards Website?",
                                "answer": "Absolutely. We prioritize your privacy and security. All your data is encrypted and securely stored. We use Pinecone's cutting-edge technology to manage your flashcards, ensuring your study materials are both safe and easily accessible."
                            },
                            {
                                "question": "Can I share my flashcards with others?",
                                "answer": "Yes, you can share your flashcards with friends, classmates, or study groups. Whether you're working on a group project or helping a friend study, sharing is easy and enhances collaborative learning."
                            },
                            {
                                "question": "Does the AI Flashcards Website support different subjects or topics?",
                                "answer": "Our platform is versatile and can handle a wide range of subjects and topics. Whether you’re studying mathematics, history, science, or languages, our AI can generate relevant and effective flashcards to support your learning."
                            },
                            {
                                "question": "How personalized are the flashcards?",
                                "answer": "The flashcards generated are highly personalized to your learning needs. The AI adapts to your input, learning style, and progress, creating flashcards that are most relevant to what you need to know. Over time, the system refines its recommendations to better suit your study habits."
                            },
                            {
                                "question": "What kind of support is available if I have questions or issues?",
                                "answer": "We offer comprehensive support through our FAQs and customer service team. Paid subscribers also have access to priority support, ensuring that any issues are resolved quickly."
                            }
                        ].map((item, index) => (
                            <div key={index} className={`text-gray-600 cursor-pointer group hover:text-gray-500`}>
                                <button
                                    className="flex items-center justify-between w-full p-4 pb-1 text-lg font-medium text-black select-none"
                                    onClick={() => toggleAccordion(index)}
                                >
                                    <span className='text-left'>{item.question}</span>
                                    <svg
                                        className={`size-5 text-gray-500 duration-300 ease-out ${activeAccordion === index ? '-rotate-[45deg]' : ''}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                    >
                                        <path d="M12 6v12m6-6H6" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                </button>
                                {activeAccordion === index && (
                                    <div className="p-4 pt-2 text-base font-medium text-gray-500">
                                        {item.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;