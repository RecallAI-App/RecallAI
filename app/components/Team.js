import IonIcon from '@reacticons/ionicons';

const Team = () => {
    return (
        <section>
        <div className="px-8 py-24 mx-auto md:px-12 lg:px-32 max-w-7xl">
          <div className="text-center">
            <h1 className="text-4xl font-semibold tracking-tighter text-gray-900 lg:text-5xl">
              Meet Our Team
              <span className="block text-gray-600">Diverse. Skilled. United.</span>
            </h1>
            <p className="mt-4 text-base font-medium text-gray-500">
              A group of passionate individuals working together to innovate and excel
              in our industry.
            </p>
          </div>
          <ul role="list" className="grid gap-12 mt-12 lg:grid-cols-3">
            <li>
              <div className="space-y-4">
                <div className="aspect-[3/2] p-2 overflow-hidden border rounded-3xl">
                  <img className="object-cover w-full h-full rounded-2xl" src="/abhishek.png" alt=""/>
                </div>
                <div className="inline-flex items-start justify-between w-full">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium leading-6 text-black">
                      Abhishek Shrestha
                    </h3>
                    <p className="text-base text-gray-500">Software Engineer</p>
                  </div>
                  <div>
                    <ul role="list" className="flex space-x-5">
                      <li>
                        <a href="https://www.linkedin.com/in/abhishekshrestha5125/" className="text-gray-400 hover:text-gray-500">
                          <IonIcon name="logo-linkedin" role="img" className="md hydrated" aria-label="logo linkedin"></IonIcon>
                        </a>
                      </li>
                      <li>
                        <a href="" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only"> Instagram </span>
                          <IonIcon name="logo-instagram" role="img" className="md hydrated" aria-label="logo instagram"></IonIcon>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="space-y-4">
                <div className="aspect-[3/2] p-2 overflow-hidden border rounded-3xl">
                  <img className="object-dawn object-cover w-full h-full rounded-2xl" src="/dawn.png" alt=""/>
                </div>
                <div className="inline-flex items-start justify-between w-full">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium leading-6 text-black">
                      Dawn Saju
                    </h3>
                    <p className="text-base text-gray-500">Full Stack Developer</p>
                  </div>
                  <div>
                    <ul role="list" className="flex space-x-5">
                      <li>
                        <a href="https://www.linkedin.com/in/dawnsaju/" className="text-gray-400 hover:text-gray-500">
                        <IonIcon name="logo-linkedin" role="img" className="md hydrated" aria-label="logo linkedin"></IonIcon>
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com/x_dawn.py" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only"> Instagram </span>
                          <IonIcon name="logo-instagram" role="img" className="md hydrated" aria-label="logo instagram"></IonIcon>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <div className="space-y-4">
                <div className="aspect-[3/2] p-2 overflow-hidden border rounded-3xl">
                  <img className="object-sivai object-cover w-full h-full rounded-2xl" src="/sivai.jpeg" alt=""/>
                </div>
                <div className="inline-flex items-start justify-between w-full">
                  <div className="space-y-1">
                    <h3 className="text-lg font-medium leading-6 text-black">
                      Sivaibala Karthikeyan
                    </h3>
                    <p className="text-base text-gray-500">
                      Creative Director 
                    </p>
                  </div>
                  <div>
                    <ul role="list" className="flex space-x-5">
                      <li>
                        <a href="https://www.linkedin.com/in/sivaibala-k-3234b1282/" className="text-gray-400 hover:text-gray-500">
                          <IonIcon name="logo-linkedin" role="img" className="md hydrated" aria-label="logo linkedin"></IonIcon>
                        </a>
                      </li>
                      <li>
                        <a href="https://instagram.com/eaglenotfound404" className="text-gray-400 hover:text-gray-500">
                          <span className="sr-only"> Instagram </span>
                          <IonIcon name="logo-instagram" role="img" className="md hydrated" aria-label="logo instagram"></IonIcon>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </section>
    )
}

export default Team;