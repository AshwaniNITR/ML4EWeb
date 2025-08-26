
import { useEffect, useState } from "react";

const Home = () => {
  const slides = [
    "https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?w=1200&auto=format&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80",
    "https://plus.unsplash.com/premium_photo-1676637656166-cb7b3a43b81a?q=80&w=1200&auto=format&fit=crop",
    "https://plus.unsplash.com/premium_photo-1682756540097-6a887bbcf9b0?q=80&w=1200&auto=format&fit=crop"
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const subtitle = "Official ML Club of NIT Rourkela";
  const [typedText, setTypedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (index < subtitle.length) {
        setTypedText((prev) => prev + subtitle[index]);
        setIndex((prev) => prev + 1);
      } else {
        setTypedText("");
        setIndex(0);
      }
    }, 150);
    return () => clearInterval(typingInterval);
  }, [index]);

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <div className="absolute inset-0">
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`slide-${i}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[4000ms] ease-in-out ${
              i === current ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
        <div
          className="flex space-x-4 text-8xl md:text-[12rem] font-extrabold tracking-wide"
          style={{ fontFamily: "'Orbitron', sans-serif" }} >
          {"ML4E".split("").map((letter, i) => (
            <span
              key={i}
              className="drop-shadow-2xl"
              style={{
                color: "#9eb317",
                WebkitTextStroke: "2px rgba(0,0,0,0.6)",
                textShadow: "4px 4px 12px rgba(0,0,0,0.8)",
                display: "inline-block",
                animation: `drop 0.6s ease forwards`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0
              }}  >
              {letter}
            </span>
          ))}
        </div>

        <p className="text-2xl md:text-4xl italic mt-6 text-gray-200 drop-shadow-lg h-10">
          {typedText}
          <span className="animate-pulse">|</span>
        </p>
      </div>

      <style>
        {` @keyframes drop {
            0% {
              transform: translateY(-150px);
              opacity: 0;
            }   60% {
              transform: translateY(20px);
              opacity: 1;
            }   100% {
              transform: translateY(0);
              opacity: 1;
            } }`}
      </style>
    </div>
  );
};

export default Home;
