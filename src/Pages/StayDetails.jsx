import React from "react";
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
  ArrowLeft
} from "lucide-react";

function StayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const stay = stays.find((item) => item.id === id);

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
          <div className="image-gallery">
            {stay.images.map((img, index) => (
              <div key={index} className="gallery-item">
                <img src={img} alt={`${stay.title} - ${index + 1}`} />
                <div className="image-overlay">
                  <div className="overlay-gradient"></div>
                </div>
              </div>
            ))}
          </div>

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