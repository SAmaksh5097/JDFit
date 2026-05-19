import { useState, useEffect } from 'react';

const Features = () => {
  const [activePoint, setActivePoint] = useState(0);

  const points = [
    "Identify gaps - missing keywords, weak verbs, vague claims",
    "Rewrite - match language, mirror priorities, quantify impact",
    "Optimize - tailor format, enhance readability, boost ATS score"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePoint((prev) => (prev + 1) % points.length);
    }, 3500); // Change point every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 sm:mb-12 md:mb-16 tracking-tight leading-tight">
            <span className="text-white block">What do we</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 block mt-2 sm:mt-3">DO?</span>
        </h1>

        <div className="w-full max-w-4xl mx-auto relative h-28 sm:h-32 md:h-40">
          {points.map((point, index) => (
            <div 
              key={index}
              className={`absolute inset-0 text-center transition-all duration-700 ease-in-out transform flex items-center justify-center ${(
                activePoint === index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90 pointer-events-none'
              )}`}
            >
              <p className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white leading-relaxed px-4 sm:px-6">
                {point}
              </p>
            </div>
          ))}
        </div>

    </section>
  )
}

export default Features
