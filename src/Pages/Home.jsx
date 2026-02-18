import React from "react";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import Footer from "../Components/Footer";
import "./Home.css";
import MultiCarousel from "../Components/MultiCarousel";
import ItineraryCard from "../Components/ItineraryCard";
import ImageHoverExpand from "../Components/ImageHoverExpand";

function Home() {
  return (
    <div>
      <Header />
      <Hero />

      <section id="explore" className="explore">
        <h2>Explore Our Stays</h2>
        <p>Discover amazing places included in your stay</p>
        <MultiCarousel />
      </section>
      <section id="itinerary">
          <ItineraryCard/>
      </section>
      {/* <ImageHoverExpand/> */}
      <Footer />
    </div>
  );
}

export default Home;
