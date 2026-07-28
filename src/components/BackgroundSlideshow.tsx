"use client";

import { useState, useEffect } from "react";

export default function BackgroundSlideshow() {
  const slides = [
    "/images/20240330_155615.jpg",
    "/images/20240330_155648.jpg",
    "/images/20240330_160733.jpg",
    "/images/20250628_165440.jpg",
    "/images/20250628_181513.jpg",
    "/images/20250628_181625.jpg",
    "/images/20250628_182004.jpg",
    "/images/20250628_182142.jpg",
    "/images/20250628_182320.jpg",
    "/images/20251012_115748.jpg",
    "/images/IMG-20251012-WA0162.jpg",
    "/images/IMG-20251012-WA0164.jpg",
    "/images/IMG-20251013-WA0104.jpg",
    "/images/IMG-20251013-WA0116.jpg",
    "/images/IMG_0219.jpeg",
    "/images/IMG_0229.jpeg",
    "/images/IMG_0271.JPG",
    "/images/IMG_0272.JPG",
    "/images/IMG_0277.JPG",
    "/images/IMG_0288.jpeg",
    "/images/IMG_0296.jpeg",
    "/images/IMG_0316.JPG",
    "/images/IMG_0317.JPG",
    "/images/IMG_20250628_161504_138.jpg",
    "/images/Pad Drive.jpg"
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
    <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
      {slides.map((url, index) => (
        <div
          key={url + index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 scale-105" : "opacity-0 scale-100"
          } transition-transform duration-[5000ms]`}
        >
          <img
            src={url}
            alt="Background slide"
            className="w-full h-full object-cover object-center sm:object-top md:object-center transform"
          />
        </div>
      ))}
      {/* Dark overlay optimized for readability across mobile and desktop screens */}
      <div className="absolute inset-0 bg-black/50 sm:bg-black/40" />
    </div>
  );
}
