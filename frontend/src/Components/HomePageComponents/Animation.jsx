import React from 'react';
import { Parallax } from 'react-scroll-parallax';
import { FaArrowDown } from 'react-icons/fa';
import image from '../../assets/image.webp';

const Animation = () => {
  return (
    <Parallax className="relative h-screen bg-gradient-to-b from-blue-300 to-blue-600">
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-3xl">
        <FaArrowDown />
      </div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={image} alt="Mario walking" />
      </div>
    </Parallax>
  );
};

export default Animation;
