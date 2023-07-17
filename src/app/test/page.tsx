'use client'
import React, { useState, useEffect } from 'react'

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0)
  const images = ['/step1.png', '/step2.png', '/step3.png'] // Replace with your actual image URLs

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 3000) // Change the interval duration as per your preference

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className='relative '>
      {/* <div className='carousel-wrapper'>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className={`carousel-image ${
              index === currentImage ? 'active' : ''
            }`}
          />
        ))}
      </div> */}
      {/* svg {
  background: #ffece3;
  width: 400px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

circle {
  fill: transparent;
  stroke: orange;

  stroke-width: 10px;
  stroke-dasharray: 471;
  stroke-dashoffset: 471;
  animation: clock-animation 10s linear infinite;
  transform: rotate(-90deg);
  transform-origin: center;
}

@keyframes clock-animation {
  0% {
    stroke-dashoffset: 471;
  }

  100% {
    stroke-dashoffset: 0;
  }
} */}

      {/* circle {
  fill: transparent;
  stroke: orange;

  stroke-width: 10px;
  stroke-dasharray: 471;
  stroke-dashoffset: 471;
  animation: clock-animation 10s linear infinite;
  transform: rotate(-90deg);
  transform-origin: center;
} */}

      <div className=' bg-black'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='30'
          height='30'
          x='0'
          y='0'
          viewBox='0 0 30 30'
          className='bg-orange-500 text-white'
        >
          {/* <circle
            className='fill-transparent stroke-orange stroke-10 stroke-dasharray-471 stroke-dashoffset-471 animate-clock-animation transform rotate-90 transform-origin-center'
            cx='200'
            cy='200'
            r='75'
          /> */}
          <circle
            fill='currentColor'
            // stroke='green'
            // strokeDasharray={84}
            // strokeWidth={3}
            // strokeLinecap='round'
            cx='15'
            cy='15'
            r='13'
            className='circle'
          />
        </svg>
      </div>
    </div>
  )
}

export default Carousel
