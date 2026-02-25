import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './ExplorePackage.css';
import { useNavigate } from 'react-router-dom';

const PackageSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80'
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate('/package-details')
  };

  return (
    <div className="package-section">
      <div className="package-container">
        {/* Title Section */}
        <div className="title-section">
          <h1 className="main-title">Explore Our Package</h1>
          <p className="subtitle">Kolukkumalai & Munnar Package</p>
        </div>

        {/* Carousel Section */}
        <div className="carousels-wrapper">
          <div className="carousels-container">
            <img
              src={images[currentSlide]}
              alt={`Slide ${currentSlide + 1}`}
              className="carousels-image"
            />

            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="carousels-btn carousels-btn-prev"
              aria-label="Previous slide"
            >
              <ChevronLeft />
            </button>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="carousels-btn carousels-btn-next"
              aria-label="Next slide"
            >
              <ChevronRight />
            </button>

            {/* Dots Indicator */}
            <div className="carousels-dots">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`carousels-dot ${currentSlide === index ? 'active' : ''}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <div className="button-section">
          <button onClick={handleViewDetails} className="view-details-btn">
            View Details <ArrowRight size={22} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageSection;