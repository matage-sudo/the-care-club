"use client";

import { useState, useEffect } from "react";

export default function BackgroundSlideshow() {
  const slides = [
    "/club-images/img1.jpeg",
    "/club-images/img2.jpeg",
    "/club-images/img3.jpeg",
    "/club-images/img4.jpeg",
    "/club-images/img5.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="absolute inset-0 -z-20 overflow-hidden">
      {slides.map((url, index) => (
        <div
          key={url + index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={url}
            alt="Background slide"
            className="w-full h-full object-cover object-top"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}
