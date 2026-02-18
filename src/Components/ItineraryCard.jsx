import React, { useState } from 'react';
import { Sunrise, MapPin, Coffee, Droplets, Mountain, Flame, Moon, Clock, Car, UtensilsCrossed, Sparkles, Camera } from 'lucide-react';
import './ItineraryCard.css';

const ItineraryCard = () => {
  const [scheduleData] = useState({
    title: "Suryanelli Camping Adventure",
    days: [
      {
        day: "Day 1: Arrival & Exploration",
        icon: "🏕️",
        activities: [
          {
            time: "02:00 PM",
            period: "afternoon",
            title: "Arrival & Check-in",
            description: "Arrive at the Suryanelli campsite, check in, and settle into your cozy tent. Enjoy a welcome refreshment to kick off your adventure.",
            icon: "tent"
          },
          {
            time: "03:00 PM",
            period: "afternoon",
            title: "Guided Waterfall Hike",
            description: "Begin with a guided hike to a nearby scenic waterfall—perfect for photos and relaxation.",
            icon: "waterfall"
          },
          {
            time: "04:30 PM",
            period: "afternoon",
            title: "Tea & Biscuits Break",
            description: "Unwind with a cup of freshly brewed black tea and crispy biscuits as you soak in the serene views.",
            icon: "tea"
          },
          {
            time: "05:00 PM",
            period: "evening",
            title: "Sunset Hike",
            description: "Take a guided sunset hike (weather permitting) for stunning vistas.",
            icon: "sunset"
          },
          {
            time: "07:30 PM",
            period: "evening",
            title: "Campfire & Stargazing",
            description: "Gather around a campfire under the stars, enjoy light music, and connect with fellow travelers.",
            icon: "campfire"
          },
          {
            time: "08:30 PM",
            period: "night",
            title: "Dinner Time",
            description: "Indulge in a sumptuous dinner featuring chapati, rice, chicken curry, paneer butter masala, BBQ (two varieties), cauliflower chili, and rasam. (Kitchen closes at 9:30 PM)",
            icon: "dinner"
          },
          {
            time: "10:00 PM",
            period: "night",
            title: "Lights Out",
            description: "Drift into peaceful slumber in your tent as camp activities wind down.",
            icon: "sleep"
          }
        ]
      },
      {
        day: "Day 2: Sunrise Magic",
        icon: "🌄",
        activities: [
          {
            time: "03:30 AM",
            period: "night",
            title: "Early Wake-up Call",
            description: "Early wake-up call to prepare for the Kolukkumalai sunrise adventure.",
            icon: "alarm"
          },
          {
            time: "04:00 AM",
            period: "morning",
            title: "Kolukkumalai Sunrise Trip",
            description: "Jeeps leave promptly at 4:30 AM for the mesmerizing Kolukkumalai sunrise trip, one of the world's highest tea plantations!",
            icon: "jeep"
          },
          {
            time: "08:30 AM",
            period: "morning",
            title: "Breakfast",
            description: "Return to the Suryanelli campsite and savor a hearty South Indian breakfast with idli, dosa, sambar, chutneys, and steaming milk tea.",
            icon: "breakfast"
          },
          {
            time: "11:00 AM",
            period: "morning",
            title: "Check-out",
            description: "Check out from the campsite. Thank you for choosing us for your adventure! Ready to create unforgettable memories?",
            icon: "checkout"
          }
        ]
      }
    ]
  });

  const getIconComponent = (iconName) => {
    const icons = {
      tent: MapPin,
      waterfall: Droplets,
      tea: Coffee,
      sunset: Sunrise,
      campfire: Flame,
      dinner: UtensilsCrossed,
      sleep: Moon,
      alarm: Clock,
      jeep: Car,
      breakfast: Coffee,
      checkout: Sparkles
    };
    const IconComponent = icons[iconName] || Clock;
    return <IconComponent size={24} strokeWidth={2.5} />;
  };

  const getPeriodClass = (period) => {
    return `schedule-item-${period}`;
  };

  return (
    <div className="itinerary-wrapper">
      <div className='top-section'>
        <div className="hero-badge">
          <Sunrise size={20} />
          <span>THE JOURNEY</span>
        </div>
        <h1 className='wonder-title'>24 Hours of Wonder</h1>
        <p className="hero-subtitle">From afternoon arrival to morning departure, every moment is crafted for maximum adventure and unforgettable memories</p>
      </div>

      <div className="itinerary-container">
        {scheduleData.days.map((day, dayIndex) => (
          <div className="day-wrapper" key={dayIndex}>
            {dayIndex === 0 && (
              <div className="journey-header">
                <div className="journey-header-content">
                  <Mountain className="journey-icon" size={32} />
                  <h1>{scheduleData.title}</h1>
                </div>
              </div>
            )}

            <div className="day-section">
              <div className="day-header">
                <span className="day-emoji">{day.icon}</span>
                <span className="day-title">{day.day}</span>
              </div>

              <div className="timeline-container">
                {day.activities.map((activity, activityIndex) => (
                  <div 
                    className={`timeline-item ${getPeriodClass(activity.period)}`}
                    key={activityIndex}
                  >
                    <div className="timeline-line"></div>
                    <div className="timeline-dot">
                      <div className="timeline-icon">
                        {getIconComponent(activity.icon)}
                      </div>
                    </div>
                    
                    <div className="timeline-content">
                      <div className="time-badge">{activity.time}</div>
                      <div className="activity-card">
                        <div className="activity-header">
                          <h3 className="activity-title">{activity.title}</h3>
                          <span className={`period-tag period-${activity.period}`}>
                            {activity.period}
                          </span>
                        </div>
                        <p className="activity-description">{activity.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          
            {dayIndex === 1 && (
              <div className="journey-footer">
                <Sparkles className="footer-icon" size={24} />
                <p>Thank you for choosing us for your adventure! Ready to create unforgettable memories?</p>
                <Camera className="footer-icon" size={24} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryCard;