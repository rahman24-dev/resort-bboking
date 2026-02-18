import React from "react";
import "./Hero.css";

function Hero() {
  const scrollToExplore = () => {
    const exploreSection =document.getElementById("explore");
    if(exploreSection){
      exploreSection.scrollIntoView({ 
        behavior: "smooth",
        block: "start"
      });
    }
  }
  return (
    <section className="heros">
      <div className="heros-content">
        <h2>Find Your <span>Perfect Stays</span></h2>
        <p>Villas • Tents • A-Frame • Cube</p>

       <button onClick={scrollToExplore} className="heros-button">
          Explore Our Stays
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default Hero;
