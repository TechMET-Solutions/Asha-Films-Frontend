import React, { useState, useEffect } from 'react';

const artistImages = [
  'https://via.placeholder.com/350/FFC0CB/000000?text=Artist+1', // Replace with your image URLs
  'https://via.placeholder.com/350/ADD8E6/000000?text=Artist+2', // Use actual image paths
  'https://via.placeholder.com/350/90EE90/000000?text=Artist+3',
  'https://via.placeholder.com/350/F08080/000000?text=Artist+4',
  'https://via.placeholder.com/350/E6E6FA/000000?text=Artist+5',
];

const ShufflingArtist = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // This effect sets up the automatic shuffling
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % artistImages.length);
    }, 3000); // Change image every 3 seconds

    // Clear the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(interval);
  }, []);

  const getVisibleImages = () => {
    const current = artistImages[currentImageIndex];
    const prevIndex = (currentImageIndex - 1 + artistImages.length) % artistImages.length;
    const nextIndex = (currentImageIndex + 1) % artistImages.length;
    const prev = artistImages[prevIndex];
    const next = artistImages[nextIndex];
    return { current, prev, next };
  };

  const { current, prev, next } = getVisibleImages();

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Background Images */}
        <img
          src={prev}
          alt="Previous Artist"
          className="absolute w-2/3 h-2/3 object-cover rounded-full transition-all duration-500 ease-in-out transform scale-75 opacity-50 z-10"
        />
        <img
          src={next}
          alt="Next Artist"
          className="absolute w-2/3 h-2/3 object-cover rounded-full transition-all duration-500 ease-in-out transform scale-75 opacity-50 z-10"
        />

        {/* Central, Full-size Image */}
        <img
          src={current}
          alt="Featured Artist"
          className="absolute w-3/4 h-3/4 object-cover rounded-full transition-all duration-500 ease-in-out transform scale-100 opacity-100 z-20"
        />
      </div>
    </div>
  );
};

export default ShufflingArtist;