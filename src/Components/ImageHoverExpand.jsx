import React from 'react';
import './ImageHoverExpand.css';
import { Mountain } from 'lucide-react';

const ImageHoverExpand = () => {
  return (
    <section>
      <h1 className="Title-image">Kolukkumalai Sunrise Expedition </h1>
      <p className='Details-views'><Mountain /> 8530 Feet </p>
    <div className="img-hover-expand-wrapper">
      <div className="img-hover-expand-container">
        <div className="img-hover-expand-card">
          <img src="https://ik.imagekit.io/tae7lprpz/Off-Road-Adventure.png" alt="Game 1" />
        </div>
        <div className="img-hover-expand-card">
          <img src="https://ik.imagekit.io/tae7lprpz/kolukkumalai-munnar-1024x512.png" alt="Game 2" />
        </div>
        <div className="img-hover-expand-card">
          <img src="https://ik.imagekit.io/tae7lprpz/imageExpand1.png?updatedAt=1770734076468" alt="Game 3" />
        </div>
        <div className="img-hover-expand-card">
          <img src="https://ik.imagekit.io/tae7lprpz/imageExpand3.jpg?updatedAt=1770734076181" alt="Game 4" />
        </div>
        <div className="img-hover-expand-card">
          <img src="https://ik.imagekit.io/tae7lprpz/kolukkumala.png" alt="Game 5" />
        </div>
      </div>
    </div>
    </section>

  );
};

export default ImageHoverExpand;