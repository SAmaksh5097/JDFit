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
    <section className="w-full min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 py-0">
        <h1 className="text-6xl md:text-7xl font-bold text-center mb-16 tracking-tight">
            What do we<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600 mt-2 "> DO?</span>
                
        </h1>

        <div className="w-full max-w-4xl mx-auto relative h-40">
          {points.map((point, index) => (
            <div 
              key={index}
              className={`absolute inset-0 text-center transition-all duration-700 ease-in-out transform flex items-center justify-center ${
                activePoint === index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-0 scale-90 pointer-events-none'
              }`}
            >
              <p className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white leading-relaxed px-6">
                {point}
              </p>
            </div>
          ))}
        </div>

    </section>
  )
}

export default Features
