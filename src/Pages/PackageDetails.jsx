import React, { useState } from 'react';
import { 
  X, MapPin, Calendar, Users, IndianRupee, Check, ChevronLeft, ChevronRight,
  Sunrise, Mountain, Coffee, Music, Flame, UtensilsCrossed, Camera,
  TreePine, Eye, MapPinned, Navigation, Clock, Star, Award, Shield,
  Sparkles, TrendingUp, Heart , Home
} from 'lucide-react';
import styles from './PackageDetails.module.css';
import { useNavigate } from 'react-router-dom';

const PackageDetails = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const galleryImages = [
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&q=80',
    'https://images.unsplash.com/photo-1511593358241-7eea1f3c84e5?w=1200&q=80',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1200&q=80'
  ];

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => setSelectedImage(null);

  const nextImage = () => {
    const newIndex = (currentImageIndex + 1) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const prevImage = () => {
    const newIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    setCurrentImageIndex(newIndex);
    setSelectedImage(galleryImages[newIndex]);
  };

  const navigate = useNavigate();

  const day1Activities = [
    { icon: Heart, text: 'Welcome & campsite check-in' },
    { icon: Mountain, text: 'Kolukkumalai Off-Road Jeep Safari' },
    { icon: Sunrise, text: 'Sunset Trekking' },
    { icon: Coffee, text: 'Evening Tea & Snacks' },
    { icon: Music, text: 'Campfire with Music' },
    { icon: UtensilsCrossed, text: 'Dinner' }
  ];

  const day2Activities = [
    { icon: Camera, text: 'Periyakanal Waterfalls' },
    { icon: Eye, text: 'Lockhart View Point' },
    { icon: Navigation, text: 'Signal View Point' },
    { icon: TreePine, text: 'Elephant Park' },
    { icon: MapPinned, text: 'Mattupetty Dam' },
    { icon: Mountain, text: 'Echo Point' },
    { icon: TrendingUp, text: 'Top Station' }
  ];

  const highlights = [
    { icon: Award, text: 'Expert Guides', desc: 'Professional & experienced' },
    { icon: Shield, text: 'Safe Journey', desc: 'Complete safety measures' },
    { icon: Star, text: 'Best Value', desc: 'Competitive pricing' },
    { icon: Sparkles, text: 'Premium Experience', desc: 'Curated activities' }
  ];

  return (
    <div className={styles.packagesDetails}>
      <div className={styles.breadcrumbsContainer}>
        <a href="/" className={styles.breadcrumbsLink}>
          <Home size={15} />
          <span>Home</span>
        </a>
        <span className={styles.breadcrumbsSeparator}><ChevronRight size={14} /></span>
        <span className={styles.breadcrumbsSeparator}><ChevronRight size={14} /></span>
        <span className={styles.breadcrumbsCurrent}>Kolukkumalai & Munnar</span>
      </div>

      {/* Hero Section */}
      <div className={styles.heroSections}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroBadges}>
            <Star size={16} fill="currentColor" />
            <span>Premium Package</span>
          </div>
          <p className={styles.heroSubtitle}>By Nature Heaven Holidays</p>
          <h1 className={styles.heroTitle}>Kolukkumalai & Munnar Tour Package</h1>
          <div className={styles.heroMeta}>
            <span className={styles.metaItems}><Calendar size={20} /><span>2 Days / 1 Night</span></span>
            <span className={styles.metaItems}><MapPin size={20} /><span>Kolukkumalai & Munnar</span></span>
            <span className={styles.metaItems}><Clock size={20} /><span>All Seasons</span></span>
          </div>
        </div>
        <div className={styles.scrollIndicator}>
          <span>Scroll to explore</span>
          <div className={styles.scrollArrow}></div>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.contentWrappers}>
        <div className={styles.contentContainer}>

          {/* Description */}
          <section className={styles.descriptionSections}>
            <div className={styles.sectionDecorator}><Mountain size={32} /></div>
            <p className={styles.descriptionText}>
              Experience the spectacular sunrise trails of Kolukkumalai and the refreshing 
              hill-station beauty of Munnar with our carefully curated short getaway.
            </p>
          </section>

          {/* Highlights */}
          <section className={styles.highlightsSection}>
            <div className={styles.highlightsGrid}>
              {highlights.map((item, index) => (
                <div key={index} className={styles.highlightCard}>
                  <div className={styles.highlightIcons}><item.icon size={28} /></div>
                  <h4 className={styles.highlightTitles}>{item.text}</h4>
                  <p className={styles.highlightDescs}>{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Price Card */}
          <section className={styles.priceSections}>
            <div className={styles.priceCards}>
              <div className={styles.priceBadges}>Best Value</div>
              <div className={styles.priceHeaders}>
                <h3>Package Price</h3>
                <div className={styles.priceAmounts}>
                  <IndianRupee size={32} strokeWidth={2.5} />
                  <span className={styles.Amounts}>2,499</span>
                  <span className={styles.perPersons}>per person</span>
                </div>
              </div>
              <p className={styles.priceNote}>
                <Star size={16} fill="currentColor" />
                Rates may vary based on season, stay category, and group size
              </p>
              <div className={styles.minPax}>
                <Users size={22} />
                <span>Minimum 6 Pax Required</span>
              </div>
            </div>
          </section>

          {/* Image Gallery */}
          <section className={styles.gallerySection}>
            <div className={styles.sectionHeader}>
              <Camera size={28} />
              <h2 className={styles.sectionTitle}>Gallery</h2>
              <p className={styles.sectionSubtitle}>Discover the beauty that awaits you</p>
            </div>
            <div className={styles.galleryGrid}>
              {galleryImages.map((image, index) => (
                <div key={index} className={styles.galleryItem} onClick={() => openLightbox(index)}>
                  <img src={image} alt={`Gallery ${index + 1}`} />
                  <div className={styles.galleryOverlay}>
                    <Eye size={32} />
                    <span>View Full Size</span>
                  </div>
                  <div className={styles.galleryNumber}>{index + 1}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Itinerary */}
          <section className={styles.itinerarySections}>
            <div className={styles.sectionHeaders}>
              <MapPin size={28} />
              <h2 className={styles.sectionTitles}>Detailed Itinerary</h2>
              <p className={styles.sectionSubtitle}>Your journey, day by day</p>
            </div>

            {/* Day 1 */}
            <div className={styles.itineraryDays}>
              <div className={styles.dayBadges}>Day 01</div>
              <div className={styles.dayContents}>
                <div className={styles.dayHeaders}>
                  <h3 className={styles.dayHeading}>
                    <Mountain size={28} />
                    Kolukkumalai Experience
                  </h3>
                  <div className={styles.dayDurations}>
                    <Clock size={14} />
                    <span>Full Day</span>
                  </div>
                </div>
                <ul className={styles.activityList}>
                  {day1Activities.map((activity, index) => (
                    <li key={index}>
                      <div className={styles.activityIcon}><activity.icon size={20} /></div>
                      <span>{activity.text}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.overnightNote}>
                  <TreePine size={18} />
                  <span>Overnight stay at campsite</span>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className={styles.itineraryDays}>
              <div className={styles.dayBadges}>Day 02</div>
              <div className={styles.dayContents}>
                <div className={styles.dayHeaders}>
                  <h3 className={styles.dayHeading}>
                    <Eye size={28} />
                    Munnar Sightseeing & Drop
                  </h3>
                  <div className={styles.dayDurations}>
                    <Clock size={18} />
                    <span>Full Day</span>
                  </div>
                </div>
                <p className={styles.dayIntro}>
                  <Coffee size={18} />
                  After breakfast, proceed for jeep sightseeing covering:
                </p>
                <ul className={styles.activityList}>
                  {day2Activities.map((activity, index) => (
                    <li key={index}>
                      <div className={styles.activityIcon}><activity.icon size={20} /></div>
                      <span>{activity.text}</span>
                    </li>
                  ))}
                </ul>
                <div className={styles.dropNote}>
                  <Navigation size={18} />
                  <span>Drop at Munnar town after sightseeing</span>
                </div>
              </div>
            </div>
          </section>

          {/* Transportation */}
          <section className={styles.infoSection}>
            <div className={styles.sectionHeader}>
              <Navigation size={28} />
              <h2 className={styles.sectionTitles}>Transportation</h2>
            </div>
            <div className={styles.infoCard}>
              <ul className={styles.infoList}>
                <li><MapPin size={20} /><span>Pickup service available at additional cost</span></li>
                <li><Navigation size={20} /><span>Bodi Drop available at extra charges</span></li>
                <li><MapPinned size={20} /><span>Customized transport arrangements can be provided on request</span></li>
              </ul>
            </div>
          </section>

          {/* Inclusions & Exclusions */}
          <section className={styles.inclusionSection}>
            <div className={styles.inclusionGrid}>
              {/* Includes */}
              <div className={`${styles.inclusionCard} ${styles.includes}`}>
                <div className={styles.inclusionHeader}>
                  <div className={`${styles.inclusionIconWrapper} ${styles.includesIcon}`}>
                    <Check size={28} strokeWidth={3} />
                  </div>
                  <h3 className={styles.inclusionTitle}>Package Includes</h3>
                </div>
                <ul className={styles.inclusionList}>
                  {['Accommodation', 'Jeep Safari & Sightseeing', 'Meals as mentioned', 'Trekking & Campfire'].map((item) => (
                    <li key={item}>
                      <div className={styles.listIcon}><Check size={18} strokeWidth={3} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Excludes */}
              <div className={`${styles.inclusionCard} ${styles.excludes}`}>
                <div className={styles.inclusionHeader}>
                  <div className={`${styles.inclusionIconWrapper} ${styles.excludesIcon}`}>
                    <X size={28} strokeWidth={3} />
                  </div>
                  <h3 className={styles.inclusionTitle}>Package Excludes</h3>
                </div>
                <ul className={styles.exclusionList}>
                  {['Pickup & Drop charges', 'Entry tickets & boating fees', 'Personal expenses', 'Anything not specified under inclusions'].map((item) => (
                    <li key={item}>
                      <div className={styles.listIcon}><X size={18} strokeWidth={3} /></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className={styles.ctaSection}>
            <div className={styles.ctaContent}>
              <h3 className={styles.ctaTitle}>Ready for an Adventure?</h3>
              <p className={styles.ctaSubtitle}>Book your Kolukkumalai & Munnar experience today</p>
              <button className={styles.bookNowBtn} onClick={() => navigate("/booking")}>
                <Heart size={20} fill="currentColor" />
                <span>Book Now</span>
                <ChevronRight size={20} />
              </button>
              <p className={styles.contactText}>
                <Phone size={16} />
                For inquiries, contact Nature Heaven Holidays
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox} aria-label="Close">
            <X size={32} />
          </button>
          <button className={styles.lightboxPrev} onClick={(e) => { e.stopPropagation(); prevImage(); }} aria-label="Previous">
            <ChevronLeft size={40} />
          </button>
          <button className={styles.lightboxNext} onClick={(e) => { e.stopPropagation(); nextImage(); }} aria-label="Next">
            <ChevronRight size={40} />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className={styles.lightboxImage}
            onClick={(e) => e.stopPropagation()}
          />
          <div className={styles.lightboxCounter}>
            {currentImageIndex + 1} / {galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

const Phone = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export default PackageDetails;