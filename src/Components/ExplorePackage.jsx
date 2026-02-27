import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import './ExplorePackage.css';
import { useNavigate } from 'react-router-dom';

const PackageSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    'https://ik.imagekit.io/tae7lprpz/IMG_9409.jpeg?updatedAt=1772192188042',
    'https://ik.imagekit.io/tae7lprpz/IMG_9414.jpeg?updatedAt=1772192187830',
    'https://ik.imagekit.io/tae7lprpz/IMG_9413.jpeg?updatedAt=1772192186889',
    'https://ik.imagekit.io/tae7lprpz/IMG_9411.jpeg?updatedAt=1772192187371'
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