import Image from 'next/image';

const Testimonials = () => {
    return (
        <div className="overflow-hidden bg-transparent">
          <div className="relative max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
            <div className="max-w-2xl w-3/4 lg:w-1/2 mb-6 sm:mb-10 md:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl text-white font-semibold">
                Loved by business and individuals across the globe
              </h2>
            </div>
        
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex h-auto">
                <div className="flex flex-col bg-[#353538] rounded-xl">
                  <div className="flex-auto p-4 md:p-6">
                    <p className="text-base italic md:text-lg text-white">
                      &quot;RecallAI has transformed how I study. The personalized flashcards make retaining information so much easier&quot;
                    </p>
                  </div>
        
                  <div className="p-4 rounded-b-xl md:px-7 bg-[#353538]">
                    <div className="flex items-center gap-x-3">
                      <div className="shrink-0">
                        <Image 
                          className="size-8 sm:h-[2.875rem] sm:w-[2.875rem] rounded-full" 
                          src={"/testimonials/1.jpg"}
                          alt="Avatar" 
                          width={80} 
                          height={80} 
                        />
                      </div>
        
                      <div className="grow">
                        <p className="text-sm sm:text-base font-semibold text-white">
                          Sarah 
                        </p>
                        <p className="text-xs text-neutral-400">
                          University Student
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        
              <div className="flex h-auto">
                <div className="flex flex-col bg-[#353538] rounded-xl">
                  <div className="flex-auto p-4 md:p-6">
                    <p className="text-base italic md:text-lg text-white">
                      &quot;As a language learner, RecallAI’s flashcards have been a game changer. I’m picking up vocabulary faster than ever.&quot;
                    </p>
                  </div>
        
                  <div className="p-4 rounded-b-xl md:px-7 bg-[#353538]">
                    <div className="flex items-center gap-x-3">
                      <div className="shrink-0">
                        <Image 
                          className="size-8 sm:h-[2.875rem] sm:w-[2.875rem] rounded-full" 
                          src="/testimonials/2.jpg"
                          alt="Avatar" 
                          width={80} 
                          height={80} 
                        />
                      </div>
        
                      <div className="grow">
                        <p className="text-sm sm:text-base font-semibold text-white">
                          Daniel
                        </p>
                        <p className="text-xs text-neutral-400">
                          Daniel, Language Enthusiast
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
        
              <div className="flex h-auto">
                <div className="flex flex-col bg-[#353538] rounded-xl">
                  <div className="flex-auto p-4 md:p-6">
                    <p className="text-base italic md:text-lg text-white">
                      &quot;RecallAI&apos;s pricing plans are so flexible. I can choose the plan that fits my needs the best.&quot;
                    </p>
                  </div>
        
                  <div className="p-4 rounded-b-xl md:px-7 bg-[#353538]">
                    <div className="flex items-center gap-x-3">
                      <div className="shrink-0">
                        <Image 
                          className="size-8 sm:h-[2.875rem] sm:w-[2.875rem] rounded-full" 
                          src={"/testimonials/3.jpg"}
                          alt="Avatar" 
                          width={80} 
                          height={80} 
                        />
                      </div>
        
                      <div className="grow">
                        <p className="text-sm sm:text-base font-semibold text-white">
                          Sanjay Roy
                        </p>
                        <p className="text-xs text-neutral-400">
                          College Student
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Testimonials;
