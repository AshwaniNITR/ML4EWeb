import React, { useState } from "react";

const Home = () => {
  const slides = [
    "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1200&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1682756540097-6a887bbcf9b0?q=80&w=1200&auto=format&fit=crop"
  ];
  
  const extendedSlides = [slides[slides.length - 1], ...slides, slides[0]];
  const [current, setCurrent] = useState(1); 
  const [isTransitioning, setIsTransitioning] = useState(true);

  const handleTransitionEnd = () => {
    if (current === extendedSlides.length - 1) {
      setIsTransitioning(false);
      setCurrent(1);
      setTimeout(() => setIsTransitioning(true), 50);
    } else if (current === 0) {
      setIsTransitioning(false);
      setCurrent(slides.length);
      setTimeout(() => setIsTransitioning(true), 50);
    }
  };

  React.useLayoutEffect(() => {
    const intervalId = setInterval(() => {
      setCurrent((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
     
      <div
        className={`flex h-full ${
          isTransitioning ? "transition-transform duration-700 ease-out" : ""
        }`}
        style={{ 
          transform: `translateX(-${100 * current}%)`,
          willChange: 'transform'
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedSlides.map((src, i) => (
          <div key={i} className="w-screen h-screen flex-shrink-0 relative">
            <img
              src={src}
              alt={`slide-${i}`}
              className="w-full h-full object-cover"
              draggable="false"
              loading={i <= 2 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent pointer-events-none" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 pointer-events-none">
        <h1
          className="text-8xl md:text-[12rem] leading-none font-extrabold tracking-wide"
          style={{
            fontFamily: "'Orbitron', sans-serif",
            color: "#9eb317",
            WebkitTextStroke: "2px rgba(0,0,0,0.6)",
            textShadow: "4px 4px 12px rgba(0,0,0,0.8)"
          }}
        >
          ML4E
        </h1>
        <p className="text-2xl md:text-4xl italic mt-4 text-gray-200 drop-shadow-lg">
          Official ML Club of NIT Rourkela
        </p>
      </div>
    </div>
  );
};

export default Home;
