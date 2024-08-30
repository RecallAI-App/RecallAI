"use client";

import Pricing from './Pricing';
import IonIcon from '@reacticons/ionicons';

const Features = () => {
  return (
      <section>
        <div className="px-8 py-20 mx-auto md:px-12 lg:px-32 max-w-7xl">
          <div>
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl text-balance">
              Why Choose RecallAI?
            </h1>
            <p className="mt-4 text-base font-medium text-gray-500 text-balance">
              Maximize Your Learning
            </p>

            <div className="grid grid-cols-2 mt-12 gap-x-6 gap-y-12 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
              <div>
                <div>
                  <span className="flex items-center justify-center rounded-full size-12 bg-gray-100"> 
                    <IonIcon name="book-outline" role="img" className="md hydrated" aria-label="book outline"></IonIcon>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900">Personalized Learning</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Our AI tailors flashcards to your unique learning style, ensuring you focus on what matters most.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <span className="flex items-center justify-center rounded-full size-12 bg-gray-100">
                    <IonIcon name="ribbon-outline" role="img" className="md hydrated" aria-label="ribbon outline"></IonIcon>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900">Unlimited Access with Premium</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Upgrade for unlimited flashcards, custom decks, and ad-free study sessions.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <span className="flex items-center justify-center rounded-full size-12 bg-gray-100">
                    <IonIcon name="people-outline" role="img" className="md hydrated" aria-label="people outline"></IonIcon>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900">Collaborative Learning</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Share your flashcards with friends or study groups to enhance your learning experience.
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <span className="flex items-center justify-center rounded-full size-12 bg-gray-100">
                    <IonIcon name="lock-closed-outline" role="img" className="md hydrated" aria-label="lock closed outline"></IonIcon>
                  </span>
                </div>
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900">Security First</h3>
                  <p className="mt-2 text-sm text-gray-500">
                    Your data is encrypted and securely stored, so you can focus on studying without worries.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex pt-8">
                {/* <a
                  className="text-sm py-2 active:bg-fuchsia-50 active:text-black bg-[#353538] focus-visible:outline-2 focus-visible:outline-fuchsia-50 focus-visible:outline-offset-2 focus:outline-none font-semibold group hover:bg-[#353538]/80 hover:text-[#ffffff] justify-center px-6 rounded-lg text-white"
                  href="#pricing">
                
                  Upgrade to Premium
                </a> */}
              </div>
            </div>
        </div>
      <Pricing />
    </section>
  
  )
}


export default Features;