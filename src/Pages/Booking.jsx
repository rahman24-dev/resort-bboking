import React, { useState } from "react";
import API from "../api";
import "./Booking.css";

// Custom Alert Component
function CustomAlert({ type, message, onClose }) {
  if (!message) return null;
  return (
    <div className="alert-overlay" onClick={onClose}>
      <div
        className={`alert-modal alert-${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="alert-icon">
          {type === "success" ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M7 12.5l3.5 3.5 6.5-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 7v5M12 16.5v.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <div className="alert-content">
          <h4 className="alert-title">
            {type === "success" ? "Booking Confirmed!" : "Booking Failed"}
          </h4>
          <p className="alert-message">{message}</p>
        </div>
        <button className="alert-close" onClick={onClose}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </button>
        <div className="alert-progress" />
      </div>
    </div>
  );
}

function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    adults: "",
    children: "",
    stayType: "Tent",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ type: "", message: "" });

  const stayPrices = {
    Tent: 1800,
    Cube: 2400,
    AFrame: 2300,
    AlphinTent: 1650,
    MunnarPackage: 2499,
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeAlert = () => setAlert({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const basePrice = stayPrices[formData.stayType];
      const bookingData = {
        ...formData,
        adults: Number(formData.adults),
        children: Number(formData.children),
        price: basePrice,
      };

      const response = await API.post("/api/bookings", bookingData);
      console.log(response.data);
      setAlert({
        type: "success",
        message: "Your stay has been reserved. We'll send a confirmation to your email shortly.",
      });
    } catch (error) {
      console.error("Error:", error);
      setAlert({
        type: "error",
        message: "Something went wrong while saving your booking. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const basePrice = stayPrices[formData.stayType];
  const totalGuest = Number(formData.adults);
  const totalAmount = basePrice * totalGuest;

  return (
    <div className="booking-container">
      <CustomAlert type={alert.type} message={alert.message} onClose={closeAlert} />

      <h2>Book Your Stay</h2>
      <a href="/">Home</a>

      <form className="booking-wrapper" onSubmit={handleSubmit}>
        {/* Booking Form */}
        <div className="form-section">
          <input type="text" name="name" placeholder="Full Name" onChange={handleChange} required />
          <input type="tel" name="phone" placeholder="Phone Number" onChange={handleChange} required />
          <input type="email" name="email" placeholder="E-Mail" value={formData.email} onChange={handleChange} required />

          <label>Check-In Date</label>
          <input type="date" name="checkIn" onChange={handleChange} required />

          <label>Check-Out Date</label>
          <input type="date" name="checkOut" onChange={handleChange} required />

          <input type="number" name="adults" placeholder="Number of Adults" min="1" value={formData.adults} onChange={handleChange} />
          <input type="number" name="children" placeholder="Number of Children" min="0" value={formData.children} onChange={handleChange} />

          <select name="stayType" value={formData.stayType} onChange={handleChange}>
            <option value="Tent">Tent Stay - ₹1,800</option>
            <option value="Cube">Cube Stay - ₹2,400</option>
            <option value="AFrame">A Frame Stay - ₹2,300</option>
            <option value="AlphinTent">Alphin Tent Stay - ₹1,650</option>
            <option value="MunnarPackage">Munnar Package - ₹2,499</option>
          </select>

          {/* Confirm Button */}
          <button type="submit" className={`confirm-btn ${loading ? "loading" : ""}`} disabled={loading}>
            {loading ? (
              <>
                <span className="btn-spinner" />
                <span className="btn-loading-text">Processing...</span>
              </>
            ) : (
              "Confirm Booking"
            )}
          </button>
        </div>

        {/* Bill Preview */}
        <div className="bill-section">
          <h3>Booking Summary</h3>
          <p>Stay Type: {formData.stayType}</p>
          <p>Price per person: ₹{basePrice}</p>
          <p>Adults: {formData.adults}</p>
          <p>Children: {formData.children}</p>
          <p>Total Guest: {totalGuest}</p>
          <hr />
          <h3>Total Amount: ₹{totalAmount}</h3>
          <p>Check-in Time: 2:00 PM</p>
          <p>Check-out Time: 11:00 AM</p>
        </div>
      </form>
    </div>
  );
}

export default Booking;