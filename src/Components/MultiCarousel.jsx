import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './MultiCarousel.css';

const imageSets = [
  // Carousel 1 - First image has price overlay
  [
    { src: 'https://ik.imagekit.io/tae7lprpz/CubeImage.jpeg', price: '₹2499/Per Person' },
    { src: 'https://ik.imagekit.io/tae7lprpz/CubeTent.jpeg?updatedAt=1770393860030' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Waterfalls.jpeg?updatedAt=1770392510387' },
    { src: 'https://ik.imagekit.io/tae7lprpz/DjParty.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/CampFire.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/JeepSafari.jpeg'}
    
  ],
  // Carousel 2
  [
    { src: 'https://ik.imagekit.io/tae7lprpz/Tent.jpeg', price: '₹1599/Per Person' },
    { src: 'https://ik.imagekit.io/tae7lprpz/TentOuter.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/TentInner.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/CubeTentImage.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/PhotoShoot.jpeg'},
    { src: 'https://ik.imagekit.io/tae7lprpz/CampFire.jpeg' }
  ],
  // Carousel 3
  [
    { src: 'https://ik.imagekit.io/tae7lprpz/A-Cabin.jpeg', price: '₹2500/Per Person' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Aframe-mrng.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Aframe-eve.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Aframe-nyt2.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Aframe-inside.jpeg'},
    { src: 'https://ik.imagekit.io/tae7lprpz/Swingger.jpeg'},
    { src: 'https://ik.imagekit.io/tae7lprpz/DinningHall.jpeg' }
  ],
  //Carousel 4
  [
    { src: 'https://ik.imagekit.io/tae7lprpz/Tent-own1.jpeg', price: '₹1499/Per Person' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Tent-own.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/Tent-own2.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/tent-onw3.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/CampFire.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/JeepSafari.jpeg'}
  ],
  //Carousel 5
  [
    { src: 'https://ik.imagekit.io/tae7lprpz/Tent.jpeg', price: '₹1599/Per Person' },
    { src: 'https://ik.imagekit.io/tae7lprpz/TentOuter.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/TentInner.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/CubeTentImage.jpeg' },
    { src: 'https://ik.imagekit.io/tae7lprpz/PhotoShoot.jpeg'},
    { src: 'https://ik.imagekit.io/tae7lprpz/CampFire.jpeg' }
  ]
];

const ImageCarousel = ({ images, title, stayId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };


  const currentImage = images[currentIndex];

  const navigate = useNavigate();

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper" onClick={() => navigate(`/stay/${stayId}`)}>
        <button className="carousel-btn prev" onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}>‹</button>
        
        <div className="carousel-slide">
          <img 
            src={currentImage.src} 
            alt={`Slide ${currentIndex + 1}`} 
          />
          
          {/* Price overlay - only on first image (index 0) */}
          {currentIndex === 0 && currentImage.price && (
            <div className="price-overlay">
              {currentImage.price}
            </div>
          )}
        </div>
        
        <button className="carousel-btn next" onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}>›</button>
        
        {/* Title at bottom left */}
        <div className="carousel-title">
          {title}
        </div>
        
        {/* Dots */}
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${currentIndex === index ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const MultiCarousel = () => {
  return (
    <div className="multi-carousel">
      <ImageCarousel images={imageSets[0]} title="Cube Frame Stay" stayId="cube"/>
      <ImageCarousel images={imageSets[1]} title="Tent Stay" stayId="tent" />
      <ImageCarousel images={imageSets[2]} title="A-Frame Cabin" stayId="aframe"/>
      <ImageCarousel images={imageSets[3]} title="Alphine Tent" stayId="AlphineTent"/>
    </div>
  );
};

export default MultiCarousel;
