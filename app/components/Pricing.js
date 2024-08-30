"use client";

import { useState } from 'react';
import getStripe from '../../utils/get-stripe';

const Pricing = () => {
  const [annual, setAnnual] = useState(false);

  const handleSubmit = () => {
    fetch('/api/checkout_sessions', {
      method: 'POST',
      headers: {
        origin: 'http://localhost:3000',
      }
    })
    .then(response => response.json())
    .then(subscribeSession => {
      if (subscribeSession.statusCode === 500) {
        console.error(subscribeSession.message);
        return;
      }
      return getStripe().then(stripe => {
        return stripe.redirectToCheckout({
          sessionId: subscribeSession.id
        });
      });
    })
    .then(result => {
      if (result?.error) {
        console.warn(result.error.message);
      }
    })
    .catch(error => {
      console.error("Error in checkout process:", error);
    });
  }

  return (
    <section id="pricing">
      <div className="px-8 mx-auto md:px-12 lg:px-32 max-w-7xl">
        <div className="grid grid-cols-1 gap-2 mt-24 lg:grid-cols-2">
          <div className="p-2 overflow-hidden border rounded-3xl">
            <div className="flex flex-col justify-between h-full p-8 bg-white border shadow-2xl rounded-2xl lg:p-10">
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-6xl">
                    Flexible Pricing Plans,
                    <span className="text-gray-600">suitable for all needs</span>
                  </h1>
                  <p className="mt-4 text-base font-medium text-gray-500 text-pretty">
                    Upgrade to Pro Learner for advanced features and unlimited access. 
                    Ideal for dedicated learners seeking the best experience.
                  </p>
                </div>
                <div className="inline-flex w-full border rounded-lg mt-6 overflow-hidden bg-chalk p-0.5 z-0">
                  <button
                    className={`block w-full px-8 py-2 text-xs font-medium text-black transition rounded-md ${!annual ? 'bg-gray-100' : ''}`}
                    onClick={() => setAnnual(false)}
                    type="button"
                  >
                    Monthly
                  </button>
                  <button
                    className={`block w-full px-8 py-2 text-xs font-medium transition rounded-md ${annual ? 'bg-gray-100 text-black' : ''}`}
                    onClick={() => setAnnual(true)}
                    type="button"
                  >
                    Annual
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="p-2 overflow-hidden border rounded-3xl">
            <div className="flex flex-col justify-between h-full p-8 bg-white border shadow-2xl rounded-2xl lg:p-10">
              <div className="flex flex-col gap-4">
                <div className="flex justify-between">
                  <span className="text-lg font-medium text-black lg:text-2xl">Pro Learner</span>
                  <div className="flex items-center justify-center text-black rounded-full size-12 bg-gray-50">
                    ❖
                  </div>
                </div>
                <div>
                  <span className="text-2xl text-black">
                    {annual ? '$5.00' : '$10.00'}
                  </span>
                  <span className="text-sm font-medium text-gray-500">
                    per month
                    {annual && (
                      <span> (billed annually)</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="flex flex-col mt-12">
                <p className="text-lg font-medium text-black lg:text-2xl">Includes</p>
                <ul className="gap-4 mt-4 space-y-3 font-medium text-gray-500 list-none lg:gap-6" role="list">
                  <li className="flex items-center gap-2">
                    ⏤ <span>Unlimited generations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    ⏤ <span>Team Collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    ⏤ <span>Advanced Analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    ⏤ <span>Voice & Image Integration</span>
                  </li>
                </ul>
                <div className="flex w-full mt-6">
                  <button
                    className="inline-flex items-center justify-center w-full h-12 gap-3 px-5 py-3 font-medium text-white duration-200 bg-gray-900 rounded-xl hover:bg-gray-700 focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    aria-describedby="planDescriptionLink"
                    aria-label="Learn More about Plan"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;