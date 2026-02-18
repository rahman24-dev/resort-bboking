import React, { useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "./Booking.css";

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


  const stayPrices = {
    Tent: 1999,
    Cube: 2499,
    AFrame: 2799,
    AlphinTent: 1799,
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const basePrice = stayPrices[formData.stayType];

    const bookingData = {
      ...formData,
      adults: Number(formData.adults),
      children: Number(formData.children),
      price: basePrice,
    };

    const response = await axios.post(
      "http://localhost:5000/api/bookings",
      bookingData
    );

    alert("Booking Saved Successfully!");
    console.log(response.data);

  } catch (error) {
    console.error("Error:", error);
    alert("Booking Failed");
  }
};

  const basePrice = stayPrices[formData.stayType];
  const totalGuest = Number(formData.children) + Number(formData.adults)
  const totalAmount = basePrice * totalGuest

  return (
    <>
    <Header/>
    <div className="booking-container">
      <h2>Book Your Stay</h2>
      <a href="/">Home</a>

      <form className="booking-wrapper" onSubmit={handleSubmit}>

        {/* Booking Form */}
        <div className="form-section">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-Mail"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>Check-In Date</label>
          <input
            type="date"
            name="checkIn"
            onChange={handleChange}
            required
          />

          <label>Check-Out Date</label>
          <input
            type="date"
            name="checkOut"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="adults"
            placeholder="Number of Adult"
            min="1"
            value={formData.adults}
            onChange={handleChange}
          />

          <input
            type="number"
            name="children"
            placeholder="Number of Children"
            min="0"
            value={formData.children}
            onChange={handleChange}
          />

          <select
            name="stayType"
            value={formData.stayType}
            onChange={handleChange}
          >
            <option value="Tent">
              Tent Stay - ₹1,999
            </option>
            <option value="Cube">
              Cube Stay - ₹2,499
            </option>
            <option value="AFrame">
              A Frame Stay - ₹2,799
            </option>
            <option value="AlphinTent">
              Tent Stay - ₹1,799
            </option>
          </select>

          {/* Confirm Button */}
          <button type="submit" className="confirm-btn">
            Confirm Booking
          </button>
        </div>

        {/* Bill Preview */}
        <div className="bill-section">
          <h3>Booking Summary</h3>

          <p>Stay Type: {formData.stayType}</p>
          <p>Price per person: ₹{basePrice}</p>
          <p>Adults:{formData.adults}</p>
          <p>Children: {formData.children}</p>
          <p>Total Guest: {totalGuest}</p>

          <hr />

          <h3>Total Amount: ₹{totalAmount}</h3>

          <p>Check-in Time: 2:00 PM</p>
          <p>Check-out Time: 11:00 AM</p>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
}

export default Booking;
