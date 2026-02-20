import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import stays from "../data/stays";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./StayDetails.css";
import { 
  Home, 
  MapPin, 
  Clock, 
  Calendar,
  Info,
  ClipboardList,
  Star,
  Check,
  Sparkles,
  Phone,
  ChevronRight,
  AlertCircle,
  ArrowLeft,
  Images,
  X,
  ChevronLeft
} from "lucide-react";

function StayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const stay = stays.find((item) => item.id === id);

  const openLightbox = (index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "";
  };

  const goPrev = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev - 1 + stay.images.length) % stay.images.length);
  };

  const goNext = (e) => {
    e.stopPropagation();
    setActiveIndex((prev) => (prev + 1) % stay.images.length);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") setActiveIndex((prev) => (prev - 1 + stay.images.length) % stay.images.length);
    if (e.key === "ArrowRight") setActiveIndex((prev) => (prev + 1) % stay.images.length);
    if (e.key === "Escape") closeLightbox();
  };

  if (!stay) {
    return (
      <>
        <Header />
        <div className="not-found-container">
          <div className="not-found-content">
            <div className="not-found-icon-wrapper">
              <AlertCircle className="not-found-icon" size={80} strokeWidth={1.5} />
            </div>
            <h2>Stay Not Found</h2>
            <p>The stay you're looking for doesn't exist or has been removed.</p>
            <button onClick={() => navigate("/")} className="back-home-button">
              <ArrowLeft size={20} strokeWidth={2} />
              Back to Home
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="stay-details-wrapper">
        <div className="stay-details-container">
          {/* Breadcrumb Navigation */}
          <div className="breadcrumb">
            <button onClick={() => navigate("/")} className="breadcrumb-link">
              <Home size={18} strokeWidth={2} />
              <span>Home</span>
            </button>
            <ChevronRight className="breadcrumb-separator" size={16} />
            <span className="breadcrumb-current">{stay.title}</span>
          </div>

          {/* Hero Section */}
          <div className="stay-hero">
            <div className="hero-content">
              <div className="hero-text">
                <h1 className="stay-title">{stay.title}</h1>
                <div className="stay-meta">
                  <div className="meta-item">
                    <MapPin size={20} strokeWidth={2} />
                    <span>{stay.location || "India"}</span>
                  </div>
                  <div className="meta-item">
                    <Clock size={20} strokeWidth={2} />
                    <span>{stay.duration || "Multi-day"}</span>
                  </div>
                </div>
              </div>
              <div className="price-card">
                <div className="price-badge">Starting from</div>
                <div className="price-amount">₹{stay.price}</div>
                <div className="price-unit">per person</div>
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="image-gallery-wrapper">
            {/* Main large image */}
            <div className="gallery-main" onClick={() => openLightbox(0)}>
              <img src={stay.images[0]} alt={`${stay.title} - 1`} />
              <div className="gallery-main-overlay"></div>
            </div>

            {/* Side thumbnails (up to 3) */}
            <div className="gallery-side">
              {stay.images.slice(1, 4).map((img, index) => (
                <div
                  key={index}
                  className={`gallery-thumb ${index === 2 ? "gallery-thumb-last" : ""}`}
                  onClick={() => openLightbox(index + 1)}
                >
                  <img src={img} alt={`${stay.title} - ${index + 2}`} />
                  <div className="gallery-thumb-overlay"></div>
                  {/* Show "+X more" badge on last visible thumb */}
                  {index === 2 && stay.images.length > 4 && (
                    <div className="gallery-more-badge">
                      +{stay.images.length - 4} more
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* View All button */}
            <button className="gallery-view-all" onClick={() => openLightbox(0)}>
              <Images size={18} strokeWidth={2} />
              <span>View all {stay.images.length} photos</span>
            </button>
          </div>

          {/* Lightbox */}
          {lightboxOpen && (
            <div
              className="lightbox-overlay"
              onClick={closeLightbox}
              onKeyDown={handleKeyDown}
              tabIndex={0}
              autoFocus
            >
              {/* Header */}
              <div className="lightbox-header" onClick={(e) => e.stopPropagation()}>
                <span className="lightbox-counter">{activeIndex + 1} / {stay.images.length}</span>
                <button className="lightbox-close" onClick={closeLightbox}>
                  <X size={24} strokeWidth={2} />
                </button>
              </div>

              {/* Main image */}
              <div className="lightbox-main" onClick={(e) => e.stopPropagation()}>
                <button className="lightbox-nav lightbox-prev" onClick={goPrev}>
                  <ChevronLeft size={32} strokeWidth={2} />
                </button>
                <img
                  src={stay.images[activeIndex]}
                  alt={`${stay.title} - ${activeIndex + 1}`}
                  className="lightbox-image"
                />
                <button className="lightbox-nav lightbox-next" onClick={goNext}>
                  <ChevronRight size={32} strokeWidth={2} />
                </button>
              </div>

              {/* Thumbnails strip */}
              <div className="lightbox-thumbs" onClick={(e) => e.stopPropagation()}>
                {stay.images.map((img, index) => (
                  <div
                    key={index}
                    className={`lightbox-thumb ${index === activeIndex ? "lightbox-thumb-active" : ""}`}
                    onClick={() => setActiveIndex(index)}
                  >
                    <img src={img} alt={`thumb-${index}`} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Description Section */}
          {stay.description && (
            <div className="content-section">
              <div className="section-header">
                <div className="section-icon">
                  <Info size={24} strokeWidth={2.5} />
                </div>
                <h2>About This Experience</h2>
              </div>
              <p className="stay-description">{stay.description}</p>
            </div>
          )}

          {/* Itinerary Section */}
          <div className="content-section itinerary-section">
            <div className="section-header">
              <div className="section-icon">
                <ClipboardList size={24} strokeWidth={2.5} />
              </div>
              <h2>Detailed Itinerary</h2>
            </div>

            <div className="timeline-wrapper">
              {stay.itinerary.map((item, index) => (
                <div key={index} className="timeline-day">
                  <div className="timeline-marker">
                    <div className="timeline-dot">
                      <Calendar size={18} strokeWidth={2.5} />
                    </div>
                    {index < stay.itinerary.length - 1 && (
                      <div className="timeline-line"></div>
                    )}
                  </div>
                  
                  <div className="timeline-content">
                    <div className="day-badge">
                      <Calendar size={18} strokeWidth={2.5} />
                      <span>{item.day}</span>
                    </div>
                    
                    <div className="activities-card">
                      <ul className="activities-list">
                        {item.activities.map((activity, i) => (
                          <li key={i} className="activity-item">
                            <div className="activity-check">
                              <Check size={16} strokeWidth={3} />
                            </div>
                            <span>{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Section */}
          {stay.highlights && (
            <div className="content-section">
              <div className="section-header">
                <div className="section-icon">
                  <Star size={24} strokeWidth={2.5} />
                </div>
                <h2>Highlights</h2>
              </div>
              <div className="highlights-grid">
                {stay.highlights.map((highlight, index) => (
                  <div key={index} className="highlight-card">
                    <div className="highlight-icon">
                      <Check size={20} strokeWidth={2.5} />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Booking CTA */}
          <div className="booking-section">
            <div className="booking-card">
              <div className="booking-glow"></div>
              <div className="booking-content">
                <div className="booking-header">
                  <Sparkles className="booking-sparkle" size={32} />
                  <h3>Ready for an Adventure?</h3>
                  <p>Book your spot now and create unforgettable memories!</p>
                </div>
                
                <div className="booking-features">
                  <div className="feature-item">
                    <Check size={20} strokeWidth={2.5} />
                    <span>Instant Confirmation</span>
                  </div>
                  <div className="feature-item">
                    <Phone size={20} strokeWidth={2.5} />
                    <span>24/7 Support</span>
                  </div>
                </div>

                <button className="book-now-button" onClick={() => navigate("/booking")}>
                  <Calendar size={24} strokeWidth={2} />
                  <span>Book Now - ₹{stay.price}</span>
                  <ChevronRight size={24} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default StayDetails;